export default class Row {
  #data;
  element;

  /**
   * @param {import("../Table/table").RowData} data
   */
  constructor(data) {
    this.#data = data;
    this.element = this.getRow();
  }

  /**
   * Returns data id.
   * @returns {number}
   */
  getId() {
    return this.#data.id;
  }

  /**
   * Returns data.
   * @returns {import("../Table/table").RowData}
   */
  getData() {
    return this.#data;
  }

  /**
   * Creates a new row.
   * @returns {HTMLUListElement}
   */
  getRow() {
    const wrapper = document.createElement("ul");

    for (const key in this.#data) {
      const li = document.createElement("li");
      li.textContent = this.#data[key];
      wrapper.appendChild(li);
    }

    wrapper.classList.add("row");
    return wrapper;
  }
}

