import tornado.web
import tornado.ioloop
import os

class basicRequestHandler(tornado.web.RequestHandler):
  def get(self):
    self.write(f"Served from {os.getpid()}")

if __name__ == "__main__":
  app = tornado.web.Application([
    (r"/basic", basicRequestHandler)
  ])

  port = 8882

  #app.listen(port)
  #app.listen(1111)
  app.listen(2222)
  print(f"Application is ready and running at port {port}")
  tornado.ioloop.IOLoop.current().start()