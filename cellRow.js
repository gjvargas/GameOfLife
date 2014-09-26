function hexagonalGrid(onChange) {
  var life = [];
  var previous = []

  var matrixSize = 16;

  for(var i = 0; i < matrixSize; i++) {
    life.push([]);
    previous.push([]);
    for(var j = 0; j < matrixSize; j++) {
      life[i].push(0);
      previous[i].push(0);
    }
  }

    var row = Array.create(function(i) {
      return $("<span>")
        .addClass("hex off")

        .mouseenter(function() {
              $(row[i]).removeClass()
                .addClass("hex on");
              if(i % (matrixSize*2) == 0) {
                $(row[i]).addClass("indent");
              }
        })

        .mouseleave(function() {
          updateSprite(i);
        })

        .click(function() {
          life[Math.floor(i/matrixSize)][i%matrixSize] ^= 1;
          if(onChange) {
            onChange(i);
          }
          updateSprite(i);
        })
    }, Math.pow(matrixSize, 2));

    for(var i = 0; i < Math.pow(matrixSize, 2); i += matrixSize * 2) {
      $(row[i]).addClass("indent");
    }

    function updateSprite(i) {
      $(row[i]).removeClass();
      console.log("update " + i);
      if(i % (matrixSize*2) == 0) {
        $(row[i]).addClass("indent");
      }
      if(life[(i/matrixSize)|0][i%matrixSize] == 1) {
        $(row[i]).addClass("hex on");
      }
      else {
        $(row[i]).addClass("hex off");
      }
    }

  $("#start").click(step);

  function step() {
    // Load the previous state so we can load the next state
    // into organisms. Here I use previous as a temporary variable so that I can
    // alter organisms reliably. I considered using closures to pass the matrix,
    // updating each cell based on the local matrix, thus requiring only 1 matrix.
    // Ultimately I decided against it, because 2 global matrices seemed preferrable
    // to thousands/millions of temporary variable in terms of performance. Is there
    // a way I might use closures to eliminate this second state (previous) and
    // maintaining good performance?
    for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
        previous[i][j] = life[i][j];
      }
    }

    //update each cell based on the number of neighbors and its previous state
    for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
        // Switch case is faster than if/else in this case because
        // there are several possibilities
        switch(numNeighbors(i, j)) {
          case 2:
              life[i][j] ^= 1;
          case 3:
          case 5:
              break;
          default:
              life[i][j] = 0;
        }
      }
    }

    for(var x = 0; x < Math.pow(matrixSize, 2); x++) {
      updateSprite(x);
    }

    window.setTimeout(step, 700);
  }
  // Helper function that determines the number of neighbors a cell
  // had last turn for any given coordinate.
  function numNeighbors(i, j) {
    if(i % 2 == 0)
      return evenNeighbors(i, j);
    return oddNeighbors(i, j);
  }
  function oddNeighbors(i,j) {
    return previous[(i+matrixSize-1)%matrixSize][(j+matrixSize-1)%matrixSize]
          + previous[i][(j+matrixSize-1)%matrixSize]
          + previous[(i+1)%matrixSize][(j+matrixSize-1)%matrixSize]
          + previous[(i+matrixSize-1)%matrixSize][j]
          + previous[(i+1)%matrixSize][j]
          + previous[i][(j+1)%matrixSize];
  }
  function evenNeighbors(i,j) {
    return previous[i][(j+matrixSize-1)%matrixSize]
          + previous[(i+matrixSize-1)%matrixSize][j]
          + previous[(i+1)%matrixSize][j]
          + previous[(i+matrixSize-1)%matrixSize][(j+1)%matrixSize]
          + previous[i][(j+1)%matrixSize]
          + previous[(i+1)%matrixSize][(j+1)%matrixSize];
  }

  return $("<div>").append(row);
}

// Functional to create a new length-'count' array,
// by calling a function that many times, each time passing it the current index.
Array.create = function(f, count) {
    var arr = [];

    for (var i = 0; i < count; ++i) {
        arr.push(f(i));
    }

    return arr;
}
