//select all the list items that can be draged
const draggableListItems = document.querySelectorAll('.draggable-list li');
//message that is shown when the game is over
const endMessage = document.getElementById('endMessage');

//keep track of the currently selected phrase
let selectedId;

//keep track of the phrase that a dragged item is being dropped onto
let dropTargetId;

//counter for correct phrases
let matchingCounter = 0;

addEventListeners();
//function to run when a list item is dragged
function dragStart() {
  selectedId = this.id;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', 'rightToLeft');
}
//function to run when a list item is dragged over a drop zone
function dragEnter() {
  this.classList.add('over');
}
//function to run when a list item is dragged out of a drop zone
function dragLeave() {
  this.classList.remove('over');
}
//function to run when a list item is dragged over a drop zone
function dragOver(ev) {
  ev.preventDefault();
  if (event.dataTransfer.getData('text/plain') === 'rightToLeft') {
    // Allow drop event
  } else {
    // Cancel drop event
    return false;
  }
}
//if the selected and drop target phrases match, hide and increment the counter
function dragDrop() {
  dropTargetId = this.id;

  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
  } else if (checkForMatch2(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
  }
  //if all matches are found, show the end message
  if (matchingCounter === 9) {
    endMessage.style.display = 'block';
  }

  this.classList.remove('over');
}
//function to check if two phrases match
function checkForMatch(selected, dropTarget) {
  switch (selected) {
    case 'e1':
      return dropTarget === 's7';

    case 'e2':
      return dropTarget === 's1';

    case 'e3':
      return dropTarget === 's8';

    case 'e4':
      return dropTarget === 's3';

    case 'e5':
      return dropTarget === 's6';

    case 'e6':
      return dropTarget === 's5';

    case 'e7':
      return dropTarget === 's2';

    case 'e8':
      return dropTarget === 's9';

    case 'e9':
      return dropTarget === 's4';

    default:
      return false;
  }
}

function checkForMatch2(selected, dropTarget) {
  switch (selected) {
    case 's1':
      return dropTarget === 'e2';

    case 's2':
      return dropTarget === 'e7';

    case 's3':
      return dropTarget === 'e4';

    case 's4':
      return dropTarget === 'e8';

    case 's5':
      return dropTarget === 'e6';

    case 's6':
      return dropTarget === 'e6';

    case 's7':
      return dropTarget === 'e2';

    case 's8':
      return dropTarget === 'e9';

    case 's9':
      return dropTarget === 'e4';

    default:
      return false;
  }
}

function playAgain() {
  matchingCounter = 0;
  endMessage.style.display = 'none';
  draggableListItems.forEach(item => {
    document.getElementById(item.id).style.display = 'block';
  })
}

function addEventListeners() {
  draggableListItems.forEach (item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
  })
}