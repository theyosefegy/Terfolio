import { displayErrorMessage, displayOutputMessage } from "../utility.js";
import { Command, commandMap } from "./abstract.js";

export class Unalias extends Command {
	constructor() {
		super("unalias", "  Removes either all commands or for a specific one.");
	}

	async execute(args) {
		const arg = args[0];

		if (!arg) {
			displayErrorMessage("Please enter either 'all' or a specific command.");
			return;
		}

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
}
