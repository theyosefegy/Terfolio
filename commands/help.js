import { loopLines } from "../animation.js";
import { Command, commandMap } from "./abstract.js"; // Correct import statement

export class Help extends Command {
	constructor() {
		super("help", "   Displays a list of available commands");
	}

	// Implement the execute method
	async execute(args) {
		// Example: Display available commands
		let lines = [];
		lines.push("<br/>");
		if (!args.length) {
			commandMap.forEach((value, key) => {
				key = `<span class="command-help">${key}</span>`;

				lines.push(`${key} ${value.description}`);
			});
		} else {
			// Get the description of a specific command.
			const command = commandMap.get(args[0]);
			if (command) {
				lines.push(
					`<span class="command-help">${command.name}</span> ${command.description}`
				);
			} else {
				lines.push(`The command "${args[0]}" is not recognized.`);
			}
		}
		lines.push("<br/>");
		await loopLines(lines, 50);
	}
}
