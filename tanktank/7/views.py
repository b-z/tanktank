from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import core, signals

def extract_channel(view_func):

	def wrapper(request):
		channel = core.Channel.create_from_channel_name(request.REQUEST.get('from', ''))
		return view_func(request, channel)
		
	return wrapper

@csrf_exempt
@extract_channel
def connected(request, channel):
	signals.channel_connected.send(
			sender = core.Channel, 
			channel = channel
	)
	return HttpResponse('')
	
@csrf_exempt
@extract_channel
def disconnected(request, channel):
	signals.channel_disconnected.send(
			sender = core.Channel, 
			channel = channel
	)
	return HttpResponse('')
		
@csrf_exempt
@extract_channel	
def message(request, channel):
	print signals.channel_message
	signals.channel_message.send(
			sender = core.Channel, 
			channel = channel, 
			message = request.REQUEST.get('message', '')
	)
	return HttpResponse('')