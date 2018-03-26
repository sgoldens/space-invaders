define("Game", ["Base", "Bullet", "Invader", "Player"], function(Base, Bullet, Invader, Player) {
  var canvasID = document.getElementById("game-canvas");
  var ctx = canvasID.getContext("2d");
  return function Game() {
    canvasID.style.backgroundColor = '#000000';
    this.frameID = null;
    this.gameOver = false;
    this.gameSize = {
      x: ctx.canvas.width,
      y: ctx.canvas.height
    };
    this.entities = [];
    this.playerAlive = true;
    this.atLeastOneInvaderAlive = true;
    this.addEntity = function(entity) {
      this.entities.push(entity);
    }
    this.totalInvaders = 40;
    this.invadersAlive = 0;
    this.gameStarted = false;
    this.playerInEntities = null;

    var self = this;

    var createBases = function(game) {
      var bases = [];
      for (var i = 0; i < 4; i++) {
        var x = 50 + i * 250
        var y = 500
        bases.push(new Base(game, {
          x: x,
          y: y,
        }));
      };
      return bases;
    }

    var createInvaders = function(game) {
      var invaders = [];
      var columns = 8;
      var rows = 5;
      var total = columns * rows;
      for (var i = 0; i < total; i++) {
        var x = 35 + (i % columns) * 90;
        var y = 35 + (i % rows) * 60;
        invaders.push(new Invader(game, {
          x: x,
          y: y,
          column: i % columns,
          row: Math.floor(i / columns)
        }));
      };
      return invaders;
    };

    var loadSound = function(url, callback) {
        var loaded = function() {
            callback(sound);
            sound.removeEventListener('canplaythrough', loaded);
        }

        var sound = new Audio(url);
        sound.addEventListener('canplaythrough', loaded);
        sound.load();
    }

    self.entities = createInvaders(self).concat(createBases(self)).concat(new Player(self, self.gameSize));

    self.entities.filter(function (e) {
      if (e instanceof Player) {
        self.player = e
      }
    });

    var draw = function() {
      ctx.clearRect(0, 0, self.gameSize.x, self.gameSize.y);
      for (var i = 0; i < self.entities.length; i++) {
        if (self.entities[i].image) {
            ctx.drawImage(self.entities[i].image, 
            self.entities[i].location.x - self.entities[i].size.x / 2, 
            self.entities[i].location.y - self.entities[i].size.y / 2, 
            self.entities[i].size.x, 
            self.entities[i].size.y);
        };
      };
    };

    var tick = function() {
      loadSound('sounds/pewpew.wav', function(shootSound) {
        self.shootSound = shootSound;

        update();
        draw();
        self.frameID = requestAnimationFrame(tick);
      });
    };

    var colliding = function(e1, e2) {
      return !(
        e1 === e2 || 
        e1.location.x + e1.size.x / 2 < e2.location.x - e2.size.x / 2 || 
        e1.location.y + e1.size.y / 2 < e2.location.y - e2.size.y / 2 || 
        e1.location.x - e1.size.x / 2 > e2.location.x + e2.size.x / 2 || 
        e1.location.y - e1.size.y / 2 > e2.location.y + e2.size.y / 2 || 
        (e1.invaderOrNot === e2.invaderOrNot)
      );
    };

    var gameOver = function() {
      self.gameOver = true;
      document.getElementById("replay").style.display = 'block';
    }

    var winner = function() {
      self.gameOver = true;
      document.getElementById("winner").style.display = 'block';
    }

    var update = function() {
      if (!self.playerAlive) {
        setTimeout(function(game) {
            gameOver();
        }, 10, this); 
      } else if (!self.atLeastOneInvaderAlive) {
        setTimeout(function(game) {
            winner();
        }, 10, self); 
      } else {
        
        var entities = self.entities;

        var invadersLeftAlive = function() {
          self.invadersAlive = 0
          self.entities.filter(function(e) {
            if (e instanceof Invader) {
              self.invadersAlive += 1;
            }
          })
        }
        
        invadersLeftAlive();
        
        document.getElementById("score").innerHTML = ((self.totalInvaders - self.invadersAlive) * 2500);
        document.getElementById("lives").innerHTML = (self.player.lives);

        var notCollidingWithAnything = function(e1) {
          return entities.filter(function(e2) {
            return colliding(e1, e2);
          }).length === 0;
        };

        self.entities = self.entities.filter(notCollidingWithAnything);
        for (var i = 0; i < self.entities.length; i++) {
          self.entities[i].update();
        };

        var isPlayerAlive = function() {
          self.playerInEntities = false;
          for (var i = self.entities.length - 1; i >= 0; i--) {
            if (self.entities[i] instanceof Player) {
              self.playerInEntities = true;
            }
          }
          if (self.playerInEntities === false) {
            self.player.lives -= 1
            self.entities.push(new Player(self, self.gameSize))  
            if (self.player.lives >= 1) {
              return true;
            } else {
              return false;
            }
          }
        }

        isPlayerAlive();

        if (self.player.lives >= 1) {
          self.playerAlive = true;
        } else {
          self.playerAlive = false;
        }

        var atleastOneInvaderAlive = function() {
          return entities.filter(function(e) {
              return (e instanceof Invader);
          });
        }

        if (atleastOneInvaderAlive().length == 0) {
          self.atLeastOneInvaderAlive = false;
        } else {
          self.atLeastOneInvaderAlive = true;
        }

      }    
    };

    var startGame = function() {
      document.getElementById("start-button").style.display = 'none';
      document.getElementById("splash-screen").style.display = 'none';
      document.getElementById("info").style.display = 'none';
      document.getElementById("controls").style.display = 'none';
      document.getElementById("ships").style.display = 'block';
      document.getElementById("lives").style.display = 'block';
      tick();
    }

    var startButton = document.getElementById("start-button")
    startButton.onclick = function() { startGame(); }

  };
});