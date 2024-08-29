const headers = ["ID", "Name", "Surname", "Patronymic", "Datebirth", "Group"];

export default class Table {
  tableElement;

  constructor() {
    this.tableElement = this.createTable();
  }

  createTable() {
    const table = document.createElement("div");
    table.classList.add("table");

    const header = document.createElement("ul");
    header.classList.add("table__header");

    headers.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      header.appendChild(li);
    });

    table.appendChild(header);
    return table;
  }

  addStudent(student) {
    this.tableElement.appendChild(student);
    student.classList.add("table__row");
  }
}

