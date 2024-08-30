import Api from "./api";

export default class ApiRequests {
  /**
   * Makes a request to get students
   * @returns {Student[] | []}
   */
  async getAllStudents() {
    const path = Api.getUrl("students");
    const init = Api.getInit("GET");

    const students = await Api.fetch(path, init);
    return students;
  }

  /**
   * Makes a request to delete student
   * @param {Number} id
   */
  async deleteStudent(id) {
    const path = Api.getUrl("students");
    const init = Api.getInit("DELETE");

    await Api.fetch(path, init);
  }

  /**
   * Makes a request to add student
   * @param {Student} student
   */
  async postStudent(student) {
    const path = Api.getUrl("students");
    const init = Api.getInit("POST");

    await Api.fetch(path, init);
  }
}

