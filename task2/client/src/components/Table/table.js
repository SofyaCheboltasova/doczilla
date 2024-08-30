import Row from "../Row/row";

const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

/**
 * @typedef {Object} RowData
 * @property {number} id
 * @property {string} name
 * @property {string} surname
 * @property {string} patronymic
 * @property {string} datebirth
 * @property {number} group
 */

export default class Table {
  element;
  clickedRows = new Map();

  /**
   * @param {RowData[]} data
   * @param {() => {}} callback
   */
  constructor(data, callback) {
    this.element = this.getTable();

    data.forEach((data) => this.addRow(data));
    this.addButton(callback);
  }

  /**
   * Creates table and it's header.
   *
   * @returns {HTMLDivElement}
   */
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

  /**
   * Click handler for the row.
   *
   * @param {Row} row
   */
  handleClick(row) {
    row.element.classList.toggle("clicked");

    this.clickedRows.has(row.getId())
      ? this.clickedRows.delete(row.getId())
      : this.clickedRows.set(row.getId(), row.getData());
  }

  /**
   * Creates and fills a row for a table.
   *
   * @param {RowData} rowData
   */
  addRow(rowData) {
    const row = new Row(rowData);
    row.element.addEventListener("click", () => this.handleClick(row));
    this.element.appendChild(row.element);
  }

  /**
   * Creates an Add button.
   *
   * @param {() => {}} callback
   */
  addButton(callback) {
    const button = document.createElement("div");
    button.classList.add("table__button");
    button.addEventListener("click", callback);

    const plusSign = document.createElement("div");
    plusSign.classList.add("table__button_plus");
    plusSign.textContent = "+";
    button.appendChild(plusSign);

    this.element.appendChild(button);
  }
}

