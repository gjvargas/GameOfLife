var organisms = [];
var matrixSize = 30;

function init() {
  for(i = 0; i < matrixSize; i++) {
    organisms.push([]);
    for(j = 0; j < matrixSize; j++) {
      organisms[i].push(Math.random());
    }
  }
}

init();
for(i = 0; i < matrixSize; i++) {
  for(j = 0; j < matrixSize; j++) {
    console.log(organisms[i][j]);
  }
}
