define("Player", ["Bullet", "Keyboarder"], function (Bullet, Keyboarder) {
  return function Player(game, gameSize) {
    this.keyboarder = new Keyboarder();
    this.game = game;
    this.lives = 3;
    this.size = {
      x: 30,
      y: 15
    };
    this.location = {
      x: gameSize.x / 2, 
      y: gameSize.y - this.size.x
    };
    this.update = function() {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.location.x -= 10;
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.location.x += 10;
      }
      if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
        var bullet = new Bullet({
          x: this.location.x,
          y: this.location.y - this.size.y / 2
        }, {
          x: 0,
          y: -6
        });
        this.game.addEntity(bullet);
      }
    }
  };
});