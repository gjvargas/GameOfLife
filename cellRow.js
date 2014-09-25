function rowWidget(onChange) {
  var life = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
  ];
  var previous = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
  ];
  var matrixHeight = 10;
  var matrixWidth = 10;
  var matrix = Array.create(function(j) {
    var row = Array.create(function(i) {
      return $("<span>")

      .addClass("star star-basic")

      .mouseenter(function() {
            $(row[i]).removeClass()
              .addClass("star star-hover");
            if(j % 2 == 1) {
              $(row[0]).addClass("indent");
            }
      })

      .mouseleave(function() {
        updateSprite(j,i);
      })

      .click(function() {
        life[j][i] ^= 1;
        if(onChange) {
          onChange(i);
        }
        updateSprite(j,i);
      })
    }, 10);

    if(j % 2 == 1) {
      $(row[0]).addClass("indent");
    }

    function updateSprite(j,i) {
      $(row[i]).removeClass();
      if(j % 2 == 1) {
        $(row[0]).addClass("indent");
      }
      if(life[j][i] == 1) {
        $(row[i]).addClass("star star-on");
      }
      else {
        $(row[i]).addClass("star star-basic");
      }
    }

    // var div = $("<div>");
    // if(j % 2 == 0) {
    //   div.style.marginLeft = "45px";
    // }
    return $("<div>").append(row);
  }, 10)

  function step() {
    // Load the previous state so we can load the next state
    // into organisms. Here I use previous as a temporary variable so that I can
    // alter organisms reliably. I considered using closures to pass the matrix,
    // updating each cell based on the local matrix, thus requiring only 1 matrix.
    // Ultimately I decided against it, because 2 global matrices seemed preferrable
    // to thousands/millions of temporary variable in terms of performance. Is there
    // a way I might use closures to eliminate this second state (previous) and
    // maintaining good performance?
    for (var i = 0; i < matrixHeight; i++) {
      for (var j = 0; j < matrixWidth; j++) {
        previous[i][j] = life[i][j];
      }
    }

    //update each cell based on the number of neighbors and its previous state
    for (var i = 0; i < matrixHeight; i++) {
      for (var j = 0; j < matrixWidth; j++) {
        // Switch case is faster than if/else in this case because
        // there are several possibilities
        switch(numNeighbors(i, j)) {
          case 0:
          case 1:
              life[i][j] = 0;
          case 2:
              break;
          case 3:
              life[i][j] = 1;
              break;
          default:
              life[i][j] = 0;
        }
      }
    }
    for(var x = 0; x < matrixHeight; x++) {
      for(var y = 0; y < matrixWidth; y++) {
        window.setTimeout(updateSprite(x,y))
      }
    }

  }
  // Helper function that determines the number of neighbors a cell
  // had last turn for any given coordinate.
  function numNeighbors(i, j) {
    return previous[(i+matrixHeight-1)%matrixHeight][(j+matrixWidth-1)%matrixWidth]
          + previous[i][(j+matrixWidth-1)%matrixWidth]
          + previous[(i+1)%matrixHeight][(j+matrixWidth-1)%matrixWidth]
          + previous[(i+matrixHeight-1)%matrixHeight][j]
          + previous[(i+1)%matrixHeight][j]
          + previous[(i+matrixHeight-1)%matrixHeight][(j+1)%matrixWidth]
          + previous[i][(j+1)%matrixWidth]
          + previous[(i+1)%matrixHeight][(j+1)%matrixWidth];
  }
  return $("<div>").append(matrix);
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


// A derived widget: a sequence of stars widgets, with label text on each.
// Returns a node and a signal of the _highest_ selection.
function starsWidget(labels) {
    var stars = labels.map(function(label) {
        var star = rowWidget(function(i) {
          console.log(i);
        });
        // Notice how pleasant it is to use the existing widget here as a simple building block. :)

        return {node: $("<div>")
                .append(star.node)
                .append($("<span>").text(label)),
                signal: star.signal};
    });

    return {node: $("<div>").append(stars.map(function(star) {
        return star.node;
    })),
            signal: null

    }
}
