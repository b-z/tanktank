#encoding=UTF-8

from django.db import models
from django.contrib.auth.models import User
import core, utils, consts

if consts.IS_SINGLE_PAGE:
	_attr = consts.ATTR_CHAT
else:
	_attr = consts.ATTR_DISCUSSION

class Discussion(models.Model):

	supervisor = models.ForeignKey(
			User, 
			verbose_name = u'管理者',
			related_name = 'discussions_owned',
	)
	members    = models.ManyToManyField(
			User,
			verbose_name = u'成员',
			related_name = 'discussions_attended',
	)
	name       = models.CharField(
			max_length = 255,
			unique = True,
	)
	
	def __unicode__(self):
		return self.name
		
	def get_online_members(self):
		online_users = []
		for user in self.members:
			if core.Channel.create_from_user(user, _attr).is_online:
				online_users.append(user)
		return online_users
		
	def boardcast(self, sender, message):
		offline_users = []
		
		for user in self.members:
			channel = core.Channel.create_from_user(user, _attr)
			if not channel.is_online:
				offline_users.append(user)
				continue
			channel.send_json(utils.encode_message(
					sender,
					consts.ATTR_DISCUSSION,
					message,
					discussion = self
			))
			
		return offline_users
	
	class Meta:
		verbose_name = u'讨论组'
		app_label = 'SAEChannel'
		verbose_name_plural = verbose_name
		ordering = ['name']