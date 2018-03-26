define("Base", function() {
  return function Base(game, location) {
    this.game = game;
    this.size = {
      x: 85,
      y: 50
    };
    this.location = location;
    this.invaderOrNot = false;
    var img = new Image();
    img.src = "images/base.png";
    this.image = img;
    this.update = function() {
      // 
    }
  }
});