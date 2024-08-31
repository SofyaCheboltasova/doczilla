export default class Input {
  /**
   * @param {ColumnSchema} schema
   */
  constructor(schema) {
    this.element = this.getInput(schema);
  }

  /**
   * @param {ColumnSchema} schema
   */
  getInput(schema) {
    const { columnSize, columnType, isNullable } = schema;
    const input = document.createElement("input");
    input.type = this.#getType(columnType);
    input.required = !isNullable;

    if (input.type === "text") {
      input.maxLength = columnSize;
    }

    input.classList.add("input");
    input.addEventListener("change", () => this.unsetError());

    return input;
  }

  #getType(type) {
    switch (type) {
      case "varchar":
      case "text":
        return "text";
      case "int4":
        return "number";
      case "date":
        return "date";
      default:
        return "text";
    }
  }

  /**
   * Returns input's value
   * @returns {String}
   */
  get value() {
    return this.element.value;
  }

  /**
   * Checks whether input is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.element.value.trim() === "";
  }

  setError() {
    this.element.classList.add("input_error");
  }

  unsetError() {
    this.element.classList.remove("input_error");
  }
}

