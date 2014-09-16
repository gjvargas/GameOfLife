// By enclosing my entire program in a function, I add a security layer
// so that no user can alter my javascript variables through input that I will
// add for the final project submission.
(function() {
  //Two states for the 'ecosystem'.
  //organisms is the current state, and previous is the previous state
  var organisms = [];
  var previous = [];
  //This is roughly the percentage of cells that will contain life on startup
  var lifeDensity = 0.13;

  //Colors that I selected arbitrarily
  var white = Color(240,230,230);
  var grey = Color(235, 235, 235);
  var purple = Color(55, 24, 81);

  // create the drawing pad object and associate with the canvas
  pad = Pad(document.getElementById('canvas'));
  // Here I determine the number of cells based on the size of the canvas
  var matrixWidth = pad.get_width() / 12;
  var matrixHeight = pad.get_height() / 12;

  // Initiating the matrices containing the states of the ecosystem
  function init() {
    for(var i = 0; i < matrixHeight; i++) {
      organisms.push([]);
      previous.push([]);
      for(var j = 0; j < matrixWidth; j++) {
        // each cell initially has lifeDensity probability of containing life
        organisms[i].push(weightedRound(Math.random()));
        // the previous state begins as all 0
        previous[i].push(0);
      }
    }
    draw();
  }

  // Helper function that determines whether a cell contains life
  // A '1' represents life, and a '0' represents no life.
  function weightedRound(x) {
    if(x > lifeDensity) {
      return 0;
    }
    return 1;
  }

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
        previous[i][j] = organisms[i][j];
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


  function draw() {
    // Calculate size of each cell based on the size of our matrix and canvas
    var cellWidth = pad.get_width() / matrixWidth;
    var cellHeight = pad.get_height() / matrixHeight;
    var lineThickness = 2;
    var radius = cellWidth/2-2*lineThickness;


    // clear canvas to avoid build up of shapes and excess memory
    pad.clear();
    // draw the frame for our ecosystem
    pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 1, grey, grey);

    for (var i = 0; i < matrixHeight; i++) {
      for (var j = 0; j < matrixWidth; j++) {
        // Draw a circle to represent life if our matrix contains a '1'
        if (organisms[i][j] == 1) {
          pad.draw_circle(Coord((j)*cellWidth + cellWidth/2, (i)*cellHeight + cellWidth/2),
            radius, lineThickness, purple, white);
        }
      }
    }
    // Use this call back to update page every half second.
    // This was a necessary addition for consistent transitions between states.
    window.setTimeout(step, 500);
  }

  // calls the initializing method.
  // It's here to get things started. Woot.
  init();

}) ();
