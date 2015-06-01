import utils, core, consts

def send_message(sender, receiver, message):
	channel = core.Channel.create_from_user(receiver, consts.ATTR_CHAT)
	if not channel.is_online:
		return False
	channel.send_json(utils.encode_message(sender, consts.ATTR_CHAT, message))
	return True 