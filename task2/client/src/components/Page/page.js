import Header from "../Header/header";
import Student from "../Student/student";
import Table from "../Table/table";

const student = {
      id: 1,
      name: "Sofya",
      surname: "Sofya",
      patronymic: "Patronomic",
      datebirth: "11.11.2000",
      group: 10,
    };

export default class Page {
  #header;
  #student;
  #table;
	page;
	
  constructor() {
		this.#header = new Header();
		this.#student = new Student(student);
		this.#table = new Table();
		this.#table.addStudent(this.#student.studentElement);

    this.page = this.createPage();
	}
	
	addStudents(students) {
		for (student in students) {
			this.#table.addStudent(student);
		}
	}

  createPage() {
    const page = document.createElement("div");		
		const pageContent = document.createElement("div");

		page.classList.add("page");
		pageContent.classList.add("page__content");

		pageContent.append(this.#table.tableElement);
    page.append(this.#header.headerElement, pageContent);
    return page;
  }
}

