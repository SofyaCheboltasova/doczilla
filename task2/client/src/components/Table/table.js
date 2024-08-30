import Button from "../Button/button";
import Row from "../Row/row";
import "../../types/types";

const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

export default class Table {
  element;
  #onAddClick;
  clickedRows = new Map();

  /**
   * @param {Student[]} data
   * @param {() => {}} callback
   */
  constructor(data, onAddClick) {
    this.element = this.getTable();
    this.#onAddClick = onAddClick;

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
    const row = new Row(data, () => this.handleRowClick(row, data));
    this.element.appendChild(row.element);
  }

  /**
   * Click handler for the row.
   * @param {Row} row
   * @param {Student | null} data
   */
  handleRowClick(row, data) {
    row.element.classList.toggle("clicked");

    this.clickedRows.has(data.id)
      ? this.clickedRows.delete(data.id)
      : this.clickedRows.set(data.id, data);
  }

  /**
   * Creates Add button and set event handler for it
   */
  initAddButton() {
    const button = new Button("+", () => this.handleAddClick());
    this.element.appendChild(button.element);
    return button;
  }

  /**
   * Handles the click on the Add button
   */
  handleAddClick() {
    this.element.removeChild(this.element.lastChild);
    this.addRow(null);
    this.initAddButton();

    this.#onAddClick();
  }
}

