export class Component {
	constructor() {
		this.container = document.createElement("div");
	}

	renderIn(targetElement) {
		targetElement.appendChild(this.container);
	}
}
