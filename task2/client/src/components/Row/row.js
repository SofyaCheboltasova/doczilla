import Form from "../Form/form";

export default class Row {
  /**
   * @param {Student | null} data
   * @param {(() => void) | null} onRowClick
   * @param {((student: Student) => void) | null} onConfirmClick
   */
  constructor(data, onRowClick, onConfirmClick) {
    this.element = this.#getRow(data);

    if (data) {
      const content = this.#getRowContent(data);
      this.element.appendChild(content);
      onRowClick && this.element.addEventListener("click", onRowClick);
    } else {
      const form = new Form(onConfirmClick);
      this.element.appendChild(form.element);
    }
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
  #getRowContent(data) {
    const ul = document.createElement("ul");
    ul.classList.add("row__ul");

    for (const key in data) {
      const li = document.createElement("li");
      li.textContent = data[key];
      ul.append(li);
    }

    return ul;
  }
}

