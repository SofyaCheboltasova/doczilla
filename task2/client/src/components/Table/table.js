import Button from "../Button/button";
import Row from "../Row/row";
import "../../types/types";

const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

export default class Table {
  /**
   * @param {Student[]} students
   * @param {() => void} onConfirmClick
   */
  constructor(students, onConfirmClick) {
    this.clickedRows = new Map();
    this.element = this.getTable();

    if (students.length) {
      students.forEach((student) => this.addFilledRow(student));
    }

    this.createAddButton(onConfirmClick);
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
   * Creates a row filled with data.
   * @param {Student} data
   */
  addFilledRow(data) {
    const row = new Row(data, (data) => this.onRowClick(data), null);
    this.element.appendChild(row.element);
  }

  /**
   * Click handler for the row.
   *  @param {Student} data
   */
  onRowClick(data) {
    this.element.classList.toggle("clicked");

    this.clickedRows.has(data.id)
      ? this.clickedRows.delete(data.id)
      : this.clickedRows.set(data.id, data);
  }

  /**
   * Creates Add button and set event handler for it
   * @param {() => void} onConfirmClick
   */
  createAddButton(onConfirmClick) {
    const button = new Button("+", () => this.handleAddClick(onConfirmClick));
    this.element.appendChild(button.element);
  }

  /**
   * Removes Add button, add an empty row, add Add button
   * @param {() => void} onConfirmClick
   */
  handleAddClick(onConfirmClick) {
    this.element.removeChild(this.element.lastChild);
    this.addEmptyRow(onConfirmClick);
    this.createAddButton();
  }

  /**
   * Creates an empty row with confirm button
   * @param {() => void} onConfirmClick
   */
  addEmptyRow(onConfirmClick) {
    const row = new Row(null, null, onConfirmClick);
    this.element.appendChild(row.element);
  }
}

