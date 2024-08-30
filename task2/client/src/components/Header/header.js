import Button from "../Button/button";

export default class Header {
  /**
   * @param {() => void} onDeleteClick
   */
  constructor(onDeleteClick) {
    this.element = this.getHeader(onDeleteClick);
  }

  /**
   * Creates a Header element
   * @param {() => void} onDeleteClick
   * @returns {HTMLDivElement}
   */
  getHeader(onDeleteClick) {
    const header = document.createElement("div");
    const h1 = document.createElement("h1");
    const button = new Button("Delete", onDeleteClick);

    header.classList.add("header");
    h1.classList.add("header__title");
    h1.textContent = "Student class";

    header.append(h1, button.element);
    return header;
  }
}

