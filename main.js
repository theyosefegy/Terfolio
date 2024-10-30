import { updateTyper } from "./animation.js";
import { commandMap } from "./commands/abstract.js";
import { Alias } from "./commands/alias.js";
import { Banner } from "./commands/banner.js";
import { Clear, Echo, Exit } from "./commands/basic_cmds.js";
import { Github } from "./commands/github.js";
import { Help } from "./commands/help.js";
import { Projects } from "./commands/projects.js";
import { Social } from "./commands/social.js";
import { Unalias } from "./commands/unalias.js";
import { WhoIsMe } from "./commands/whoisme.js";
import { handleCommand } from "./utility.js";

export const myterminal = document.getElementById("terminal");
export const commandLine = document.querySelector(".command");
export const preloadedCMDS = document.getElementById("preloaded");
export const texter = document.getElementById("texter");
export const typer = document.getElementById("typer");

let currentIndex = -1; // Initialize index for cycling through matches

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
		texter.focus(); // Keep focus on texter
	}
	if (event.key === "Tab") {
		event.preventDefault(); // Prevent default Tab behavior

		// Get the current input text
		const inputText = texter.value; // Use value instead of textContent

		// Find matching command keys
		const matches = [];
		for (let [key, _] of commandMap.entries()) {
			if (key.startsWith(inputText)) {
				matches.push(key);
			}
		}

		// Cycle through matches
		if (matches.length > 0) {
			currentIndex = (currentIndex + 1) % matches.length; // Increment index
			texter.value = matches[currentIndex]; // Set the value to the current match
			typer.textContent = matches[currentIndex]; // Update the display in your typing area
		}
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
	new Banner().execute();
	texter.focus();
	updateTyper(texter.value);
});

// Commands Register
new Help().register(commandMap);
new WhoIsMe().register(commandMap);
new Social().register(commandMap);
new Github().register(commandMap);
new Projects().register(commandMap);
new Banner().register(commandMap);
new Clear().register(commandMap);
new Alias().register(commandMap);
new Unalias().register(commandMap);
new Echo().register(commandMap);
new Exit().register(commandMap);
