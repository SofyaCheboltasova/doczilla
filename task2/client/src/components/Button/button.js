export default class Button {
  element;

  constructor(textContent, eventHandler) {
    this.element = this.getButton(textContent);
    this.element.addEventListener("click", eventHandler);
  }

  getButton(textContent) {
    const button = document.createElement("button");
    button.classList.add("button");

    button.textContent = textContent;
    return button;
  }
}

