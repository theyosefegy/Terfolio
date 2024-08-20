import {
	commandMap,
	displayErrorMessage,
	displayOutputMessage,
} from "./cmds.js";

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

	const [command, alias] = args;

	for (let [key, value] of commandMap) {
		if (value.aliases.includes(alias)) {
			displayErrorMessage(
				`The alias "${alias}" is already assigned to the command "${key}".`
			);
			return;
		}
	}

	if (commandMap.has(command)) {
		commandMap.get(command).aliases.push(alias);
		displayOutputMessage(
			`Alias "${alias}" has been successfully created for the command "${command}".`
		);
	} else {
		displayErrorMessage(
			`The command "${command}" does not exist. Cannot create an alias.`
		);
	}
}
