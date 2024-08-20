import { commandHistoryElement } from "../script.js";

import {
	commandMap,
	displayErrorMessage,
	displayOutputMessage,
} from "./cmds.js";

export { helpMethod, exitMethod, clearMethod, echoMethod };

function helpMethod(args) {
	if (!args.length) {
		commandMap.forEach((value, key) => {
			displayOutputMessage(`${key}: ${value.description}`);
		});
	} else {
		const command = commandMap.get(args[0]);
		if (command) {
			displayOutputMessage(`${command.name}: ${command.description}`);
		} else {
			displayOutputMessage(`The command "${args[0]}" is not recognized.`);
		}
	}
}

function exitMethod(args) {
	window.close();
}

function clearMethod(args) {
	commandHistoryElement.textContent = "";
	displayOutputMessage("Terminal screen cleared.");
}

function echoMethod(args) {
	if (!args) {
		displayErrorMessage("Please provide a message to echo.");
	}

	const message = args.join(" ");
	displayOutputMessage(message);
}
