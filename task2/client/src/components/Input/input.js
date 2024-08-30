export default class Input {
  constructor() {
    this.element = this.getInput();
  }

  getInput() {
    const input = document.createElement("input");
    input.classList.add("input");
    input.required = true;
    input.addEventListener("change", () => this.unsetError());

    return input;
  }

  /**
   * Checks whether input is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.element.value.trim() === "";
  }

  hightlightEmptyInput() {
    this.isEmpty() ? this.setError() : this.unsetError();
  }

  setError() {
    this.element.classList.add("input_error");
  }

  unsetError() {
    this.element.classList.remove("input_error");
  }
}

