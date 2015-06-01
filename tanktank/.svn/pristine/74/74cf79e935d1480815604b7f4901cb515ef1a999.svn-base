from django.conf import settings

ATTR_NORMAL = 1
ATTR_CHAT   = 2
ATTR_DISCUSSION = 3 #Unavailable for single page mode.

def get_setting(name, default, type = None):
	try:
		setting = getattr(settings, name)
	except AttributeError:
		setting = default
	if type is not None and not isinstance(setting, type):
		setting = type(setting)
	return setting

IS_SINGLE_PAGE = get_setting('SAE_CHANNEL_IS_SINGLE_PAGE', False, bool)
CHANNEL_PATH_PREFIX  = get_setting('SAE_CHANNEL_PATH_PREFIX', (), tuple)
CHAT_PATHS     = get_setting('SAE_CHANNEL_CHAT_PATHS', (), tuple)
if not IS_SINGLE_PAGE:
	DISCUSSION_PATHS = get_setting('SAE_CHANNEL_DISCUSSION_PATHS', (), tuple)

CONNECTED_CALLBACKS = get_setting('SAE_CHANNEL_CONNECTED_CALLBACKS', (), tuple)
DISCONNECTED_CALLBACKS = get_setting('SAE_CHANNEL_DISCONNECTED_CALLBACKS', (), tuple)
MESSAGE_CALLBACKS = get_setting('SAE_CHANNEL_MESSAGE_CALLBACKS', (), tuple)
CHAT_MESSAGE_CALLBACKS = get_setting('SAE_CHANNEL_CHAT_MESSAGE_CALLBACKS', (), tuple)
DISCUSS_MESSAGE_CALLBACKS = get_setting('SAE_CHANNEL_DISCUSS_MESSAGE_CALLBACKS', (), tuple)