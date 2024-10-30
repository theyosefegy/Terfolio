import { displayErrorMessage, displayOutputMessage } from "../utility.js";
import { commandMap } from "./cmds.js";

export function unaliasmethod(args) {
	const arg = args[0];

	if (arg == "all") {
		window.localStorage.clear();

		for (let [_, val] of commandMap) {
			val.aliases = [];
		}

		displayOutputMessage("Cleared aliases for all commands!");
	} else if (commandMap.get(arg)) {
		for (let i = 0; i < localStorage.length; i++) {
			let storedAlias = localStorage.key(i);
			let commandName = localStorage.getItem(storedAlias);

			if (commandName == arg) {
				localStorage.removeItem(storedAlias);
			}
		}
		displayOutputMessage(`Successfully removed all aliases for "${arg}".`);
	} else {
		displayErrorMessage(`No aliases matched "${arg}".`);
		return;
	}
}
