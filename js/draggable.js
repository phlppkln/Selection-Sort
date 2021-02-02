var dragOverHandler = function (e) {
  e.preventDefault();
};

var dropOnDropareaHandler = function (e) {
  e.preventDefault();
  if (!checkIfDropareaContainsCard(this)) {
      var data = e.originalEvent.dataTransfer.getData('Text');
      e.target.appendChild(document.getElementById(data));
      //$(this).off('dragover drop');
  }
};

var dropOnCardContainerHandler = function (e) {
  e.preventDefault();
  var data = e.originalEvent.dataTransfer.getData('Text');
  e.target.appendChild(document.getElementById(data));
  $('.droparea').each(function () {
      if ($(this).is(':empty')) {
          $(this).on('dragover', dragOverHandler);
          $(this).on('drop', dropOnDropareaHandler);
      }
  });
};

$(document).ready(function () {
  $('.card').on('dragstart', function (e) {
      e.originalEvent.dataTransfer.setData('Text', e.target.id);
  });
  $('.droparea, #cardContainer').on('dragover', dragOverHandler);
  $('.droparea').on('drop', dropOnDropareaHandler);
  $('#cardContainer').on('drop', dropOnCardContainerHandler);
});

function printIdInFirstDroparea() {
  var parent = document.getElementById('drop-pos1');
  console.log(parent);
  var childs = parent.childNodes;
  childs.forEach(printchild);
}

function checkIfDropareaContainsCard(droparea) {
  var parent = document.getElementById(droparea.id);
  if (parent.childNodes.length >= 1) {
      return true;
  }
  return false;
}

function printchild(item, index) {
  console.log(item.id);
}