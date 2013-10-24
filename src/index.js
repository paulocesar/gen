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

/*
 * starts the GEN...
 */
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

};

/*
 * load all rooms placed in rooms folder
 * note that one room has to follow a specific strucuture
 */
function loadRooms (files) {
  _.each(files,function(file) {
    if(roomNameExp.test(file)) {
      console.log("creating "+file+" room");
      app.get('/'+file,showRoom);
      //socket only listen a specific room
      io.of('/'+file).on('connection',require(roomsPath+file+'/server'));
    }
    else {
      console.log("invalid room name "+file);
    }
  });

  console.log("ready!");
}

/*
 * express method to show one room
 */
function showRoom (req,res) {
  room = req.route.path.replace(/\//,'');
  res.render("layout",{room: room});
}