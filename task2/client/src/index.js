import "./index.scss";

import "./types/types";
import Page from "./components/Page/page";
import Header from "./components/Header/header";
import Table from "./components/Table/table";
import ApiRequests from "./api/apiRequests";

class Main {
  constructor() {
    this.api = new ApiRequests();
  }

  /**
   * Handle click on add button
   * @param {Student} student
   */
  addStudent(student) {
    this.api.postStudent(student);
  }

  /**
   * Handle click on delete button
   * @param {Student[]} students
   */
  deleteStudent(students) {
    students.forEach((student) => {
      this.api.deleteStudent(student.id);
    });
  }

  /**
   * Returns all students
   * @returns {Student[] | []}
   */
  getStudents() {
    const students = this.api.getAllStudents();
    return students;
  }

  main() {
    const students = this.getStudents();
    const header = new Header(() => this.deleteStudent());
    const table = new Table(students, (student) => this.addStudent(student));
    const page = new Page(header.element, table.element);

    document.body.appendChild(page.element);
  }
}

const main = new Main();
main.main();

