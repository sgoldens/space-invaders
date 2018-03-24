define("Invader", ["Bullet"], function(Bullet) {
  return function Invader(game, location) {
    this.game = game;
    this.size = {
      x: 50,
      y: 50
    };
    this.location = location;
    this.patrolX = 0;
    this.speedX = 2;
    var img = new Image();
    img.src = "images/green-invader.svg";
    this.image = img;
    this.update = function() {
      if (this.patrolX < 0 || this.patrolX > game.gameSize.x / 10) {
        this.speedX = -this.speedX;
      }
      this.location.x += this.speedX;
      this.patrolX += this.speedX;
      if (Math.random() > 0.99 && !this.game.invadersBelow(this)) {
        var bullet = new Bullet({
          x: this.location.x,
          y: this.location.y + this.size.x / 2 + 10
        }, {
          x: 0,
          y: 2          
        });
        this.game.addEntity(bullet);
      }
    }
  };
});