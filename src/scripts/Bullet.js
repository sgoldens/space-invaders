define("Bullet", function () {
  return function Bullet(location, speed, invaderOrNot) {
    this.invaderOrNot = invaderOrNot;
    this.size = {
      x: 3,
      y: 20 
    };
    this.location = location;
    this.speed = speed;
    var img = new Image();
    this.invaderOrNot === false ? img.src = "images/hero.svg" : img.src = "images/green-invader.svg";
    this.image = img;
    this.update = function() {
      this.location.x += this.speed.x;
      this.location.y += this.speed.y;
    };
  };
});