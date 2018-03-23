define("Game", function() {
  var canvasID = document.getElementById("game-canvas");
  var ctx = canvasID.getContext("2d");
  return function() {
    this.frameID = null;
    this.gameOver = false;
    this.gameSize = {
      x: ctx.canvas.width,
      y: ctx.canvas.height
    };
    this.entities = [];
    this.addEntity = function(entity) {
      this.entities.push(entity);
    }
    var self = this;

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
      // console.log('yo')
      self.frameID = requestAnimationFrame(tick);
    };

    var update = function() {
      if (!self.gameOver) {
        // update checks
        var entities = self.entities;
        for (var i = 0; i < self.entities.length; i++) {
          entities[i].update();
        }
      }    
    };


    tick();
  };
});