import Row from "../Row/row";

const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

export default class Table {
  element;
  #callback;
  clickedRows = new Map();

  /**
   * @param {Student[]} data
   * @param {() => {}} callback
   */
  constructor(data, callback) {
    this.element = this.getTable();
    this.#callback = callback;

    if (data.length) {
      data.forEach((data) => this.addRow(data));
    }
    this.initAddButton();
  }

  /**
   * Creates table HTML element.
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
   * Creates and fills a row for a table.
   * @param {Student | null} data
   */
  addRow(data) {
    const row = new Row(data, () => this.handleRowClick(row));
    this.element.appendChild(row.element);
  }

  /**
   * Click handler for the row.
   * @param {Row} row
   */
  handleRowClick(row) {
    row.element.classList.toggle("clicked");

    this.clickedRows.has(row.getId())
      ? this.clickedRows.delete(row.getId())
      : this.clickedRows.set(row.getId(), row.getData());
  }

  /**
   * Creates Add button and set event handler for it
   */
  initAddButton() {
    const addButton = this.getAddButton();
    addButton.addEventListener("click", () => this.handleAddClick());
  }

  /**
   * Handles the click on the Add button
   */
  handleAddClick() {
    this.element.removeChild(this.element.lastChild);
    this.addRow(null);
    this.initAddButton();

    this.#callback();
  }

  /**
   * Creates an Add button HTML element.
   * @returns {HTMLDivElement}
   */
  getAddButton() {
    const button = document.createElement("div");
    button.classList.add("table__button");

    const plusSign = document.createElement("div");
    plusSign.classList.add("table__button_plus");
    plusSign.textContent = "+";
    button.appendChild(plusSign);

    this.element.appendChild(button);
    return button;
  }
}

