import Api from "./api";

export default class ApiRequests {
  async getAllStudents() {
    const path = Api.getUrl("students");
    const init = Api.getInit("GET");

    const students = await Api.fetch(path, init);
    return students;
  }

  async deleteStudent(id) {
    const path = Api.getUrl("delete-student");
    const init = Api.getInit("DELETE");

    await Api.fetch(path, init);
  }

  async postStudent(id) {
    const path = Api.getUrl("post-student");
    const init = Api.getInit("POST");

    await Api.fetch(path, init);
  }
}

