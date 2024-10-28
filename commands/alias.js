import { commandMap, registerCommand } from "./cmds.js";
import { displayErrorMessage, displayOutputMessage } from "../utility.js";

export function aliasMethod(args) {
	if (args.length < 2) {
		displayErrorMessage("Please provide both the command and the alias.");
		return;
	}

	if (args.length > 2) {
		displayErrorMessage(
			"Too many arguments provided. Please provide only the command and the alias."
		);
		return;
	}

	const [command, alias] = args.map((arg) => arg.toLowerCase());

	// Check if alias already exists
	for (let [key, value] of commandMap) {
		if (value.aliases.includes(alias)) {
			displayErrorMessage(
				`The alias "${alias}" is already assigned to the command "${key}".`
			);
			return;
		}
	}

	// Check if command exists
	if (commandMap.has(command)) {
		const commandEntry = commandMap.get(command);
		commandEntry.aliases.push(alias);

		displayOutputMessage(
			`Alias "${alias}" has been successfully created for the command "${command}".`
		);

		// Store the updated aliases in localStorage
		window.localStorage.setItem(alias, commandEntry.aliases);
	} else {
		displayErrorMessage(
			`The command "${command}" does not exist. Cannot create an alias.`
		);
	}
}

export function findCommandAlias(cmd) {
	cmd = cmd.toLowerCase();

	const storedAliases = window.localStorage.getItem(cmd);

	// Search through commandMap for the alias
	for (let [_, value] of commandMap) {
		if (value.aliases.includes(cmd)) {
			return value; // Return the command object if alias is found in commandMap
		} else if (storedAliases) {
			value.aliases = storedAliases.split(",");
			return value;
		}
	}

	// Return null if alias not found
	return null;
}
