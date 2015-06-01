from django.dispatch import Signal
from module_loading import import_by_path
import consts, decorators, utils, core

channel_connected = Signal(providing_args = ['channel'])
channel_disconnected = Signal(providing_args = ['channel'])
channel_message  = Signal(providing_args = ['channel', 'message'])
channel_chat_message = Signal(providing_args = ['channel', 'message', 'to'])
channel_discuss_message = Signal(providing_args = ['channel', 'discussion', 'message', 'to'])

def connect(signal, callbacks):
	
	for func_name in callbacks:
		func = import_by_path(func_name)
		print 'Connected %s to %s' % (func, signal)
		signal.connect(
				func,
				sender = core.Channel,
				dispatch_uid = func_name
		)	

connect(channel_chat_message, consts.CHAT_MESSAGE_CALLBACKS)
connect(channel_discuss_message, consts.DISCUSS_MESSAGE_CALLBACKS)
		
@decorators.channel_callback
def default_message_callback(channel, message):
	if channel.attr == consts.ATTR_NORMAL:
		return
	data = utils.decode_message(message)
	if data is None:
		return
	data['channel'] = channel
	if data['attr'] == consts.ATTR_CHAT:
		channel_chat_message.send(sender = core.Channel, **data)
	else:
		channel_discuss_message.send(sender = core.Channel, **data)

channel_message.connect(
		default_message_callback,
		sender = core.Channel,
		dispatch_uid = '__default_callback'
)
		
connect(channel_connected, consts.CONNECTED_CALLBACKS)
connect(channel_message, consts.MESSAGE_CALLBACKS)
connect(channel_disconnected, consts.DISCONNECTED_CALLBACKS)