export default class Header {
  element;

  constructor() {
    this.element = this.getHeader();
	}
	
  getHeader() {
    const header = document.createElement("div");
		const h1 = document.createElement("h1");
		
		header.classList.add("header");
    h1.classList.add("header__title");

    h1.textContent = "Student class";
		header.appendChild(h1);
		
    return header;
  }
}

