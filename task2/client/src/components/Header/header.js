export default class Header {
  headerElement;

  constructor() {
    this.headerElement = this.getHeader();
  }

  /**
   * @returns {HTMLDivElement}
   */
  getHeader() {
    const header = document.createElement("div");
    header.classList.add("header");

    const h1 = document.createElement("h1");
    h1.textContent = "Student class";
    h1.classList.add("header__title");

    header.appendChild(h1);
    return header;
  }
}

