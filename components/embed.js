import { displayOutputMessage } from "../commands/cmds.js";
import { typetext } from "../typetext.js";

export class Embed {
	constructor({
		title,
		description,
		link,
		imageURL,
		color = "#997c51",
		footer,
		fields = [],
	}) {
		this.title = title;
		this.description = description;
		this.link = link;
		this.imageURL = imageURL;
		this.color = color;
		this.footer = footer;
		this.fields = fields;

		this.embedContainer = document.createElement("div");
		this.embedContainer.style.borderColor = `${this.color}`;
		this.embedContainer.style.borderStyle = "solid";
		this.embedContainer.classList.add("embed");

		this.fieldsContainer = document.createElement("div");
		this.fieldsContainer.classList.add("fields");

		this.embedContainer.appendChild(this.fieldsContainer);

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

			this.embedContainer.appendChild(embedTitle);
		}

		if (this.description) {
			const embedDescription = document.createElement("p");

			embedDescription.classList.add("embedDescription");

			if (this.imageURL || this.description) {
				embedDescription.style.marginBottom = "10px";
				embedDescription.style.marginTop = "10px";
			}

			if (!this.imageURL) embedDescription.style.gridColumn = "1/-1";

			typetext(this.description, embedDescription, 50);
			this.embedContainer.appendChild(embedDescription);
		}

		if (this.imageURL) {
			const embedImage = document.createElement("img");
			embedImage.src = this.imageURL;

			embedImage.classList.add("embedImage");
			embedImage.style.width = "300px";
			embedImage.style.padding = "10px";

			this.embedContainer.appendChild(embedImage);
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

			this.embedContainer.appendChild(embedLink);
		}

		if (this.footer) {
			const embedFooter = document.createElement("p");
			embedFooter.classList.add("embedFooter");
			embedFooter.textContent = this.footer;

			embedFooter.style.fontSize = "12px";
			embedFooter.style.marginTop = "10px";
			this.embedContainer.appendChild(embedFooter);
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

	renderIn(targetElement) {
		targetElement.appendChild(this.embedContainer);
	}
}
