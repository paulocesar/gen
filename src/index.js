var fs = require("fs")
  , Q = require("q")
  , _ = require("underscore")
  , http = require('http')
  , express = require("express")
  , port = 4000
  , app = express()
  , server = http.createServer(app).listen(port)
  , io = require("socket.io").listen(server)
  , roomsPath = __dirname+'/../rooms/'
  , publicPath = __dirname+'/../public/'
  , roomNameExp = /^[\w\d]+$/g;

var gen = module.exports = {};

gen.startup = function () {
  var self = this
    , fname;

  //express
  app.set('views',__dirname+"/view");
  app.set('view engine',"jade");
  app.use(express.static(publicPath));
  app.use(express.static(roomsPath));

  //rooms
  Q.nfcall(fs.readdir,roomsPath)
  .then(loadRooms)
  .done();

  function loadRooms (files) {
    _.each(files,function(file) {
      if(roomNameExp.test(file)) {
        console.log("creating "+file+" room");
        app.get('/'+file,showRoom);
        io.of('/'+file).on('connection',require(roomsPath+file+'/server'));
      }
      else {
        console.log("invalid room name "+file);
      }
    });

    console.log("ready!");
  }

};

function showRoom (req,res) {
  console.log(req);
  room = req.route.path.replace(/\//,'');
  res.render("layout",{room: room});
}