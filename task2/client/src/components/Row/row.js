export default class Row {
  #data;
  element;

  /**
   * @param {Object} data
   */
  constructor(data) {
    this.#data = data;
    this.element = this.getRow();
  }

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

