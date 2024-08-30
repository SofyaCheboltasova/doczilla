import Button from "../Button/button";
import Input from "../Input/input";

export default class Row {
  /**
   * @param {Student | null} data
   * @param {(() => void) | null} onRowClick
   * @param {((student: Student) => void) | null} onConfirmClick
   */
  constructor(data, onRowClick, onConfirmClick) {
    this.inputs = [];
    this.element = this.#getRow(data);

    onRowClick && this.element.addEventListener("click", onRowClick);
    onConfirmClick && this.#setConfirmButton(this.element, onConfirmClick);
  }

  /**
   * Creates and fills a new row
   * @param {Student | null} data
   * @returns {HTMLDivElement}
   */
  #getRow(data) {
    const row = document.createElement("div");
    const ul = document.createElement("ul");

    row.classList.add("row");
    ul.classList.add("row__ul");
    row.appendChild(ul);

    data ? this.#fillData(data, ul) : this.#fillInputs(ul);
    return row;
  }

  /**
   * Fills row with student's data
   * @param {Student} data
   * @param {HTMLUListElement} list
   */
  #fillData(data, list) {
    for (const key in data) {
      const li = document.createElement("li");
      li.textContent = data[key];
      list.append(li);
    }
  }

  /**
   * Fills row with empty inputs.
   * @param {HTMLUListElement} list
   */
  #fillInputs(list) {
    for (let i = 0; i < 6; ++i) {
      const li = document.createElement("li");
      list.append(li);

      if (!i) continue;

      const input = new Input();
      this.inputs.push(input);
      li.append(input.element);
    }
  }

  /**
   * Creates a button for adding a new student
   * @param {HTMLDivElement} row
   * @param {(data: String[]) => void} onConfirmClick
   */
  #setConfirmButton(row, onConfirmClick) {
    const button = new Button("Confirm", () =>
      this.#handleConfirm(onConfirmClick)
    );
    row.append(button.element);
  }

  /**
   * Checks correctness of the inputs before calling the confirm handler
   * @param {(data: String[]) => void} onConfirmClick
   */
  #handleConfirm(onConfirmClick) {
    let allFilled = true;

    this.inputs.forEach((input) => {
      if (input.isEmpty()) {
        input.setError();
        allFilled = false;
      } else {
        input.unsetError();
      }
    });

    if (allFilled) {
      const data = this.inputs.map((input) => input.value);
      onConfirmClick(data);
    }
  }
}

