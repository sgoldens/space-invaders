define("Bullet", function () {
  return function Bullet(location, speed, invaderOrNot) {
    this.invaderOrNot = invaderOrNot;
    this.size = {
      x: 31,
      y: 20 
    };
    this.location = location;
    this.speed = speed;
    var img = new Image();
    img.class = 'letter';
    img.src = "images/letter.png";
    this.image = img;
    this.update = function() {
      this.location.x += this.speed.x;
      this.location.y += this.speed.y;
    };
  };
});