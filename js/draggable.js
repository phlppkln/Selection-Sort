var example2Left = document.getElementById('initial-list'),
  example2Right = document.getElementById('algorithm-list');


$(init);

function init() {
  // Reset the game
  $('#cardPile').html('');
  $('#cardSlots').html('');

  // Create the pile of shuffled cards
  //var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //numbers.sort(function () {
  //  return Math.random() - .5
  //});

  /*   for ( var i=0; i<10; i++ ) {
      $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
        containment: '#content',
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
      } ); 
}*/

  $(".card").draggable({
    containment: '#content',
    stack: '#cardPile div',
    cursor: 'move',
    revert: true
  });

  // Create the card slots
  var words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  for (var i = 1; i <= 10; i++) {
    $('<div>' + words[i - 1] + '</div>').data('number', i).appendTo('#cardSlots').droppable({
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    });
  }
}


function handleCardDrop(event, ui) {
  var slotNumber = $(this).data('number');
  console.log(slotNumber);
  var cardNumber = ui.draggable.data('number');
  console.log(cardNumber);

  if (slotNumber == cardNumber) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this),
      my: 'left top',
      at: 'left top'
    });
    ui.draggable.draggable('option', 'revert', false);
  }

}

function showalert() {
  alert("Button clicked");
}

$(function () {
  $("#draggable").draggable();
  $("#droppable").droppable({
    drop: function (event, ui) {
      $(this)
        .addClass("ui-state-highlight")
        .find("p")
        .html("Dropped!");
    }
  });
});


// Example 2 - Shared lists
new Sortable(example2Left, {
  group: 'shared', // set both lists to same group
  animation: 150
});

new Sortable(example2Right, {
  group: 'shared',
  animation: 150
});