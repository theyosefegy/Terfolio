import { myterminal } from "../main.js";
import { displayOutputMessage } from "../utility.js";
import { Command } from "./abstract.js";

export class Clear extends Command {
	constructor() {
		super("clear", "  Clears the terminal history.");
	}

	async execute(args) {
		myterminal.textContent = "";
	}
}

export class Exit extends Command {
	constructor() {
		super("exit", "   Exits the terminal.");
	}

	async execute(args) {
		window.close();
	}
}

export class Echo extends Command {
	constructor() {
		super("echo", "   Prints text into the terminal.");
	}

	async execute(args) {
		const message = args.join(" ");

		if (!message) {
			displayErrorMessage("Please provide a message to print.");
		}

		displayOutputMessage(message);
	}
}
