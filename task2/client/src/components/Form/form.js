import Input from "../Input/input";
import Button from "../Button/button";

import "../../types/types";
export default class Form {
  /**
   * @param {ColumnSchema[]} schema
   * @param {(data: StudentPost) => void} onSubmit
   */
  constructor(schema, onSubmit) {
    this.inputs = [];
    this.element = this.getForm();

    this.setInputs(schema);

    this.#setSubmitButton(onSubmit);
  }

  /**
   * Creates a new form with empty inputs
   * @returns {HTMLUListElement}
   */
  getForm() {
    const form = document.createElement("div");
    form.classList.add("form");
    return form;
  }

  /**
   * Fill form with inputs
   * @param {ColumnSchema[]} schema
   */
  setInputs(schema) {
    const ul = document.createElement("ul");
    ul.classList.add("row__ul");
    this.element.appendChild(ul);

    schema.forEach((column) => {
      const li = document.createElement("li");
      ul.append(li);

      if (column.columnName.toLowerCase() === "id") {
        return;
      }

      const input = this.#getInput(column);
      li.append(input);
    });
  }

  /**
   * Creates an input
   * @param {ColumnSchema} schema
   */
  #getInput(schema) {
    const input = new Input(schema);
    this.inputs.push(input);
    return input.element;
  }

  /**
   * Creates a submit button
   * @param {(data: StudentPost) => void} onSubmit
   */
  #setSubmitButton(onSubmit) {
    const button = new Button("Submit", () => this.#handleSubmit(onSubmit));
    this.element.append(button.element);
  }

  /**
   * Checks correctness and cast types
   * @param {(data: StudentPost) => void} onSubmit
   */
  #handleSubmit(onSubmit) {
    if (!this.#isAllInputsFilled()) {
      return;
    }
    const data = this.inputs.map((input) => input.value);
    const castTypeData = this.#castType(data);
    onSubmit(castTypeData);
  }

  /**
   * Sets error if input is empty
   * @returns {boolean}
   */
  #isAllInputsFilled() {
    let allFilled = true;

    this.inputs.forEach((input) => {
      if (input.isEmpty()) {
        input.setError();
        allFilled = false;
      } else {
        input.unsetError();
      }
    });

    return allFilled;
  }

  /**
   * Cast inputs' values to StudentPost type
   * @param {String[]} data
   * @return {StudentPost}
   */
  #castType(data) {
    const castData = {
      name: data[0],
      surname: data[1],
      patronymic: data[2],
      birthdate: new Date(data[3]).toISOString(),
      groupid: parseInt(data[4], 10),
    };
    return castData;
  }
}

