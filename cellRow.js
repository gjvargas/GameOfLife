function rowWidget(onChange) {
  var life = [0,0,0,0,0,0,0,0,0,0];

  var row = Array.create(function(i) {
    return $("<span>")

    .addClass("star star-basic")

    .mouseenter(function() {
          $(row[i]).removeClass()
            .addClass("star star-hover");
    })

    .mouseleave(function() {
      updateSprite(i);
    })

    .click(function() {
      life[i] ^= 1;
      if(onChange) {
        onChange(i);
      }
      updateSprite(i);
    })
  }, 8);

  function updateSprite(i) {
    $(row[i]).removeClass();
    if(life[i] == 1) {
      $(row[i]).addClass("star star-on");
    }
    else {
      $(row[i]).addClass("star star-basic");
    }
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
