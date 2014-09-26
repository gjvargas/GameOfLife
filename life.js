function hexagonalGrid(onChange) {
  var life = [];
  var previous = []
  var matrixSize = 16;
  var lifeDensity = .35;
  var going = false;
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
        if(!going) {
            $(row[i]).removeClass()
              .addClass("hex on");
            if(i % (matrixSize*2) == 0) {
              $(row[i]).addClass("indent");
            }
        }
      })

      .mouseleave(function() {
        if(!going) {
          updateSprite(i);
        }
      })

      .click(function() {
        if(!going) {
          life[Math.floor(i/matrixSize)][i%matrixSize] ^= 1;
          if(onChange) {
            onChange(i);
          }
          updateSprite(i);
        }
      })
  }, Math.pow(matrixSize, 2));

  for(var i = 0; i < Math.pow(matrixSize, 2); i += matrixSize * 2) {
    $(row[i]).addClass("indent");
  }

  function updateSprite(i) {
    $(row[i]).removeClass();
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

  function randomize() {
    for(var i = 0; i < matrixSize; i++) {
      for(var j = 0; j < matrixSize; j++) {
        // each cell initially has lifeDensity probability of containing life
        life[i][j] = weightedRound(Math.random());
        // the previous state begins as all 0
        previous[i][j] = 0;
      }
    }
    for(var x = 0; x < Math.pow(matrixSize, 2); x++) {
      updateSprite(x);
    }
  }

  // Helper function that determines whether a cell contains life
  // A '1' represents life, and a '0' represents no life.
  function weightedRound(x) {
    if(x > lifeDensity) {
      return 0;
    }
    return 1;
  }

  function start() {
    going = true;
    step();
  }

  function stop() {
    going = false;
  }

  function step() {
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
    if(going) {
      window.setTimeout(step, 700);
    }
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



  return $("<div>").append(row).addClass("center")
                        .append($('<input id="randomize" type="button" value="Randomize"/>')
                            .addClass("button")
                            .click(randomize))
                        .append($('<input id="start" type="button" value="Start"/>')
                            .addClass("button")
                            .click(start))
                        .append($('<input id="stop" type="button" value="Stop"/>')
                            .addClass("button")
                            .click(stop))
                        .append($('<input id="step" type="button" value="Step"/>')
                            .addClass("button")
                            .click(step))
                        .addClass("center");
}

// Creates array of size count using function f, just like in lecture
Array.create = function(f, count) {
    var arr = [];
    for (var i = 0; i < count; ++i) {
        arr.push(f(i));
    }
    return arr;
}
