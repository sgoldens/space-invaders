define("Game", ["Invader", "Player"], function(Invader, Player) {
  var canvasID = document.getElementById("game-canvas");
  var ctx = canvasID.getContext("2d");
  return function Game() {
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
    this.invadersBelow = function(invader) {
        return this.entities.filter(function(e) {
            return e instanceof Invader && e.location.y > invader.location.y && e.location.x - invader.location.x < invader.size.x;
        }).length > 0;
    }
    var self = this;

    var createInvaders = function(game) {
      var invaders = [];
      for (var i = 0; i < 77; i++) {
          var x = 35 + (i % 11) * 90;
          var y = 35 + (i % 7) * 60;
          invaders.push(new Invader(game, {
              x: x,
              y: y
          }));
      };
      return invaders;
    };

    self.entities = createInvaders(self).concat(new Player(self, self.gameSize));
    console.log(self.entities)

    var drawRect = function(ctx, entity) {
      ctx.fillRect(entity.location.x - entity.size.x / 2, entity.location.y - entity.size.y / 2, entity.size.x, entity.size.y);
    }

    var draw = function() {
      ctx.clearRect(0, 0, self.gameSize.x, self.gameSize.y);
      for (var i = 0; i < self.entities.length; i++) {
        if (self.entities[i].image) {
            ctx.drawImage(self.entities[i].image, 
            self.entities[i].location.x - self.entities[i].size.x / 2, 
            self.entities[i].location.y - self.entities[i].size.y / 2, 
            self.entities[i].size.x, 
            self.entities[i].size.y);
        } else {
        drawRect(ctx, self.entities[i]);
        };
      };
    };

    var tick = function() {
      update();
      draw();
      self.frameID = requestAnimationFrame(tick);
    };

    var colliding = function(e1, e2) {
        return !(e1 === e2 || e1.location.x + e1.size.x / 2 < e2.location.x - e2.size.x / 2 || e1.location.y + e1.size.y / 2 < e2.location.y - e2.size.y / 2 || e1.location.x - e1.size.x / 2 > e2.location.x + e2.size.x / 2 || e1.location.y - e1.size.y / 2 > e2.location.y + e2.size.y / 2);
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
            // game.stopGame();
            gameOver();
        }, 10, this); 
      } else if (!self.atLeastOneInvaderAlive) {
        setTimeout(function(game) {
            // game.stopGame();
            // gameOver();
        }, 10, self); 
      } else {
        var entities = self.entities;

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
          return entities.filter(function(e) {
            return (e instanceof Player);
          });
        }

        if (isPlayerAlive().length == 0) {
          self.playerAlive = false;
        } else {
          self.playerAlive = true;
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


    tick();
  };
});