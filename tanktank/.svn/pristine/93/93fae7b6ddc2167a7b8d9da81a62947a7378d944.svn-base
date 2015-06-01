from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse

import json

def index(request):
    return render_to_response('index.html')

def postData(request):
    if request.is_ajax() and request.method == 'POST':
        print request.POST
    return render_to_response('index.html')

def getData(request):
    if request.is_ajax() and request.method == 'GET':
        print request.GET
    response_data = {}
    response_data['data'] = 1
    return HttpResponse(json.dumps(response_data), content_type="application/json")
