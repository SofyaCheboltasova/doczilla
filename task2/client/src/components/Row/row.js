import Button from "../Button/button";

export default class Row {
  element;

  /**
   * @param {Student | null} data
   * @param {() => {}} onRowClick
   * @param {() => {}} onButtonClick
   */
  constructor(data, onRowClick, onButtonClick) {
    this.element = this.#getRow(data, onButtonClick);

    if (data) {
      this.element.addEventListener("click", onRowClick);
    }
  }

  /**
   * @param {Student | null} data
   * @param {() => {}} onButtonClick
   *
   * @returns {HTMLDivElement}
   */
  #getRow(data, onButtonClick) {
    const row = document.createElement("div");
    row.classList.add("row");

    const ul = document.createElement("ul");
    ul.classList.add("row__ul");
    row.appendChild(ul);

    if (data) {
      this.#fillRowWithData(data, ul);
    } else {
      this.#fillRowWithInputs(ul);
      this.#setButton(row, onButtonClick);
    }
    return row;
  }

  #fillRowWithData(data, ul) {
    for (const key in data) {
      const li = document.createElement("li");
      li.textContent = data[key];
      ul.appendChild(li);
    }
  }

  #fillRowWithInputs(ul) {
    for (let i = 0; i < 6; ++i) {
      const li = document.createElement("li");
      const input = document.createElement("input");

      input.required = true;
      input.classList.add("row__input");

      li.appendChild(input);
      ul.appendChild(li);
    }
  }

  #setButton(row, onButtonClick) {
    const button = new Button("OK", () => onButtonClick());
    row.appendChild(button.element);
  }
}

