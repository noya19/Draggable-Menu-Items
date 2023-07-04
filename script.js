const dragables = document.querySelectorAll('.dragable');
const container = document.querySelector('.main-container');
const map = new Map();

dragables.forEach((element) => {
  element.addEventListener('drag', hideDragable);

  element.addEventListener('dragstart', () => {
    element.classList.add('dragging');
    // Add event listener to all other classes.
    getDragOverNeighbours(element);
  });

  element.addEventListener('dragend', () => {
    // Remove the event listerners from all other classes.
    removeDragOverNeighbours(element);
    element.classList.remove('dragging');
    element.classList.remove('hide');
  });
});

let initiate;
function getDragOverNeighbours(dragable) {
  const dragableElements = [
    ...container.querySelectorAll('.dragable:not(.dragging)'),
  ];
  dragableElements.forEach((cur) => {
    //1. Assign a new initiate Function.
    initiate = (e) => {
      findPositon(cur, dragable, e);
    };

    //2. Get the left and top
    const box = cur.getBoundingClientRect();
    const left = box.left;
    const top = box.top;

    // 3. store all in the Map object.
    map.set(cur.textContent, {
      initiate,
      left,
      top,
    });

    // 4. Add event Listener.
    cur.addEventListener('dragover', initiate);
  });
}

function removeDragOverNeighbours() {
  const dragableElements = [
    ...container.querySelectorAll('.dragable:not(.dragging)'),
  ];

  dragableElements.forEach((cur) => {
    // 1. Remove observer
    const { initiate } = map.get(cur.textContent);
    cur.removeEventListener('dragover', initiate);
  });
}

function findPositon(element, dragable, e) {
  // calculate the postion of the mouse on the dragable
  const box = element.getBoundingClientRect();
  const offset = e.clientX - box.left - box.width / 2;
  if (offset < 0) {
    element.classList.toggle('moved');
    element.insertAdjacentElement('beforebegin', dragable);
  } else {
    element.classList.toggle('moved');
    element.insertAdjacentElement('afterend', dragable);
  }
}

function hideDragable(element) {
  element.target.classList.add('hide');
}
