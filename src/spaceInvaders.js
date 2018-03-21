var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

// Initialize an empty matrix to hold game-screen pixel values:
//  0 = empty pixel
//  1 = player base
//  2 = player ship
//  3 = player weapon
//  4 = enemy ship
//  5 = enemy weapon
var field = matrix(350, 480, 0);

function matrix(rows, cols, defaultValue){

  var arr = [];

  // Creates all lines:
  for(var i=0; i < rows; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(cols));

      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }

return arr;
}