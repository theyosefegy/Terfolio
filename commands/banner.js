import { loopLines } from "../animation.js";
import { myterminal } from "../script.js";

export async function bannerMethod(args) {
	const ascii = `
'
<pre> __   __  _______  _______  _______  _______  __   _______    _______  _______  ______    __   __  ___   __    _  _______  ___     	  </pre>
<pre>|  | |  ||       ||       ||       ||       ||  | |       |  |       ||       ||    _ |  |  |_|  ||   | |  |  | ||   _   ||   |   		  </pre>
<pre>|  |_|  ||   _   ||  _____||    ___||    ___||__| |  _____|  |_     _||    ___||   | ||  |       ||   | |   |_| ||  |_|  ||   |    	  </pre>
<pre>|       ||  | |  || |_____ |   |___ |   |___      | |_____     |   |  |   |___ |   |_||_ |       ||   | |       ||       ||   |    	  </pre>
<pre>|_     _||  |_|  ||_____  ||    ___||    ___|     |_____  |    |   |  |    ___||    __  ||       ||   | |  _    ||       ||   |___  ___  </pre>
<pre>  |   |  |       | _____| ||   |___ |   |          _____| |    |   |  |   |___ |   |  | || ||_|| ||   | | | |   ||   _   ||       ||   | </pre>
<pre>  |___|  |_______||_______||_______||___|         |_______|    |___|  |_______||___|  |_||_|   |_||___| |_|  |__||__| |__||_______||___| </pre>
  
Welcome to my Interactive web-terminal :D
For a list of available commands, type <span style="margin:0;" class="command-help">'help'</span>.
`;

	await loopLines(ascii.replace(" ", "&nbsp;&nbsp;").split("\n"), 90);
}
