import { typetext } from "../animation.js";
import { Component } from "./abstract.js";

export class Embed extends Component {
	constructor({
		title,
		description,
		link,
		imageURL,
		color = "#997c51",
		footer,
		fields = [],
	}) {
		super(); // Call the constructor of Component
		this.title = title;
		this.description = description;
		this.link = link;
		this.imageURL = imageURL;
		this.color = color;
		this.footer = footer;
		this.fields = fields;

		this.container.classList.add("embed");
		this.container.style.borderColor = `${this.color}`;
		this.container.style.borderStyle = "solid";

		this.fieldsContainer = document.createElement("div");
		this.fieldsContainer.classList.add("fields");
		this.container.appendChild(this.fieldsContainer);

		this.createEmbed();
		this.updateFields(); // Initialize fields
	}

	createEmbed() {
		if (this.title) {
			const embedTitle = document.createElement("h3");
			embedTitle.classList.add("embedTitle");
			embedTitle.textContent = this.title;

			if (this.imageURL || this.description)
				embedTitle.style.marginBottom = "5px";
			embedTitle.style.letterSpacing = "-0.8px";

			this.container.appendChild(embedTitle);
		}

		if (this.description) {
			const embedDescription = document.createElement("p");
			embedDescription.classList.add("embedDescription");

			if (!this.imageURL) embedDescription.style.gridColumn = "1/-1";

			typetext(this.description, embedDescription, 50);
			this.container.appendChild(embedDescription);
		}

		if (this.imageURL) {
			const embedImage = document.createElement("img");
			embedImage.src = this.imageURL;
			embedImage.classList.add("embedImage");
			embedImage.style.width = "300px";
			embedImage.style.padding = "10px";

			this.container.appendChild(embedImage);
		}

		if (this.link) {
			const embedLink = document.createElement("a");
			embedLink.href = this.link;
			embedLink.textContent = "View More";
			embedLink.style.color = this.color;
			embedLink.style.textDecoration = "none";
			embedLink.style.fontWeight = "bold";
			embedLink.target = "_blank";
			embedLink.classList.add("embedLink");

			this.container.appendChild(embedLink);
		}

		if (this.footer) {
			const embedFooter = document.createElement("p");
			embedFooter.classList.add("embedFooter");
			embedFooter.textContent = this.footer;

			embedFooter.style.fontSize = "12px";
			embedFooter.style.marginTop = "10px";
			this.container.appendChild(embedFooter);
		}
	}

	createField(key, value) {
		this.fields.push({ title: key, value: value });
		this.updateFields();
	}

	updateFields() {
		// Clear existing fields
		this.fieldsContainer.innerHTML = "";

		if (this.fields.length === 0) return;

		// Create and append fields
		this.fields.forEach((field) => {
			const fieldElement = document.createElement("div");
			fieldElement.classList.add("field");

			const fieldTitle = document.createElement("div");
			fieldTitle.classList.add("field-title");
			fieldTitle.textContent = field.title;

			const fieldValue = document.createElement("div");
			fieldValue.classList.add("field-value");
			fieldValue.textContent = field.value;

			fieldElement.appendChild(fieldTitle);
			fieldElement.appendChild(fieldValue);
			this.fieldsContainer.appendChild(fieldElement);
		});
	}
}
