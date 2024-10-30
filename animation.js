import { commandMap } from "./commands/abstract.js";
import { myterminal, typer } from "./main.js";

export function typetext(text, element, delay = 15) {
	if (!text) return;

	if (element.classList.contains("no-animation")) {
		element.textContent = text;
		return;
	}

	let index = 0;
	const intervalId = setInterval(() => {
		element.textContent += text[index];
		index++;
		if (index === text.length) {
			clearInterval(intervalId);
		}
	}, delay);
}

function addLine(text, delay) {
	let formattedText = text.split("  ").join("&nbsp;&nbsp;");

	setTimeout(() => {
		let newLine = document.createElement("p");
		newLine.innerHTML = formattedText;

		myterminal.appendChild(newLine);

		window.scrollTo(0, document.body.scrollHeight);
	}, delay);
}

export async function loopLines(lines, delay) {
	lines.forEach((line, index) => {
		addLine(line, index * delay);
	});
}

// AUTOCOMPLETE SYSTEM

// This function will execute every time the user make an input event,
// it will check if the commands in the commands Map starts with the input the user entered,
// if so the function will keep updating the "typer" element with the text the user entered and the rest of the matched command.

export function updateTyper(command) {
	const suggestions = [];

	commandMap.forEach((key, _) => {
		if (key.name.startsWith(command.toLowerCase())) suggestions.push(key.name);
	});

	if (suggestions.length === 0) return;

	const matchedCommand = command ? suggestions[0] : "";

	const highlightedText = matchedCommand
		? `${command}<span class="suggestion">${matchedCommand.slice(
				command.length
		  )}</span>`
		: "";

	typer.innerHTML = highlightedText;
}
