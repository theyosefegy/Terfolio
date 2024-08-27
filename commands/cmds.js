export {
	commandMap,
	displayErrorMessage,
	displayOutputMessage,
	returnJsonObject,
};

import { commandHistoryElement, inputLine } from "../script.js";
import { typetext } from "../typetext.js";

import { helpMethod, exitMethod, clearMethod, echoMethod } from "./basics.js";
import { aliasMethod } from "./alias.js";
import { githubMethod } from "./github.js";
import { Embed } from "../components/embed.js";

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
		"github",
		createCommandConfig(
			"github",
			"Shows my github page statistics.",
			githubMethod
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

async function returnJsonObject(url) {
	try {
		const response = await fetch(url, { method: "GET" });
		return await response.json();
	} catch {
		const embedError = new Embed({
			color: "red",
			description: "Error: Something wring occured.",
		});

		embedError.renderIn(commandHistoryElement);
	}
}
