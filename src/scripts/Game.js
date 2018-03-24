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
      for (var i = 0; i < 24; i++) {
          var x = 30 + (i % 8) * 30;
          var y = 30 + (i % 3) * 30;
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
        drawRect(ctx, self.entities[i]);
      };
    };

    var tick = function() {
      update();
      draw();
      self.frameID = requestAnimationFrame(tick);
    };

    var colliding = function(b1, b2) {
        return !(b1 === b2 || b1.location.x + b1.size.x / 2 < b2.location.x - b2.size.x / 2 || b1.location.y + b1.size.y / 2 < b2.location.y - b2.size.y / 2 || b1.location.x - b1.size.x / 2 > b2.location.x + b2.size.x / 2 || b1.location.y - b1.size.y / 2 > b2.location.y + b2.size.y / 2);
    };

    var gameOver = function() {
      self.gameOver = true;
    }

    var update = function() {
      if (!self.playerAlive) {
        setTimeout(function(game) {
            // game.stopGame();
            // gameOver();
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