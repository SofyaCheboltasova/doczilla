import Button from "../Button/button";
import Row from "../Row/row";
import "../../types/types";

const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

export default class Table {
  /**
   * @param {TableData} data
   * @param {() => void} onConfirmClick
   */
  constructor(data, onConfirmClick) {
    this.students = data.students;
    this.schema = data.schema;
    this.clickedRows = new Map();
    // this.onRowClick = this.onRowClick.bind(this);

    this.element = this.getTable();

    if (this.students.length) {
      this.students.forEach((student) => {
        const row = this.getNewRow();
        row.setFilledRow(student);
      });
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
   * Create Row element
   * @returns {Row}
   */
  getNewRow() {
    const row = new Row(this.schema, (student) => this.onRowClick(student));
    this.element.appendChild(row.element);
    return row;
  }

  deleteRows(rows) {
    rows.forEach((row) => {
      const selectedRow = document.getElementById(row);
      selectedRow.remove();
    });
  }

  /**
   * Click handler for the row.
   *  @param {Student} data
   */
  onRowClick(data) {
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
    const row = this.getNewRow();
    row.setEmptyRow(onConfirmClick);
    this.createAddButton();
  }
}

