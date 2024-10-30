import { myterminal } from "./main.js";
import { typetext } from "../animation.js";

import { Embed } from "../components/embed.js";
import { findCommandByAlias } from "./commands/alias.js";
import { commandMap } from "./commands/abstract.js";

export function displayErrorMessage(msg) {
	const errorOutput = document.createElement("p");
	errorOutput.classList.add("error");

	typetext(msg, errorOutput, 1);
	myterminal.append(errorOutput); // Insert before the input line
}

export function displayOutputMessage(cmd, isPreloaded = false, animationDelay) {
	const output = document.createElement("p");

	isPreloaded ? output.classList.add("preloaded-msg") : "";
	isPreloaded ? output.classList.add("no-animation") : "";

	typetext(cmd, output, animationDelay);

	texter.value = "";
	typer.textContent = "";

	myterminal.append(output); // Insert before the input line
}

export function handleCommand(commandString) {
	if (!commandString.trim()) return;

	displayOutputMessage(commandString, true);

	// Split commandString into command and args
	const [command, ...args] = commandString.trim().split(" ");

	// Check if the command exists in commandMap or if it's an alias
	let commandHandler = commandMap.get(command) || findCommandByAlias(command);

	// Execute the command if found, otherwise show error message
	if (commandHandler) {
		try {
			commandHandler.execute(args);
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

const token = fetch("./config.json")
	.then((response) => response.json())
	.then((config) => config.GITHUB_TOKEN) // Extract GITHUB_TOKEN
	.catch((error) => {
		console.error("Error loading config:", error);
		return null;
	});

export async function returnJsonObject(url) {
	try {
		const authToken = await token; // Wait for the token to resolve
		if (!authToken) throw new Error("Token not available");

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `token ${authToken}`,
				Accept: "application/vnd.github.v3+json",
			},
		});
		return await response.json();
	} catch (error) {
		console.error("Error fetching JSON:", error);

		const embedError = new Embed({
			color: "red",
			description: "Error: Something went wrong.",
		});

		embedError.renderIn(myterminal);
	}
}
