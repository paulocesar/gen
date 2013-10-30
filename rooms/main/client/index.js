// var room = io.connect("/main");

// room.on('connect', function () {
//   console.log("hello!!");
// });


var classes = [
  "color",
  "world"
];

function startGame() {
  World.build();
}

head.js.apply(
  undefined,
  classes
  .map(function (name) { return "/main/client/"+name+".js"})
  .concat([startGame])
);

