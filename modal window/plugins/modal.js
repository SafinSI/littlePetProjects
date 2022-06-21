function _createModalFooter(buttons=[]) {
  const wrap = document.createElement('div');
  if (buttons.length === 0) {
    return wrap;
  }
  wrap.classList.add('modal-footer');
  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    btn.classList.add('btn')
    btn.classList.add(`btn-${button.type || 'secondary'}`);
    btn.onclick = button.handler;
    wrap.appendChild(btn)
  });
  return wrap
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  const modalHTML = `
  <div class="modal-overlay" data-close="true">
    <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH }">
      <div class="modal-header">
        <span class="modal-title">${options.title || 'Окно'}</span>
        ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ' '}
      </div>
      <div class="modal-body">
        ${options.content || ' '}
      </div>
      <div data-content></div>
    </div>
  </div>`;
  modal.insertAdjacentHTML('afterbegin',  modalHTML);
  modal.querySelector('[data-content]').appendChild(_createModalFooter(options.footerButtons))
  modal.classList.add('vmodal');
  document.body.appendChild(modal);
  return modal
}

/** 
* onClose : void - вызывается, когда модальное окно закрыто
* onOpen() : void - вызывается, когда модальное окно открыто
*/

$.modal = function(options) {
  const $modal = _createModal(options);
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  function open() {
    if (destroyed) {
      console.log('modal is destroyed');
      return ;
    }
    if (!closing) {
      $modal.classList.add('open')
    }
    if (typeof options.onOpen === 'function'){
      options.onOpen();
    }
  };
  
  function close() {
    closing = true;
    $modal.classList.remove('open')
    $modal.classList.add('hide')
    setTimeout(()=> {
      $modal.classList.remove('hide');
      closing = false;
      if (typeof options.onClose === 'function'){
        options.onClose();
      }

    }, ANIMATION_SPEED)
  };

  const listener = event => {
    if (event.target.dataset.close){
      close();
    }
  };

  $modal.addEventListener('click', listener);
  
  return {
    open,
    close,
    setContent(content) {
      $modal.getElementsByClassName('modal-body')[0].innerHTML = content;
    },
    destroy() {
      const parent = document.getElementById(options.parentId) || document.body;
      parent.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
      //delete this.open;
      delete this.close;
      delete this.destroy;
      delete this.setContent;
    },
  }
}