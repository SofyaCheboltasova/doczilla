import Header from "../Header/header";
import Table from "../Table/table";

const students = [
  {
    id: 1,
    name: "Sofya",
    surname: "Sofya",
    patronymic: "Patronomic",
    datebirth: "11.11.2000",
    group: 10,
  },
  {
    id: 2,
    name: "Ivan",
    surname: "Ivanov",
    patronymic: "Ivanovich",
    datebirth: "01.01.2001",
    group: 10,
  },
  {
    id: 3,
    name: "Anna",
    surname: "Petrova",
    patronymic: "Petrovna",
    datebirth: "02.02.2002",
    group: 11,
  },
];

export default class Page {
  #header;
  #table;
	page;
	
  constructor() {
		this.#header = new Header();
		this.#table = new Table(students);
    this.page = this.getPage();
	}

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

