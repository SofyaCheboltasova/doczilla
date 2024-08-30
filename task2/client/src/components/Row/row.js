export default class Row {
  #data;
  element;

  /**
   * @param {Student | null} data
   * @param {() => {}} onClick
   */
  constructor(data, onClick) {
    this.#data = data;
    this.element = this.#getRow();

    if (data) {
      this.element.addEventListener("click", onClick);
    }
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
   * @returns {Student}
   */
  getData() {
    return this.#data;
  }

  /**
   * @returns {HTMLUListElement}
   */
  #getRow() {
    const wrapper = document.createElement("ul");
    wrapper.classList.add("row");

    if (this.#data) {
      this.#fillRowWithData(wrapper);
    } else {
      this.#fillRowWithInputs(wrapper);
    }
    return wrapper;
  }

  #fillRowWithData(wrapper) {
    for (const key in this.#data) {
      const li = document.createElement("li");
      li.textContent = this.#data[key];
      wrapper.appendChild(li);
    }
  }

  #fillRowWithInputs(wrapper) {
    for (let i = 0; i < 6; ++i) {
      const li = document.createElement("li");
      const input = document.createElement("input");
      li.appendChild(input);
      wrapper.appendChild(li);
    }

    const button = document.createElement("button");
    button.textContent = "OK";
    wrapper.appendChild(button);
  }
}

