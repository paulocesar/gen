// var room = io.connect("/main");

// room.on('connect', function () {
//   console.log("hello!!");
// });

function startGame() {
  World.build();
}

head.js(
  "/main/client/color.js",
  "/main/client/world.js", 
  startGame
);

