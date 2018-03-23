define("Bullet", function () {
  return function Bullet(location, speed) {
    this.size = {
      x: 3,
      y: 3
    }
    this.location = location;
    this.speed = speed;
    this.update = function() {
      this.location.x += this.speed.x;
      this.location.y += this.speed.y;
    };
  };
});