define("Bullet", function () {
  return function Bullet(location, speed, invaderOrNot) {
    this.invaderOrNot = invaderOrNot;
    this.size = {
      x: 3,
      y: 3
    };
    this.location = location;
    this.speed = speed;
    var img = new Image();
    if (!this.invaderOrNot) {
      img.src = "images/hero.svg"
    } else {
      img.src = "images/green-invader.svg";
    }
    this.image = img;
    this.update = function() {
      this.location.x += this.speed.x;
      this.location.y += this.speed.y;
    };
  };
});