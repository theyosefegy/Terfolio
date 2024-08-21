import * as cmds from "./commands/cmds.js";
export { myterminal, inputLine, preloadedCMDS, commandHistoryElement };

const myterminal = document.getElementById("terminal");
const inputLine = document.querySelector(".prompt-line");

const commandHistoryElement = document.getElementById("history");
const preloadedCMDS = document.getElementById("preloaded");

const texter = document.getElementById("texter");
const typer = document.getElementById("typer");

function handleCommand(commandString) {
	cmds.displayOutputMessage(commandString, true);

	if (!commandString) return;
	myterminal.scrollTop = myterminal.scrollHeight;

	const [command, ...args] = commandString.toLowerCase().split(" ");

	const commandHandler =
		cmds.commandMap.get(command) || findCommandAlias(command);

	if (commandHandler) {
		commandHandler.method(args);
	} else {
		cmds.displayErrorMessage(
			`The command "${command}" is not recognized. Type "help" for a list of available commands.`
		);
	}
}

function findCommandAlias(cmd) {
	for (let [_, value] of cmds.commandMap) {
		if (value.aliases.includes(cmd)) {
			return value;
		}
	}
	return null;
}

texter.addEventListener("input", () => (typer.textContent = texter.value));

texter.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault(); // Prevent default Enter key behavior
		handleCommand(texter.value.trim());

		myterminal.scrollTop = myterminal.scrollHeight;
		texter.value = ""; // Clear the textarea
		typer.textContent = ""; // Clear the visible command line
	}
});

document.addEventListener("click", () => texter.focus());
document.addEventListener("DOMContentLoaded", () => texter.focus());
