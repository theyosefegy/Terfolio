import { updateTyper } from "./animation.js";
import { displayErrorMessage, displayOutputMessage } from "./utility.js";

import { commandMap } from "./commands/cmds.js";
import { bannerMethod } from "./commands/banner.js";
import { findCommandByAlias } from "./commands/alias.js";
export { myterminal, commandLine, preloadedCMDS, typer, texter };

const myterminal = document.getElementById("terminal");
const commandLine = document.querySelector(".command");
const preloadedCMDS = document.getElementById("preloaded");
const texter = document.getElementById("texter");
const typer = document.getElementById("typer");

function handleCommand(commandString) {
	if (!commandString.trim()) return;

	displayOutputMessage(commandString, true);

	// Scroll terminal to the latest message
	myterminal.scrollTop = myterminal.scrollHeight;

	// Split commandString into command and args
	const [command, ...args] = commandString.toLowerCase().trim().split(" ");

	// Check if the command exists in commandMap or if it's an alias
	let commandHandler = commandMap.get(command) || findCommandByAlias(command);

	// Execute the command if found, otherwise show error message
	if (commandHandler) {
		try {
			commandHandler.method(args);
		} catch (error) {
			console.error(
				`An error occurred while executing the command "${command}": ${error.message}`
			);
		}
	} else {
		displayErrorMessage(
			`The command "${command}" is not recognized. Type "help" for a list of available commands.`
		);
	}
}

texter.addEventListener("input", () => {
	typer.textContent = texter.value;
	updateTyper(texter.value);
});

texter.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault(); // Prevent default Enter key behavior

		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth", // Optional for smooth scrolling
		});

		handleCommand(texter.value.trim());

		texter.value = ""; // Clear the textarea
		typer.textContent = ""; // Clear the visible command line
	}
});

window.addEventListener("click", () => {
	texter.focus();
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth", // Optional for smooth scrolling
	});
});

document.addEventListener("DOMContentLoaded", async () => {
	bannerMethod();
	texter.focus();
	updateTyper(texter.value);
});
