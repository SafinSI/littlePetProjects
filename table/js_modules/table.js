export default class Table {
  constructor(parentId, tableData) {
    this.data = tableData.data;
    this.columns = tableData.columns;
    this.element = document.getElementById(parentId);
    this._create();
  }

  static makeFormation(cellData, column) {
    if (column?.formatter) {
      return column.formatter(cellData);
    }
    return cellData;
  }

  static createRowCell(cellData, column) {
    const rowCell = document.createElement('td');
    rowCell.innerHTML = Table.makeFormation(cellData, column);
    rowCell.classList.add('table-row-cell');
    return rowCell;
  }

  static createHeaderCell(cellData) {
    const rowCell = document.createElement('th');
    rowCell.innerHTML = cellData;
    rowCell.classList.add('table-header-cell');
    return rowCell;
  }

  createRow(rowContent) {
    const row = document.createElement('tr');
    Object.values(rowContent).forEach((item, i) => {
      row.appendChild(Table.createRowCell(item, this.columns[i]));
    });
    row.classList.add('table-row');
    return row;
  }

  createHead() {
    const thead = document.createElement('thead');
    const row = document.createElement('tr');
    this.columns.forEach((column) => {
      row.appendChild(Table.createHeaderCell(column.title));
    });
    thead.appendChild(row);
    thead.classList.add('table-header');
    return thead;
  }

  createBody() {
    const tbody = document.createElement('tbody');
    this.data.forEach((rowContent) => {
      tbody.appendChild(this.createRow(rowContent));
    });
    tbody.classList.add('table-body');
    return tbody;
  }

  _create() {
    const table = document.createElement('table');
    table.appendChild(this.createHead());
    table.appendChild(this.createBody());
    table.classList.add('table');
    this.element.append(table);
  }
}
