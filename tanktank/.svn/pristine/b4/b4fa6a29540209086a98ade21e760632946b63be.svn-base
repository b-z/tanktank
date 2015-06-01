import tornado.wsgi
import os
import sae
import tornado.websocket
import json

# request handle
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("templates/index.html")
# socket handle
class SocketHandler(tornado.websocket.WebSocketHandler):
	def get(self):
		c = 1
# static files settings
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
}
# url settings
app = tornado.wsgi.WSGIApplication([
    (r"/", MainHandler),
    ('/soc', SocketHandler),
])

application = sae.create_wsgi_app(app)
