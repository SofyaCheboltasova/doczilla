import Input from "../Input/input";
import Button from "../Button/button";

export default class Form {
  /**
   * @param {() => void} onSubmit
   */
  constructor(onSubmit) {
    this.inputs = [];
    this.element = this.getForm();

    this.#createSubmitButton(onSubmit);
  }

  /**
   * Creates a new form with empty inputs
   * @returns {HTMLUListElement}
   */
  getForm() {
    const form = document.createElement("div");
    const ul = document.createElement("ul");

    form.classList.add("form");
    ul.classList.add("row__ul");

    for (let i = 0; i < 6; ++i) {
      const li = document.createElement("li");
      ul.append(li);

      if (!i) continue;

      const input = new Input();
      this.inputs.push(input);
      li.append(input.element);
    }

    form.appendChild(ul);
    return form;
  }

  /**
   * Creates a submit button
   * @param {(data: String[]) => void} onSubmit
   */
  #createSubmitButton(onSubmit) {
    const button = new Button("Submit", () => this.#handleSubmit(onSubmit));
    this.element.append(button.element);
  }

  /**
   * Checks correctness of the inputs before calling the confirm handler
   * @param {(data: String[]) => void} onSubmit
   */
  #handleSubmit(onSubmit) {
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
      onSubmit(data);
    }
  }
}

