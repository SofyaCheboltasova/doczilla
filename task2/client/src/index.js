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
   * @param {StudentPost} student
   */
  async postStudent(student) {
    const addedStudent = await this.api.postStudent(student);
    return addedStudent;
  }

  /**
   * Handle click on delete button
   */
  deleteStudent() {
    const students = this.table.clickedRows;
    const studentsArray = Array.from(students.keys());
    if (!studentsArray.length) {
      return;
    }

    studentsArray.forEach((id) => {
      this.api.deleteStudent(id);
    });

    this.table.deleteRows(studentsArray);
  }

  /**
   * Returns all students
   * @returns {Student[] | []}
   */
  async getStudents() {
    const students = this.api.getAllStudents();
    return students;
  }

  /**
   * Returns table schema
   * @returns {ColumnSchema[]}
   */
  async getSchema() {
    const schema = this.api.getSchema();
    return schema;
  }

  async main() {
    const students = await this.getStudents();
    const schema = await this.getSchema();

    const tableData = {
      students: students,
      schema: schema,
    };

    this.header = new Header(() => this.deleteStudent());
    this.table = new Table(tableData, (student) => this.postStudent(student));
    const page = new Page(this.header.element, this.table.element);

    document.body.appendChild(page.element);
  }
}

const main = new Main();
main.main();

