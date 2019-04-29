function selectTool(event) {
  let target = event.target;
  while (target !== toolMenu) {
    if (target.tagName === 'BUTTON') {
      for (let i = 0, l = toolMenu.children.length; i < l; i++) {
        if (toolMenu.children[i].classList.contains('selected-tool')) {
          toolMenu.children[i].classList.remove('selected-tool');
        }
      }
      target.classList.add('selected-tool');
      return;
    }
    target = target.parentNode;
  }
}

const toolMenu = document.querySelector('.tool-menu');
toolMenu.addEventListener('click', selectTool);



const canvas = document.querySelector('.canvas');
const transformation = document.querySelector('.transformation');
function transform(event) {
  let target = event.target;

  if (transformation.classList.contains('selected-tool') && target !== this) {
    target.classList.toggle('transformation');
  }
}

canvas.addEventListener('click', transform);



let currentColor = document.querySelector('.current-color');
let previousColor = document.querySelector('.previous-color');
let predefinedColors = document.querySelector('.predefined-colors');

function setColor(event) {
  let target = event.target;
  if (getComputedStyle(currentColor).backgroundColor === getComputedStyle(target).backgroundColor) return;
  if (target.tagName === 'DIV' && target !== this) {
    previousColor.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
    currentColor.style.backgroundColor = getComputedStyle(target).backgroundColor;
  }
}

predefinedColors.addEventListener('click', setColor);


const paintBucket = document.querySelector('.paint-bucket');
function fillFigure(event) {
  let target = event.target;
  if (paintBucket.classList.contains('selected-tool') && target !== this) {
    target.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
  }
}

canvas.addEventListener('click', fillFigure);


let colorPicker = document.querySelector('.color-picker');
function chooseColor(event) {
  let target = event.target;
  if (getComputedStyle(currentColor).backgroundColor === getComputedStyle(target).backgroundColor) return;
  if (colorPicker.classList.contains('selected-tool') && target !== this) {
    previousColor.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
    currentColor.style.backgroundColor = getComputedStyle(target).backgroundColor;
  }
}

canvas.addEventListener('click', chooseColor)


//move tool

const moveTool = document.querySelector('.movement');

//shortcuts

function removeSelected() {
  for (let i = 0, l = toolMenu.children.length; i < l; i++) {
    if (toolMenu.children[i].classList.contains('selected-tool')) {
      toolMenu.children[i].classList.remove('selected-tool');
    }
  }
};

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 'P'.charCodeAt()) {
    removeSelected();
    paintBucket.classList.add('selected-tool');
    canvas.style.cursor = 'url(assets/svg/paint-bucket.svg), auto';
  }
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 'C'.charCodeAt()) {
    removeSelected();
    colorPicker.classList.add('selected-tool');
    canvas.style.cursor = 'url(assets/svg/color-picker.svg), auto';
  }
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 'M'.charCodeAt()) {
    removeSelected();
    moveTool.classList.add('selected-tool');
    canvas.style.cursor = 'url(assets/svg/move-tool.svg), auto';
  }
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 'T'.charCodeAt()) {
    removeSelected();
    transformation.classList.add('selected-tool');
    canvas.style.cursor = 'url(assets/svg/transform-tool.svg), auto';
  }
});


// cursors 

function changeCursor() {
  if (paintBucket.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/paint-bucket.svg), auto';
  }
  if (colorPicker.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/color-picker.svg), auto';
  }
  if (moveTool.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/move-tool.svg), auto';
  }
  if (transformation.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/transform-tool.svg), auto';
  }
}

canvas.addEventListener('mouseover', changeCursor);

