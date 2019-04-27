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




