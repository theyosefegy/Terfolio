import { commandMap, Command } from "./abstract.js";

import { displayErrorMessage, displayOutputMessage } from "../utility.js";

export class Alias extends Command {
	constructor() {
		super("alias", "    Creates a shorcut for a command.");
	}

	async execute(args) {
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

		if (command == alias) {
			displayErrorMessage(
				"why would you even do that.. it doesn't make sense."
			);
			return;
		}

		// Check if alias already exists
		for (let [key, value] of commandMap) {
			if (value.aliases.includes(alias) || window.localStorage.getItem(alias)) {
				displayErrorMessage(
					`The alias "${alias}" is already assigned to the command "${key}".`
				);
				return;
			}
		}

		// Check if command exists
		if (commandMap.has(command)) {
			console.log(commandMap);
			const commandEntry = commandMap.get(command);

			// if the command does exist, add the alias you wrote to its list of aliases
			console.log(command, commandEntry);

			displayOutputMessage(
				`Alias "${alias}" has been successfully created for the command "${command}".`
			);

			// Store the updated aliases in localStorage
			window.localStorage.setItem(alias, command);
		} else {
			console.log(commandMap);
			displayErrorMessage(
				`The command "${command}" does not exist. Cannot create an alias.`
			);
		}
	}
}

export function findCommandByAlias(alias) {
	alias = alias.toLowerCase();

	const commandName = window.localStorage.getItem(alias);

	// Search through commandMap for the alias
	for (let [_, value] of commandMap) {
		if (value.aliases.includes(alias)) {
			// Return the command object if alias is found in commandMap
			return value;
		} else if (commandName) {
			// if the there's a command who has this alias in the local storage, get it from the commandMap, then add the alias to its list
			// before returning it from the command map.
			value = commandMap.get(commandName.toLowerCase());
			value.aliases.push(alias);
			return value;
		}
	}

	// Return null if alias not found
	return null;
}
