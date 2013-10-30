
World = {};

World.map = [];
World.map_width = 30;
World.map_height = 30;
World.blocks = [];
World.blocks_size = 20;



World.layer = new collie.Layer({
  width: World.blocks_size*World.map_width,
  height: World.blocks_size*World.map_height  
})



World.build = function () {
  //map
  this.mapLoadData();
  this.mapBuildScene();

  this.start();
}



World.mapLoadData = function () {
  //temp
  var self = this
    , width = self.map_width
    , height = self.map_height
    , i = 4*width;
  while(i--) self.map.push(0);
  i = width*height-(4*width);
  while(i--) self.map.push(1); 
}



World.mapBuildScene = function () {
  var i = this.map.length
    , x = 0
    , y = 0
    , blocks_size = this.blocks_size
    , map = this.map
    , width = this.map_width
    , height = this.map_height
    , layer = this.layer

  //TODO: review load blocks
  while(i--) {
    x = i % width;
    y = Math.floor(i / width);
    this.blocks.unshift(new collie.DisplayObject({
        width : blocks_size-1,
        height : blocks_size-1,
        x : x*blocks_size,
        y : y*blocks_size,
        backgroundColor : Colors[map[i]]
    })
    .attach({
      "click": function (e) { e.displayObject.set({backgroundColor:"blue"}); } 
    })
    .addTo(layer));
  }
}



World.start = function () {
  collie.Renderer.addLayer(this.layer);
  collie.Renderer.load(document.getElementById("gcontainer"));
  collie.Renderer.start();
}