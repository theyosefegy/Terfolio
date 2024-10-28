import { displayErrorMessage, displayOutputMessage } from "../utility.js";

export function clearAliasesMethod(args) {
	if (!args) {
		displayErrorMessage(
			"Please provide either 'all' or a specific command you want to delete its aliases."
		);
		return;
	}

	if (args[0] == "all") {
		window.localStorage.clear();
		displayOutputMessage("Cleared aliases for all commands!");
	}
}
