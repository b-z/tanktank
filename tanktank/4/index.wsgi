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

tanks = [
	{'i':'1','x':0,'y':0},
]
bullets = [
	{'i':0,'x':0,'y':0,'vx':0,'vy':0,'t':0},
]

def getData():
	data = mc.get('data')
	if not data:
		mc.set('data',[])
	return data

def setData(data):
	mc.set('data',data)
	return

def findUser(u_id,data):
	for (j,t) in enumerate(data):
		if t['u_id'] == u_id:
			return j
	return -1

def sendData(u_id,data):
	print json.dumps(data)
	channel.send_message(u_id, json.dumps(data))
	return

# request handle
class MainHandler(tornado.web.RequestHandler):

	def get(self):
		user = self.get_secure_cookie('u')
		if not user:
			self.set_secure_cookie('u', user)
		u_id = uuid.uuid4().hex
		print u_id
		url = channel.create_channel(u_id)
		template_values = {'url': url,
							'me': u_id,
						}
		path = os.path.join(os.path.dirname(__file__), 'templates/index.html')
		self.render(path, **template_values)

class Connected(tornado.web.RequestHandler):

	def post(self):
		return

class Disconnected(tornado.web.RequestHandler):

	def post(self):
		arg = self.request.arguments
		if 'from' in arg:
			u_id = arg['from'][0]
		data = getData()
		for (j,t) in  enumerate(data):
			if t['u_id'] == u_id:
				data.pop(j)
		setData(data)

class Message(tornado.web.RequestHandler):

	def post(self):
		#user = self.get_secure_cookie('u')
		#channel.send_message(user,self.request)
		arg = self.request.arguments
		print arg
		if 'from' in arg:
			u_id = arg['from'][0]
		if 'message' in arg:
			msg = eval(arg['message'][0])
			if 't' in msg:
				if msg['t'] == 'TankPosition':
					TankPosition().update(msg,u_id)
				elif msg['t'] == 'AddBullet':
					Bullets().addBullet(msg,u_id)
		return

class TankPosition():

	def update(self,msg,u_id):
		#channel.send_message(user, json.dumps(position))
		t = {}
		if 'x' in msg:
			t['x'] = msg['x']
		if 'y' in msg:
			t['y'] = msg['y']
		t['color'] = '1'
		data = getData()
		j = findUser(u_id,data)
		if j >= 0:
			data[j]['tanks'] = t
		else:
			data.append({'u_id':u_id,'bullets':[],'tanks':t})
		setData(data)
		sendData(u_id,data)
		#channel.send_message(user, json.dumps(data))

class Bullets():

	def addBullet(self,msg,u_id):
		return
		#data = getData()
		#del msg['t']
		#data['bullets'].append(msg)
		# setData(data)
		#sendData(u_id,data)
# static files settings
settings = {
	"static_path": os.path.join(os.path.dirname(__file__), "static"),
}
# url settings
app = tornado.wsgi.WSGIApplication([
	#('/TankPosition', TankPosition),
	("/", MainHandler),
	#('/Check',Check),
	('/_sae/channel/connected',Connected),
	('/_sae/channel/disconnected',Disconnected),
	('/_sae/channel/message',Message),
], debug=True, cookie_secret='0xcafebabe')

application = sae.create_wsgi_app(app)
