function rowWidget(onChange) {
  var life = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  var row = Array.create(function(i) {
    return $("<span>")

    .addClass("star star-basic")

    .mouseenter(function() {
          row[i].removeClass()
            row[i].addClass("star star-hover");
    })

    .mouseleave(function() {
      updateSprite();
    })

    .click(function() {
      if(onChange) {
        onChange(i);
      }
      updateSprite();
    })
  }, 15);

  function updateSprite(i) {
    if()
  }
}
