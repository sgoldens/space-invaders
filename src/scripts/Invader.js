define("Invader", ["Bullet"], function(Bullet) {
  return function Invader(game, location) {
    this.game = game;
    this.size = {
      x: 15,
      y: 15
    };
    this.location = location;
    this.patrolX = 0;
    this.speedX = 3;
    this.update = function() {
      if (this.patrolX < 0 || this.patrolX > game.gameSize.x - 265) {
        this.speedX = -this.speedX;
      }
      this.location.x += this.speedX;
      this.patrolX += this.speedX;
      if (Math.random() > 0.995 && !this.game.invadersBelow(this)) {
        var bullet = new Bullet({
          x: this.location.x,
          y: this.location.y + this.size.x / 2
        }, {
          x: Math.random() - 0.5,
          y: 2          
        });
        this.game.addEntity(bullet);
      }
    }
  };
});