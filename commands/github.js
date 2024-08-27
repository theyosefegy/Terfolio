import { Embed } from "../components/embed.js";
import { commandHistoryElement } from "../script.js";
import { returnJsonObject } from "./cmds.js";

export { githubMethod };

async function githubMethod(args) {
	const user = "theyosefegy";

	const data = await returnJsonObject(`https://api.github.com/users/${user}`);

	const now = new Date();

	const githubEmbed = new Embed({
		title: "GitHub Profile | " + data.name,
		description: data.bio || "This Profile Has No Bio.",
		link: `https://github.com/${user}`,
		footer: now.toUTCString().slice(4),
		imageURL: data.avatar_url,
	});

	const errorEmbed = new Embed({
		title: "Error: Something wrong occured",
		color: "red",
	});

	githubEmbed.createField("Username", data.login, false);
	githubEmbed.createField("Created At", data.created_at, false);
	githubEmbed.createField("Public Repos", data.public_repos, true);
	githubEmbed.createField("Followers", data.followers, false);
	githubEmbed.createField("Following", data.following, false);

	githubEmbed.renderIn(commandHistoryElement);
}
