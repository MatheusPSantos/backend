import tornado.web
import tornado.ioloop

class basicRequestHandler(tornado.web.RequestHandler):

    def get(self):
        self.write("Hello, world. This is an response from tornado server.")

class listRequestHandler(tornado.web.RequestHandler):
    def get(self):
      self.render("index.html")

class queryParamRequestHandler(tornado.web.RequestHandler):
    def get(self):
        num = self.get_argument("num")
        if (num.isdigit()):
            r = "odd" if int(num) % 2 else "even"
            self.write(f"The integer {num} is {r}")
        else:
            self.write("Num is not a valid integer")

class resourceRequestHandler(tornado.web.RequestHandler):
    def get(self, studentName, courseId):
      self.write(f"Welcome {studentName}, the course you are viewing is {courseId}")
  
if __name__ == "__main__":
    app  = tornado.web.Application([
        (r"/", basicRequestHandler),
        (r"/animal", listRequestHandler),
        (r"/isEven", queryParamRequestHandler),
        (r"/students/([a-zA-Z]+)/([0-9]+)", resourceRequestHandler)
    ])
    
    port = 8882
    port1 = 8883
    port2 = 8884
    
    app.listen(port)
    
    app.listen(port1)
    
    app.listen(port2)
    print(f"Application is ready and listining on port {port}")
    tornado.ioloop.IOLoop.current().start()

