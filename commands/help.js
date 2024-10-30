import { loopLines } from "../animation.js";
import { Command, commandMap } from "./abstract.js"; // Correct import statement

export class Help extends Command {
	constructor() {
		super("help", "     Displays all available commands.");
	}

	// Implement the execute method
	async execute(args) {
		// Example: Display available commands
		let lines = ["<br/>"];

		if (args.length) {
			// Get the description of a specific command.
			const command = commandMap.get(args[0]);
			if (command) {
				lines.push(command.__repr__());
			} else {
				lines.push(`The command "${args[0]}" is not recognized.`);
			}
			lines.push("<br/>");
			await loopLines(lines, 50);

			return;
		}

		for (let [_, val] of commandMap.entries()) {
			lines.push(val.__repr__());
		}

		lines.push("<br/>");
		await loopLines(lines, 50);
	}
}
