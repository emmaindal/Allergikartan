var http = require ('http');
var url = require ('url');
var fs = require('fs');





http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case '/':
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('Test message');
        res.end();
        break;
      case '/index.html':
        fs.readFile(__dirname + path, function(error, data) {
          if(error) {
            res.writeHead(404);
            res.write(error);
            res.end();
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
          }
        });
        break;
      default:
        res.writeHead(404);
        res.write('Shit....')
        res.end();
        break;
  }


}).listen(8080);
