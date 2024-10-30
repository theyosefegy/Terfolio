import { updateTyper } from "./animation.js";
import { commandMap } from "./commands/abstract.js";
import { Alias } from "./commands/alias.js";
import { Clear, Echo, Exit } from "./commands/basic_cmds.js";
import { Help } from "./commands/help.js";
import { handleCommand } from "./utility.js";

export const myterminal = document.getElementById("terminal");
export const commandLine = document.querySelector(".command");
export const preloadedCMDS = document.getElementById("preloaded");
export const texter = document.getElementById("texter");
export const typer = document.getElementById("typer");

texter.addEventListener("input", () => {
	typer.textContent = texter.value;
	updateTyper(texter.value);
});

texter.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault(); // Prevent default Enter key behavior

		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth", // Optional for smooth scrolling
		});

		handleCommand(texter.value.trim());

		texter.value = ""; // Clear the textarea
		typer.textContent = ""; // Clear the visible command line
	}
});

window.addEventListener("click", () => {
	texter.focus();
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth", // Optional for smooth scrolling
	});
});

document.addEventListener("DOMContentLoaded", async () => {
	texter.focus();
	updateTyper(texter.value);
});

// Commands Register
new Help().register(commandMap);
new Clear().register(commandMap);
new Alias().register(commandMap);
new Echo().register(commandMap);
new Exit().register(commandMap);
