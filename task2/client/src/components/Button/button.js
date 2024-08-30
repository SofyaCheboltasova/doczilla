export default class Button {
  /**
   * @param {String} textContent
   * @param {() => void} eventListener
   */
  constructor(textContent, eventListener) {
    this.element = this.getButton(textContent);
    this.element.addEventListener("click", eventListener);
  }

  /**
   * Creates a button HTML element
   * @param {String} textContent
   * @returns {HTMLButtonElement}
   */
  getButton(textContent) {
    const button = document.createElement("button");
    button.classList.add("button");

    button.textContent = textContent;
    return button;
  }
}

