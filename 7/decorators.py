import functools

def channel_callback(func):

	@functools.wraps(func)
	def wrapper(sender, **kw_args):
		print 'wrapper called with %s and sender %s' % (str(kw_args), str(sender))
		new_args = {}
		new_args['channel'] = kw_args['channel']
		if 'message' in kw_args:
			new_args['message'] = kw_args['message']
		func(**new_args)
		
	return wrapper