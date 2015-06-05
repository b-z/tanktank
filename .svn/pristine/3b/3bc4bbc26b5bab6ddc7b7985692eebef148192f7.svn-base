from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
import json
import consts

def encode_message(sender, attr, message, **kw_args):
	if attr not in (consts.ATTR_CHAT, consts.ATTR_DISCUSSION):
		return
	return_value = {
			'from': {
					'username': sender.username, 
					'id': sender.id,
			},
			'attr': attr, 
			'message': message,
	}
	if attr == ATTR_DISCUSSION:
		discussion = kw_args['discussion']
		return_value['discussion'] = {
				'name': discussion.name,
				'id': discussion.id,
		}
	return return_value
	
def decode_message(message):
	data = json.loads(message)
	if not isinstance(data, dict) or 'attr' not in data or \
			data['attr'] not in (consts.ATTR_CHAT, consts.ATTR_DISCUSSION) or \
			'message' not in data:
		return
	message = data['message']
	attr = int(data['attr'])
	
	if attr == consts.ATTR_CHAT:
		try:
			to = User.objects.get(pk = int(data['to']))
		except:
			return {}
			
		return {
				'to': to,
				'message': message,
		}
	else:
		try:
			discussion = ContentType.objects.get(app_label = 'SAEChannel', model = 'Discussion').get_object_for_this_type(pk = int(data['discussion']))
		except:
			return {}
			
		return {
				'discussion': discussion,
				'message': message
		}