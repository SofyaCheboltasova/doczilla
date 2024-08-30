export default class Header {
  element;

  constructor() {
    this.element = this.getHeader();
	}

	/**
	 * Creates a Delete button element
	 * @returns {HTMLDivElement}
	*/
	getDeleteButton() {
		const button = document.createElement('div');
		button.classList.add('header__button_delete', 'hidden');

		const img = document.createElement('img');
		img.src = '';

		button.appendChild(img);
		return button;
	}
	
	/**
	 * Creates a Header element
	 * @returns {HTMLDivElement}
	*/
  getHeader() {
    const header = document.createElement("div");
		const h1 = document.createElement("h1");
		const deleteButton = this.getDeleteButton();
		
		header.classList.add("header");
		h1.classList.add("header__title");

    h1.textContent = "Student class";
		header.append(h1, deleteButton);
		
    return header;
  }
}

