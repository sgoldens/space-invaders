define("Bullet", function () {
  return function Bullet(location, speed) {
    this.className = "bullet"
    this.size = {
      x: 3,
      y: 10 
    }
    this.location = location;
    this.speed = speed;
    this.update = function() {
      this.location.x += this.speed.x;
      this.location.y += this.speed.y;
    };
  };
});