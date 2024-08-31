import Form from "../Form/form";

export default class Row {
  /**
   * @param {ColumnSchema[]} schema
   * @param {(student: Student) => void} eventListener
   */
  constructor(schema, eventListener) {
    this.schema = schema;
    this.eventListener = eventListener;
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

    this.element.id = data.id;
    this.element.appendChild(ul);

    this.element.addEventListener("click", () => {
      this.element.classList.toggle("clicked");
      this.eventListener(data);
    });
  }

  /**
   * Creates an empty row with a form
   * @param {() => void} onConfirmClick
   */
  setEmptyRow(onConfirmClick) {
    const form = new Form(this.schema, async (data) => {
      this.element.removeChild(form.element);
      const student = await onConfirmClick(data);
      this.setFilledRow(student);
    });
    this.element.appendChild(form.element);
  }
}

