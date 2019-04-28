function selectTool(event) {
  let target = event.target;
  while (target !== toolMenu) {
    if (target.tagName === 'BUTTON') {
      for (let i = 0, l = toolMenu.children.length; i < l; i++) {
        if (toolMenu.children[i].classList.contains('selected-tool')) {
          toolMenu.children[i].classList.remove('selected-tool');
          /*toolState[toolMenu.children[i].dataset.name] = 0;*/
        }
      }
      target.classList.add('selected-tool');
      /*toolState[target.dataset.name] = 1;*/
      return;
    }
    target = target.parentNode;
  }
}

/*const toolState = {}; */

const toolMenu = document.querySelector('.tool-menu');
toolMenu.addEventListener('click', selectTool);

const canvas = document.querySelector('.canvas');
const transformation = document.querySelector('.transformation');
function transform(event) {
  let target = event.target;
  if (transformation.classList.contains('selected-tool')) {
    target.classList.toggle('transformation');
  }
}

canvas.addEventListener('click', transform);

/*
document.addEventListener('click', function(event) {
  let target = event.target;
  const figures = [...canvas.children];
  if (figures.every(() => i !== target)) {

  }
})
*/

let currentColor = document.querySelector('.assigned-current-color');
let previousColor = document.querySelector('.assigned-previous-color');
let predefinedColors = document.querySelector('.predefined-colors');

function setColor(event) {
  let target = event.target;
  if (target.tagName === 'DIV' && target !== this) {
    previousColor.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
    currentColor.style.backgroundColor = getComputedStyle(target).backgroundColor;
  }
}

predefinedColors.addEventListener('click', setColor);