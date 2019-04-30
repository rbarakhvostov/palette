const canvas = document.querySelector('.canvas');
// tool selection
const toolMenu = document.querySelector('.tool-menu');
function selectTool(event) {
  let { target } = event;
  while (target !== toolMenu) {
    if (target.tagName === 'BUTTON') {
      for (let i = 0, l = toolMenu.children.length; i < l; i += 1) {
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
toolMenu.addEventListener('click', selectTool);

// transform tool
const transformTool = document.querySelector('.transform-tool');
function transform(event) {
  const { target } = event;
  if (transformTool.classList.contains('selected-tool')
      && target !== this
      && !target.classList.contains('figure-wrap')) {
    target.classList.toggle('transformation');
  }
}
canvas.addEventListener('click', transform);

// colors
const currentColor = document.querySelector('.current-color');
const previousColor = document.querySelector('.previous-color');
const predefinedColors = document.querySelector('.predefined-colors');
function setColor(event) {
  const { target } = event;
  if (getComputedStyle(currentColor).backgroundColor
  === getComputedStyle(target).backgroundColor) return;
  if (target.tagName === 'DIV' && target !== this) {
    previousColor.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
    currentColor.style.backgroundColor = getComputedStyle(target).backgroundColor;
  }
}
predefinedColors.addEventListener('click', setColor);

// paint bucket
const paintBucket = document.querySelector('.paint-bucket');
function fillFigure(event) {
  const { target } = event;
  if (paintBucket.classList.contains('selected-tool')
      && target !== this
      && !target.classList.contains('figure-wrap')) {
    target.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
  }
}
canvas.addEventListener('click', fillFigure);

// color picker
const colorPicker = document.querySelector('.color-picker');
function chooseColor(event) {
  const { target } = event;
  if (getComputedStyle(currentColor).backgroundColor
  === getComputedStyle(target).backgroundColor) return;
  if (colorPicker.classList.contains('selected-tool')
      && target !== this
      && !target.classList.contains('figure-wrap')) {
    previousColor.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
    currentColor.style.backgroundColor = getComputedStyle(target).backgroundColor;
  }
}
canvas.addEventListener('click', chooseColor);

// move tool
const moveTool = document.querySelector('.move-tool');
function chooseFigure(event) {
  const { target } = event;
  const shiftY = event.pageY - target.getBoundingClientRect().top; // - pageYOffset
  const shiftX = event.pageX - target.getBoundingClientRect().left; // - pageXOffset
  function moveFigure(e) {
    target.style.left = `${e.pageX - shiftX}px`;
    target.style.top = `${e.pageY - shiftY}px`;
  }
  function cancelMove() {
    document.removeEventListener('mousemove', moveFigure);
    this.removeEventListener('mouseup', cancelMove);
    target.style.opacity = '1';
    target.style.zIndex = '1';
  }
  if (moveTool.classList.contains('selected-tool')
      && target !== this
      && !target.classList.contains('figure-wrap')) {
    target.style.opacity = '0.4';
    target.style.zIndex = '2';
    target.style.position = 'absolute';
    document.addEventListener('mousemove', moveFigure);
    this.addEventListener('mouseup', cancelMove);
  }
}
canvas.addEventListener('mousedown', chooseFigure);

// shortcuts
function removeSelected() {
  for (let i = 0, l = toolMenu.children.length; i < l; i += 1) {
    if (toolMenu.children[i].classList.contains('selected-tool')) {
      toolMenu.children[i].classList.remove('selected-tool');
    }
  }
}
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 'P'.charCodeAt()) {
    removeSelected();
    paintBucket.classList.add('selected-tool');
    document.body.style.cursor = 'url(assets/svg/paint-bucket.svg), auto';
  }
});
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 'C'.charCodeAt()) {
    removeSelected();
    colorPicker.classList.add('selected-tool');
    document.body.style.cursor = 'url(assets/svg/color-picker.svg), auto';
  }
});
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 'M'.charCodeAt()) {
    removeSelected();
    moveTool.classList.add('selected-tool');
    document.body.style.cursor = 'url(assets/svg/move-tool.svg), auto';
  }
});
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 'T'.charCodeAt()) {
    removeSelected();
    transformTool.classList.add('selected-tool');
    document.body.style.cursor = 'url(assets/svg/transform-tool.svg), auto';
  }
});

// cursors
const header = document.querySelector('.header');
const palette = document.querySelector('.palette');
function changeCursor(event) {
  const { target } = event;
  if (target === header || target === toolMenu || target === palette) {
    target.style.cursor = 'auto';
  }
  if (paintBucket.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/paint-bucket.svg), auto';
  }
  if (colorPicker.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/color-picker.svg), auto';
  }
  if (moveTool.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/move-tool.svg), auto';
  }
  if (transformTool.classList.contains('selected-tool')) {
    this.style.cursor = 'url(assets/svg/transform-tool.svg), auto';
  }
}
document.body.addEventListener('mouseover', changeCursor);
