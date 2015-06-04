import tornado.wsgi
import tornado.web
import tornado.websocket
import os
import sae
import json
import uuid
import datetime
import logging
import random
import re
import threading
import time

import pylibmc as memcache
from sae import channel

mc = memcache.Client()

def getData(key):
	data = mc.get(key)
	if not data:
		if key == 'UserData':
			mc.set(key,[])
		elif key == 'pos':
			mc.set(key,Tank().randomPos())
		else:
			mc.set(key,{})
	return data

def setData(key,data):
	mc.set(key,data)
	return

def findUser(u_id):
	data = mc.get('UserData')
	for (j,t) in enumerate(data):
		if t['u_id'] == u_id:
			return j
	return -1

def sendData(u_id,data):
	channel.send_message(u_id, json.dumps(data))
	return

# request handle
class MainHandler(tornado.web.RequestHandler):

	def get(self):
		user = self.get_secure_cookie('u')
		if not user:
			user = uuid.uuid4().hex
			self.set_secure_cookie('u', user)
		u_id = uuid.uuid4().hex
		url = channel.create_channel(u_id)
		team = Tank().joinTeam(u_id)
		#fdpos = Tank().flagPos()
		pos = getData('pos')
		print pos
		template_values = {'url': url,
							'me': u_id,
							'team': team,
							'pos': pos,
						}
		path = os.path.join(os.path.dirname(__file__), 'templates/index.html')
		self.render(path, **template_values)
		#channel.send_message(u_id,[pos])
		return

class Connected(tornado.web.RequestHandler):

	def post(self):
		#print '1111111111111111111111111111111111111111111111111111111111'
		return

class Disconnected(tornado.web.RequestHandler):

	def post(self):
		arg = self.request.arguments
		if 'from' in arg:
			u_id = arg['from'][0]
		data = getData('UserData')
		for (j,t) in enumerate(data):
			if t['u_id'] == u_id:
				data.pop(j)
		setData('UserData',data)

class Message(tornado.web.RequestHandler):

	def post(self):
		arg = self.request.arguments
		#print arg
		if 'from' in arg:
			u_id = arg['from'][0]
		if 'message' in arg:
			msg = eval(arg['message'][0])
			if 'i' in msg:
				u_id = msg['i']
				#print u_id
			Tank().updatePosition(msg,u_id)

		#u_id = self.get_argument('i')
		#print u_id
		#channel.send_message(u_id,'lalala')
		return

class MessageTest(tornado.web.RequestHandler):

	def post(self):
		msg = self.get_argument('d')
		msg = eval(msg)
		#print msg
		if 'i' in msg:
			u_id = msg.pop('i')
		Tank().updatePosition(msg,u_id)
		#channel.send_message(u_id,'lalala')
		return

class Revive(tornado.web.RequestHandler):

	def post(self):
		u_id = self.get_argument('i')
		Tank().revive(u_id)
		#channel.send_message(u_id,'lalala')
		return

class Tank():

	def revive(self,u_id):
		data = getData('UserData')
		n = findUser(u_id)
		if n >= 0:
			data[n]['hp'] = 5
			print u_id,data[n]['tanks']['n'],'revive'
		setData('UserData',data)
		sendData(u_id,data)

	def updatePosition(self,msg,u_id):
		if 'b' in msg:
			b = msg.pop('b')
		if 'h' in msg:
			h = msg.pop('h')
		else:
			h = []
		if 'g' in msg:
			g = msg.pop('g')
		else:
			g = False
		t = msg

		data = getData('UserData')
		pos = getData('pos')
		n = findUser(u_id)
		if n >= 0:
			data[n]['tanks'] = t
			data[n]['bullets'] = b
		else:
			data.append({'u_id':u_id,'bullets':b,'tanks':t,'hp':5})

		if h:
			for (i,tk) in enumerate(data):
				for (j,bl) in enumerate(h):
					if tk['u_id'] == bl and tk['hp'] > 0:
							tk['hp'] = tk['hp'] - 1
		#					if tk['hp'] == 0 and tk['tanks']['f'] == 1:
		#						print 'here'
		#						tk['tanks']['f'] = 0
		#						fpos = pos['fp']
		#						fpos = {'x':tk['tanks']['x'],'y':tk['tanks']['y']}
		if g:
			pos = Tank().randomPos()
			for (i,tk) in enumerate(data):
				if tk['u_id'] == u_id:
					tk['tanks']['s'] = int(tk['tanks']['s']) + 20
					print tk['tanks']['s']
				elif tk['tanks']['c'] == t['c'] :
					tk['tanks']['s'] = int(tk['tanks']['s']) + 10
					print tk['tanks']['s'],'bb'
				else:
					tk['tanks']['s'] = int(tk['tanks']['s']) - 10
					print tk['tanks']['s'],'aa'
		setData('pos',pos)	
		setData('UserData',data)
		sendData(u_id,{'data':data,'pos':pos})
		#channel.send_message(user, json.dumps(data))

	#def judgeDead(self,bullets):
	#	data = getData('UserData')
	#	for (i,b) in enumerate(bullets):
	#		for (j,t) in enumerate(data):

	def joinTeam(self,u_id):
		data = getData('UserData')
		t1 = 0
		t2 = 0
		for (j,t) in enumerate(data):
			if t['tanks']['c'] == '1':
				t1 = t1 + 1
			elif t['tanks']['c'] == '2':
				t2 = t2 + 1
		if t1 > t2:
			return '2'
		elif t1 < t2:
			return '1'
		else:
			return str(random.randint(1,2))

	def randomPos(self):
			pos = [{'x':512,'y':100},{'x':512,'y':924},{'x':100,'y':512},{'x':924,'y':512},{'x':512,'y':300},\
			{'x':512,'y':724},{'x':300,'y':512},{'x':724,'y':512}]
			tmp = random.randint(0,7)
			fpos = pos[tmp]
			dpos = {'x':1024-fpos['x'],'y':1024-fpos['y']}
			return {'fp':fpos,'dp':dpos}

class Check(tornado.web.RequestHandler):
	
	def get(self):
		data = getData('UserData')
		for (j,t) in enumerate(data):
			if 'on' in t:
				if not t['on']:
					del data[j]
		for (j,t) in enumerate(data):
			t['on'] = False
		setData('UserData',data)

# static files settings
settings = {
	"static_path": os.path.join(os.path.dirname(__file__), "static"),
	"xsrf_cookies": False,
}
# url settings
app = tornado.wsgi.WSGIApplication([
	#('/TankPosition', TankPosition),
	("/", MainHandler),
	(r"/Check",Check),
	(r"/_sae/channel/connected",Connected),
	(r"/_sae/channel/disconnected",Disconnected),
	#(r"/_sae/channel/message",Message),
	(r"/test",MessageTest),
	(r"/revival",Revive),
], debug=True, cookie_secret='0xcafebabe')

application = sae.create_wsgi_app(app)