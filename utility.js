import { myterminal } from "../script.js";
import { typetext } from "../animation.js";

import { Embed } from "../components/embed.js";
import { GITHUB_TOKEN } from "./commands/env.js";

export function displayErrorMessage(msg) {
	const errorOutput = document.createElement("p");
	errorOutput.classList.add("error");

	typetext(msg, errorOutput, 1);
	myterminal.append(errorOutput); // Insert before the input line
}

export function displayOutputMessage(cmd, isPreloaded = false, animationDelay) {
	const output = document.createElement("p");

	isPreloaded ? output.classList.add("preloaded-msg") : "";
	isPreloaded ? output.classList.add("no-animation") : "";

	typetext(cmd, output, animationDelay);

	texter.value = "";
	typer.textContent = "";

	myterminal.append(output); // Insert before the input line
}

export async function returnJsonObject(url) {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
				Accept: "application/vnd.github.v3+json",
			},
		});
		return await response.json();
	} catch {
		const embedError = new Embed({
			color: "red",
			description: "Error: Something wrong occured.",
		});

		embedError.renderIn(myterminal);
	}
}
