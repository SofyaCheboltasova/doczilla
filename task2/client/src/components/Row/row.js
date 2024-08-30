import Form from "../Form/form";

export default class Row {
  /**
   * @param {ColumnSchema[]} schema
   */
  constructor(schema) {
    this.schema = schema;
    this.element = this.#getRow();
  }

  /**
   * Creates and row HTML element
   * @returns {HTMLDivElement}
   */
  #getRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
  }

  /**
   * Fills row with data and returns HTML element
   * @param {Student} data
   * @returns {HTMLUListElement}
   */
  setFilledRow(data) {
    const ul = document.createElement("ul");
    ul.classList.add("row__ul");

    for (const key in data) {
      const li = document.createElement("li");
      li.textContent = data[key];
      ul.append(li);
    }

    this.element.appendChild(ul);
  }

  /**
   * Creates an empty row with a form
   * @param {() => void} onConfirmClick
   */
  setEmptyRow(onConfirmClick) {
    const form = new Form(this.schema, (data) => {
      this.element.removeChild(form.element);
      onConfirmClick(data);
    });
    this.element.appendChild(form.element);
  }
}

