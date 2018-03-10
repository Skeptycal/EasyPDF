const path = require('path');
const { shell }  = require('electron');

function render(selector, pdf) {
  const PDFJS_PATH = path.resolve(__dirname, '..', 'pdfjs', 'web', 'viewer.html');
  let container = document.querySelector(selector);
  if (container) {
    let iframe = document.createElement('iframe');
    iframe.src = `file://${PDFJS_PATH}?file=${pdf}`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.id = 'easy-pdf-iframe';

    iframe.onload = () => {
      let externalLink = iframe.contentDocument.getElementById('externalLink')
      if (externalLink) {
        externalLink.onchange = () => shell.openExternal(externalLink.value)
      }
    }

    container.appendChild(iframe);
  }
  else {
    throw new Error(`The container ${selector} is not exists !`);
  }
}

module.exports = render;