import { loopLines } from "../animation.js";
import { myterminal } from "../script.js";

import { commandMap } from "./cmds.js";
import { displayErrorMessage, displayOutputMessage } from "../utility.js";

export { helpMethod, exitMethod, clearMethod, echoMethod };

function helpMethod(args) {
	let lines = [];
	lines.push("<br/>");
	if (!args.length) {
		commandMap.forEach((value, key) => {
			key = `<span class="command-help">${key}</span>`;

			lines.push(`${key} ${value.description}`);
		});
	} else {
		// Get the description of a specific command.
		const command = commandMap.get(args[0]);
		if (command) {
			lines.push(
				`<span class="command-help">${command.name}</span> ${command.description}`
			);
		} else {
			lines.push(`The command "${args[0]}" is not recognized.`);
		}
	}
	lines.push("<br/>");
	loopLines(lines, 50);
}

function exitMethod(args) {
	window.close();
}

function clearMethod(args) {
	myterminal.textContent = "";
}

function echoMethod(args) {
	const message = args.join(" ");

	if (!message) {
		displayErrorMessage("Please provide a message to print.");
	}

	displayOutputMessage(message);
}
