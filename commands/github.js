import { Embed } from "../components/embedMsg.js";
import { commandHistoryElement } from "../script.js";
import { returnJsonObject } from "./cmds.js";

export { githubMethod };

async function githubMethod(args) {
	const data = await returnJsonObject(
		"https://api.github.com/users/theyosefegy"
	);

	const now = new Date();

	const githubEmbed = new Embed({
		title: "GitHub Profile | " + data.name,
		description: data.bio || "This Profile Has No Bio.",
		link: "https://github.com/theyosefegy",
		footer: now.toUTCString().slice(4),
		imageURL: data.avatar_url,
	});

	githubEmbed.createField("Username", data.login, false);
	githubEmbed.createField("Created At", data.created_at, false);
	githubEmbed.createField("Public Repos", data.public_repos, true);
	githubEmbed.createField("Followers", data.followers, false);
	githubEmbed.createField("Following", data.following, false);

	githubEmbed.renderIn(commandHistoryElement);
}
