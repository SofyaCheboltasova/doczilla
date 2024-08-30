import "./index.scss";

import "./types/types";
import Page from "./components/Page/page";
import ApiRequests from "./api/apiRequests";

class Main {
  constructor() {
    this.api = new ApiRequests();
  }

  /**
   * Handle click on add button
   * @returns {Student[]}
   */
  handleAddClick() {
    this.api.postStudent(student);
  }

  /**
   * Handle click on delete button
   * @returns {Student[]}
   */
  handleDeleteClick() {}

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
    const page = new Page(
      students,
      this.handleAddClick,
      this.handleDeleteClick
    );
    document.body.appendChild(page.element);
  }
}

const main = new Main();
main.main();

