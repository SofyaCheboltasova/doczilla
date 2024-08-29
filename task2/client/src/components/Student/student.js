export default class Student {
  #studentData;
  studentElement;

  /**
   * @param {Object} student
   */
  constructor(student) {
    this.#studentData = student;
    this.studentElement = this.createStudent();
  }

  createStudent() {
    const studentWrapper = document.createElement("div");
    const ul = document.createElement("ul");

    for (const key in this.#studentData) {
      const li = document.createElement("li");
      li.textContent = this.#studentData[key];
      ul.appendChild(li);
    }

    studentWrapper.classList.add("student");
    ul.classList.add("student__dataList");
    studentWrapper.appendChild(ul);
    return studentWrapper;
  }
}

