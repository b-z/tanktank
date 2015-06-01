import core, consts

check_prefix = lambda prefixes, name: filter(lambda path:name.startswith(path), prefixes)
check_paths = lambda paths, name: filter(lambda path:name == path, paths)

def sae_channel_processor(request):
	if not request.user.is_authenticated():
		return {}
	path_info = request.META.get('PATH_INFO', '')
	
	attr = None
	if check_prefix(consts.CHANNEL_PATH_PREFIX, path_info):
		attr = consts.ATTR_NORMAL
	if check_paths(consts.CHAT_PATHS, path_info):
		attr = consts.ATTR_CHAT
	if not consts.IS_SINGLE_PAGE and check_paths(consts.DISCUSSION_PATHS, path_info):
		attr = consts.ATTR_DISCUSSION
	
	if attr is None:
		return {}
	
	url = core.Channel.create_from_user(request.user, attr).get_channel_url()
	
	return {
			'channel_url': url
	}