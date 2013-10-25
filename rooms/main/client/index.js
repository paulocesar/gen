// var room = io.connect("/main");

// room.on('connect', function () {
//   console.log("hello!!");
// });

var map = [],
  blocks = [],
  color = ['blue', 'brown']
  w = 10,
  h = 10,
  i = 20;

while(i--) map.push(0);
i = 80
while(i--) map.push(1);
  
i = map.length;

var layer = new collie.Layer({
  width: 100,
  height: 100
});

var x = 0, y = 0;
while(i--) {
  x = i % 10;
  y = Math.floor(i / 10);
  blocks.unshift(new collie.DisplayObject({
      width : 10,
      height : 10,
      x : x*10,
      y : y*10,
      backgroundColor : color[map[i]]
  })
  .attach({
    "click": function (e) { e.displayObject.set({backgroundColor:"blue"}); } 
  })
  .addTo(layer));
}

collie.Renderer.addLayer(layer);
collie.Renderer.load(document.getElementById("gcontainer"));
collie.Renderer.start();