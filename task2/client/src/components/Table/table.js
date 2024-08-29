import Row from "../Row/row";

const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

export default class Table {
  element;
  #rowsData;

  constructor(rows) {
    this.#rowsData = rows;
    this.element = this.getTable();

    this.#rowsData.forEach((data) => {
      this.addRow(data);
    });
  }

  getTable() {
    const table = document.createElement("div");
    table.classList.add("table");

    const header = document.createElement("ul");
    header.classList.add("table__header");

    headers.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      header.appendChild(li);
    });

    table.appendChild(header);
    return table;
  }

  addRow(rowData) {
    const row = new Row(rowData);
    this.element.appendChild(row.element);
  }
}

