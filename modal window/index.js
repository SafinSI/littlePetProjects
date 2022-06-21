let fruits = [
  { id: 1, title: 'Апельсин', price: 20, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_500.jpg' },
  { id: 2, title: 'Яблоко', price: 30, img: 'https://st.depositphotos.com/1003272/1632/i/600/depositphotos_16322913-stock-photo-red-apple.jpg' },
  { id: 3, title: 'Манго', price: 40, img: 'https://st3.depositphotos.com/1020804/12760/i/600/depositphotos_127608560-stock-photo-mango-cubes-and-mango-fruit.jpg' },
  { id: 4, title: 'Груша', price: 40, img: 'https://fruktlove.ru/wp-content/uploads/2018/08/grusha-forelle.jpg' },
]

const gallery = $.cardGallery({
  data: fruits,
  containerId: 'card-container',
})
