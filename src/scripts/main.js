define("main", 
  ["Game",
  "Keyboarder",
  "Player"], function(Game, Keyboarder, Player) {
    var spaceInvaders = new Game("game-canvas");
    var keyboarder = new Keyboarder();
    var player = new Player(spaceInvaders, spaceInvaders.gameSize, keyboarder);

  	spaceInvaders.entities.push(player);
    console.log(player)
});