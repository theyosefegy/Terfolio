export { commandMap, displayErrorMessage, displayOutputMessage };

import { commandHistoryElement } from "../script.js";
import { typetext } from "../animate/typetext.js";

import { helpMethod, exitMethod, clearMethod, echoMethod } from "./basics.js";
import { aliasMethod } from "./alias.js";

function createCommandConfig(name, description, method, aliases = []) {
	return { name, description, aliases, method };
}

const commandMap = new Map([
	[
		"help",
		createCommandConfig(
			"help",
			"Display a list of all available commands.",
			helpMethod
		),
	],
	["echo", createCommandConfig("echo", "Print a message.", echoMethod)],
	[
		"alias",
		createCommandConfig(
			"alias",
			"Create a shortcut for a command.",
			aliasMethod
		),
	],
	[
		"clear",
		createCommandConfig("clear", "Clear the terminal screen.", clearMethod),
	],
	["exit", createCommandConfig("exit", "Exits the terminal.", exitMethod)],
]);

function displayErrorMessage(msg) {
	const errorOutput = document.createElement("p");
	errorOutput.classList.add("error");

	typetext(msg, errorOutput);
	commandHistoryElement.append(errorOutput); // Insert before the input line
}

function displayOutputMessage(cmd, isPreloaded = false) {
	const output = document.createElement("p");
	isPreloaded ? output.classList.add("preloadedMsg") : "";
	isPreloaded ? output.classList.add("no-animation") : "";

	typetext(cmd, output);

	texter.value = "";
	typer.textContent = "";

	commandHistoryElement.append(output); // Insert before the input line
}
