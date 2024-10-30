import { myterminal } from "../main.js";
import { displayOutputMessage, returnJsonObject } from "../utility.js";
import { Command } from "./abstract.js";

let login = "theyosefegy";

export class Projects extends Command {
	constructor() {
		super("projects", " Shows all Yosef's projects on github.");
	}

	async execute(args) {
		const allReposData = await returnJsonObject(
			`https://api.github.com/users/${login}/repos`
		);

		displayOutputMessage(
			"These are some of my featured projects from github, showcasing different skills and technologies"
		);
		allReposData.forEach((repo) => {
			const repoContainer = document.createElement("div");
			repoContainer.classList.add("repo-container");

			const repoName = document.createElement("a");
			repoName.classList.add("repo-name");
			repoName.innerHTML = `<span style="font-weight:100;">${repo.owner.login} /</span> ${repo.name}`;
			repoName.style.fontWeight = "800";

			repoName.href = repo.html_url;
			repoName.target = "_blank";

			const icon = document.createElement("i");
			icon.classList.add("fa-solid", "fa-terminal");

			repoContainer.appendChild(icon);
			repoContainer.appendChild(repoName);
			myterminal.appendChild(repoContainer);
		});
	}
}
