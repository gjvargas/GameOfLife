(function() {
  var organisms = [];

  var previous = [];

  var lifeDensity = 0.13;
  var white = Color(240,230,230);
  var grey = Color(255, 255, 255);
  var yellow = Color(200, 211, 174);
  var purple = Color(55, 24, 81);

  // create the drawing pad object and associate with the canvas
  pad = Pad(document.getElementById('canvas'));
  var matrixWidth = pad.get_width() / 12;
  var matrixHeight = pad.get_height() / 12;

  //init();
  //draw();

  // test calls follow this line.
  // To test, comment init(); and draw(); above and
  // uncomment the test lines below. results will
  // be output to the javascript console
  testInit();
  testWeightedRound();

  function init() {
    for(var i = 0; i < matrixHeight; i++) {
      organisms.push([]);
      previous.push([]);
      for(var j = 0; j < matrixWidth; j++) {
        organisms[i].push(weightedRound(Math.random()));
        previous[i].push(0);
      }
    }
  }

  function weightedRound(x) {
    if(x > lifeDensity) {
      return 0;
    }
    return 1;
  }

  function step() {
    for (var i = 0; i < matrixHeight; i++) {
      for (var j = 0; j < matrixWidth; j++) {
        previous[i][j] = organisms[i][j];
      }
    }
    for (var i = 0; i < matrixHeight; i++) {
      for (var j = 0; j < matrixWidth; j++) {
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
    // set constants to be able to scale to any canvas size
    var cellWidth = pad.get_width() / matrixWidth;
    var cellHeight = pad.get_height() / matrixHeight;

    pad.clear();
    pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 1, grey, grey);

    for (var i = 0; i < matrixHeight; i++) {
      for (var j = 0; j < matrixWidth; j++) {
        // select circle or square according some arbitrary criterion
        if (organisms[i][j] == 1) {
          pad.draw_circle(Coord((j)*cellWidth + cellWidth/2, (i)*cellHeight + cellWidth/2),
            cellWidth/2-4, 2, purple, white);
        } else {
          pad.draw_rectangle(Coord((j)*cellWidth, (i)*cellHeight),
            cellWidth, cellHeight, 0, grey, grey);
        }
      }
    }
    window.setTimeout(step, 500);
  }

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
      console.log("Pass");
    }
    else {
      console.log("Fail");
    }
  }

}) ();
