// By enclosing my entire program in a function, I add a security layer
// so that no user can alter my javascript variables through input that I will
// add for the final project submission.
(function() {
  //used for testing purposes
  var test = false;
  //Two states for the 'ecosystem'.
  //organisms is the current state, and previous is the previous state
  var organisms = [];
  var previous = [];
  //This is roughly the percentage of cells that will contain life on startup
  var lifeDensity = 0.13;

  //Colors that I selected arbitrarily
  var white = Color(240,230,230);
  var grey = Color(255, 255, 255);
  var purple = Color(55, 24, 81);

  // create the drawing pad object and associate with the canvas
  pad = Pad(document.getElementById('canvas'));
  // Here I determine the number of cells based on the size of the canvas
  var matrixWidth = pad.get_width() / 12;
  var matrixHeight = pad.get_height() / 12;

  // Calling init() gets things started
  init();

  // To test, comment init(); above and
  // uncomment the test runner below. results will
  // be output to the javascript console
  //runTests();


  function runTests() {
    test = true;
    testInit();
    testWeightedRound();
    testNeighbors();
    testStep();
  }

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
    if(!test) {
      draw();
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
    if(!test) {
      draw();
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

  //This tests to see if init() creates the right matrix size on startup
  function testInit() {
    init();
    console.log("Init Test:");
    if(organisms.length == matrixHeight && organisms[0].length == matrixWidth
        && previous.length == matrixHeight && previous[0].length == matrixWidth) {
          console.log("Pass. Array has correct dimensions.\n");
    }
    else {
      console.log("Fail. Array has incorrect dimensions");
    }
  }

  // This tests all the major edge cases for weightedRound
  function testWeightedRound() {
    console.log("Life Density is " + lifeDensity + "\nNumbers greater than"
      + " this value should return 0, and any other number should return 1.");
    console.log("Weighted round of 0 = " + weightedRound(0));
    if(weightedRound(0) == 1) {
      console.log("Pass");
    }
    else {
      console.log("Fail");
    }
    console.log("Weighted round of " + lifeDensity + " = " + weightedRound(lifeDensity));
    if(weightedRound(lifeDensity) == 1) {
      console.log("Pass");
    }
    else {
      console.log("Fail");
    }
    console.log("Weighted round of 1 = " + weightedRound(1));
    if(weightedRound(1) == 0) {
      console.log("Pass\n");
    }
    else {
      console.log("Fail\n");
    }
  }

  // This tests for every possible number of neighbors that can be
  // returned by numNeighbors();
  function testNeighbors() {
    previous = [
    [0,0,0, 1,0,0, 1,1,0, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1],
    [0,1,0, 0,1,0, 0,1,0, 0,1,0, 1,1,0, 1,1,1, 1,1,1, 1,1,1, 1,1,1],
    [0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 1,0,0, 1,1,0, 1,1,1]
    ];
    matrixHeight = 3;
    matrixWidth = 27;
    console.log("Testing all possible number of neighbors...");
    if(numNeighbors(1,1) == 0 && numNeighbors(1,4) == 1 &&
      numNeighbors(1,7) == 2 && numNeighbors(1,10) == 3 &&
      numNeighbors(1,13) == 4 && numNeighbors(1,16) == 5 &&
      numNeighbors(1,19) == 6 && numNeighbors(1,22) == 7 &&
      numNeighbors(1,25) == 8) {
          console.log("All tests passed!\n");
    }
    else {
      console.log("Oh no! One or more numNeighbor tests have failed. :(\n");
    }
  }

  // This tests step with a data set that contains all possible number of
  // neighbors for both one and 0.
  function testStep() {
    organisms = [
    [0,0,0, 1,0,0, 1,1,0, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1],
    [0,1,0, 0,1,0, 0,1,0, 0,1,0, 1,1,0, 1,1,1, 1,1,1, 1,1,1, 1,1,1],
    [0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 1,0,0, 1,1,0, 1,1,1]
    ];
    var expected = [
    [0,0,0, 0,0,0, 1,1,1, 1,1,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 1,1,1, 1,1,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 1,1,1, 1,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]
    ];
    step();
    matrixHeight = 3;
    matrixWidth = 27;
    console.log("Testing step()...");
    for(var i = 0; i < matrixHeight; i++) {
      for(var j = 0; j < matrixWidth; j++) {
        if(organisms[i][j] != expected[i][j]) {
          console.log("Test failed\n");
          return;
        }
      }
    }
    console.log("Test passed!\n");
  }

}) ();
