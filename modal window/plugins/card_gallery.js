function createCard(options) {
  const card = document.createElement('div');
  const cardHTML = `
  <img class="card-img-top " style="height: 300px; width: 350px"
  src=${options.img}
  alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${options.title}</h5>
    <a href="#" class="btn btn-primary" data-id=${options.id} data-price=${options.price}>Посмотреть цену</a>
    <a href="#" class="btn btn-danger" data-id=${options.id} data-delete="true">Удалить</a>
  </div>`;
  card.insertAdjacentHTML('afterbegin',  cardHTML);
  card.setAttribute('id', options.id)
  card.classList.add("card")
  return card;
}

/**
 * Удаление элемента при нажатии на кнопку: Выходит опрашивающее модальное окно confirm,
 * сделанное на основе modal - $.confirm (Promise)
 */

const modalPrice = $.modal({
  title: 'Цена на товар', 
  closable: true,
  width: '400px',
  footerButtons: [
    { text: 'Ok', type: 'primary', handler () {
      modalPrice.close();
    }
    }
  ]
});

function render(items, container) {
  items.forEach(item => container.appendChild(createCard(item)));
}

$.cardGallery = function(options) {
  const container = document.getElementById(options.containerId) || document.body;
  render(options.data, container);
  let data = options.data;

  listener = () => {
    event.preventDefault();
    const id = parseInt(event.target.dataset.id);
    const item = data.find(element => element.id === id);
    if (event.target.dataset.price) {
      modalPrice.setContent(`<p>Цена на ${item.title} <strong>${item.price}$</strong></p>`)
      modalPrice.open();
    }
    if (event.target.dataset.delete) {
      const confirm = $.cofirm({
        title: 'Вы уверены?',
        content: `<strong>Вы удаляете фрукт: ${item.title}</strong>`,
      })
      confirm.then( () => {
        container.removeChild(document.getElementById(id))
        data = data.filter(element => element.id !== id);
      })
      .catch(()=>console.log('Cancel'));
    }
  }
  container.addEventListener('click', listener)
  return {
    container: container,
  }
}