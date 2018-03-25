define("Player", ["Bullet", "Keyboarder"], function (Bullet, Keyboarder) {
  return function Player(game, gameSize) {
    this.keyboarder = new Keyboarder();
    this.game = game;
    this.lives = 3;
    this.size = {
      x: 50,
      y: 50
    };
    this.location = {
      x: gameSize.x / 2, 
      y: gameSize.y - this.size.x
    };
    var img = new Image();
    img.src = "images/hero.svg";
    this.image = img;
    var timestamp = new Date();
    var delay = 250;
    var timeDistance = delay + 1;
    this.addBulletDebounced = function() {
        var now = new Date();
        timeDistance = (now.getTime() - timestamp.getTime());
        if(timeDistance <= delay) return;
        var bullet = new Bullet({
          x: this.location.x,
          y: this.location.y - this.size.y / 2
        }, {
          x: 0,
          y: -6
        },
        0);
        this.game.addEntity(bullet);
        this.game.shootSound.load();
        this.game.shootSound.play();
        timestamp = new Date();
    }
    this.update = function() {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        if (this.location.x >= this.size.x)   {
          this.location.x -= 10;
        }
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        if (this.location.x <= gameSize.x - this.size.x) {
          this.location.x += 10;
        }
      }
      if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {

        this.addBulletDebounced();
      }
    }
  };
});