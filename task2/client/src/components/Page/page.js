export default class Page {
  /**
   * @param {HTMLDivElement} header
   * @param {HTMLDivElement} table
   */
  constructor(header, table) {
    this.element = this.getPage(header, table);
  }

  /**
   * Creates a page HTML element
   * @param {HTMLDivElement} header
   * @param {HTMLDivElement} table
   * @returns {HTMLDivElement}
   */
  getPage(header, table) {
    const page = document.createElement("div");
    const pageContent = document.createElement("div");

    page.classList.add("page");
    pageContent.classList.add("page__content");

    pageContent.append(table);
    page.append(header, pageContent);
    return page;
  }
}

