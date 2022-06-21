import Table from './js_modules/table';

const url = 'http://localhost:3000/data';

fetch(url)
  .then((data) => data.json())
  .then((data) => {
    const table = new Table('table-wrapper', {
      data,
      columns: [
        { title: '№', field: 'num' },
        { title: 'Дата', field: 'date' },
        { title: 'Цикл', field: 'cycle' },
        { title: 'Этап', field: 'stage' },
        { title: 'Год', field: 'year' },
        { title: 'Субсидия', field: 'subsidie' },
        { title: 'Сумма, руб', field: 'amount_rub' },
        { title: 'Период', field: 'period' },
        { title: 'Статус', field: 'status' },
        { title: 'Основание', field: 'base' },
        {
          title: 'Комментарий', field: 'comment', width: '40%', 'text-overflow': 'ellipsis',
        },
      ],
    });
    console.log(table);
  });
