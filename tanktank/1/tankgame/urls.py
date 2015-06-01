from django.conf.urls import patterns, include, url
import settings
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns(
    # Examples:
    # url(r'^$', 'tankgame.views.home', name='home'),
    #url(r'^tankgame/', include('tankgame.foo.urls')),
    'tankgame.views',
    url(r'^$', 'index'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{ 'document_root':settings.STATIC_ROOT }),
    url(r'^postData$', 'postData'),
    url(r'^getData$', 'getData'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()
