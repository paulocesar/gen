var http = require('http');

Requester = module.exports = {};

Requester.host = "localhost";
Requester.method = "GET";
Requester.path = "/";
Requester.port = 80;

Requester.do = function (config,cb) {
  var self = this
    , options = null
    , req = null;

  //configuracoes de post no servidor
  options = {
    host: config.host || self.host,
    method: config.method || self.method,
    port: config.port || self.port,
    path: config.path || self.path
  };

  if(config.body)
    options.headers = { 
      "Content-Length": config.body.length 
    };
  
  //request de onibus no servidor do mapbus
  req = http.request(options, function (res) {
    str = '';
    res.on('data', function (chunk) { str += chunk; });
    res.on('error', function (chunk) { cb(er,null); });
    res.on('end',function () { cb(null,str); });
  });

  req.on('error',function(er){ cb(er,null); });

  if(config.body)
    req.write(config.body);

  req.end();
};