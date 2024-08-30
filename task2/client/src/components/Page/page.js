import Header from "../Header/header";
import Table from "../Table/table";

export default class Page {
  #header;
  #table;
  element;

  /**
   * @param {Student[] | []} students
   * @param {() => {}} addCallback
   * @param {() => {}} deleteCallback
   */
  constructor(students, addCallback, deleteCallback) {
    this.#header = new Header(deleteCallback);
    this.#table = new Table(students, addCallback);
    this.element = this.getPage();
  }

  /**
   * Creates a page HTML element
   * @returns {HTMLDivElement}
   */
  getPage() {
    const page = document.createElement("div");
    const pageContent = document.createElement("div");

    page.classList.add("page");
    pageContent.classList.add("page__content");

    pageContent.append(this.#table.element);
    page.append(this.#header.element, pageContent);
    return page;
  }
}

