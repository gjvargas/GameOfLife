(function() {
  var organisms = [];
  var matrixSize = 200;
  var lifeDensity = 0.05;
  var white = Color(255,255,255)
  var grey = Color(96,96,96);
  var yellow = Color(200, 231, 174);

  // create the drawing pad object and associate with the canvas
  pad = Pad(document.getElementById('canvas'));

  init();

  function init() {
    for(i = 0; i < matrixSize; i++) {
      organisms.push([]);
      for(j = 0; j < matrixSize; j++) {
        organisms[i].push(weightedRound(Math.random()));
      }
    }
    draw();
  }

  function weightedRound(x) {
    if(x > lifeDensity) {
      return 0;
    }
    return 1;
  }

  function step() {
    for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
        switch(numNeighbors(i, j)) {
          case 0:
          case 1:
              organisms[i][j] = 0;
          case 2:
              break;
          case 3:
              organisms[i][j] = 1;
              break;
          default:
              organisms[i][j] = 0;
        }
      }
    }
    draw();
  }

  function numNeighbors(i, j) {
    return organisms[(i+matrixSize-1)%matrixSize][(j+matrixSize-1)%matrixSize]
          + organisms[i][(j+matrixSize-1)%matrixSize]
          + organisms[(i+1)%matrixSize][(j+matrixSize-1)%matrixSize]
          + organisms[(i+matrixSize-1)%matrixSize][j]
          + organisms[(i+1)%matrixSize][j]
          + organisms[(i+matrixSize-1)%matrixSize][(j+1)%matrixSize]
          + organisms[i][(j+1)%matrixSize]
          + organisms[(i+1)%matrixSize][(j+1)%matrixSize];
  }


  function draw() {
    // set constants to be able to scale to any canvas size
    var cellWidth = pad.get_width() / matrixSize;
    var cellHeight = pad.get_height() / matrixSize;

    pad.clear();
    pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, white);

    for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
        // select circle or square according some arbitrary criterion
        if (organisms[i][j] == 1) {
          pad.draw_rectangle(Coord((i)*cellWidth, (j)*cellHeight),
            cellWidth, cellHeight, 0, yellow, yellow);
        } else {
          pad.draw_rectangle(Coord((i)*cellWidth, (j)*cellHeight),
            cellWidth, cellHeight, 0, grey, grey);
        }
      }
    }
    window.setTimeout(step, 500);
  }
}) ();
