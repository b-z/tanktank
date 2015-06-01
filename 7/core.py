from django.contrib.auth.models import User
import consts
import sae.channel	
	
__CHANNEL_NAME_FORMAT = '#_channel_url_%s_%d_#'
EXPIRED_TIME = 1440
encode_channel_name = lambda name, attr: str(__CHANNEL_NAME_FORMAT % (name, attr))

import re
def decode_channel_name(name):
	groups = re.match(r'#_channel_url_(.+)_(\d+)_#', name)
	return (groups.group(1), int(groups.group(2)))

class SAEChannelError(Exception):
	pass

class Channel(object):
	
	@classmethod
	def create_from_user(cls, user, attr = consts.ATTR_NORMAL):
		obj = cls.__new__(cls)
		obj.__init(user, attr)
		return obj
		
	@classmethod
	def create_from_user_id(cls, user_id, attr = consts.ATTR_NORMAL):
		return cls.create_from_user(User.objects.get(pk = user_id), attr)
		
	@classmethod
	def create_from_username(cls, username, attr = consts.ATTR_NORMAL):
		return cls.create_from_user(User.objects.get(username = username), attr)
		
	@classmethod
	def create_from_channel_name(cls, channel_name):
		data, attr = decode_channel_name(channel_name)
		return cls.create_from_username(data, attr)
		
	def __init__(self):
		raise SAEChannelError, "Cannot call the constructor directly."
	
	def __init(self, user, attr):
		if consts.IS_SINGLE_PAGE and attr == consts.ATTR_DISCUSSION:
			raise SAEChannelError, "ATTR_DISCUSSION is unavailable in this mode."
		self.__attr = attr
		self.__user = user
		self.__channel_name = encode_channel_name(user.username, self.__attr)
		self.__channel_url = ''
		self.__is_online = None

	def get_channel_url(self):
		if self.__channel_url:
			return self.__channel_url
		try:
			import memcache
		except:
			import pylibmc as memcache
		mc = memcache.Client()
		c = self.__channel_name
		url = mc.get(self.__channel_name)
		if not url:
			url = sae.channel.create_channel(self.__channel_name, EXPIRED_TIME)
			mc.set(self.__channel_name, url, time = EXPIRED_TIME)
			self.__channel_url = url
		return url
	
	def send_text(self, text):
		self.__send_message(text)
		
	def send_json(self, data):
		import json
		self.__send_message(json.dumps(data))
	
	def __send_message(self, message):
		sae.channel.send_message(self.__channel_name, message)
	
	@property
	def user(self):
		return self.__user
		
	@property	
	def attr(self):
		return self.__attr
		
	@property
	def is_online(self):
		if self.__is_online is None:
			self.__channel_url = mc.get(self.__channel_name)
			self.__is_online = self.__channel_url is None
		return self.__is_online