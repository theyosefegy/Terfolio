import { exitMethod, clearMethod, echoMethod, helpMethod } from "./basics.js";
import { bannerMethod } from "./banner.js";
import { aliasMethod } from "./alias.js";
import { githubMethod } from "./github.js";
import { projectsMethod } from "./projects.js";
import { unaliasmethod } from "./unalias.js";
import { whoismeMethod } from "./whoisme.js";

// Commands Register
export const commandMap = new Map();

export function registerCommand(name, description, method, aliases = []) {
	let attrs = { name, description, method, aliases };
	commandMap.set(name, attrs);
}

registerCommand("help", "      Displays all available commands.", helpMethod);
registerCommand("whoisme", "   Who is Yosef?", whoismeMethod);
registerCommand("alias", "     Create a shortcut for a command.", aliasMethod);
registerCommand("github", "    Shows my github page statistics.", githubMethod);

registerCommand(
	"projects",
	"  Show all Yosef's Projects on github.",
	projectsMethod
);

registerCommand("clear", "     Clear the terminal screen.", clearMethod);

registerCommand(
	"unalias",
	"   Removes either all commands or for a specific one.",
	unaliasmethod
);

registerCommand("banner", "    Displays the ascii banner", bannerMethod);
registerCommand("echo", "      Print a message.", echoMethod);
registerCommand("exit", "      Exits the terminal.", exitMethod);

// MOEW
