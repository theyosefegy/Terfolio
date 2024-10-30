import { loopLines } from "../animation.js";

export function socialMethod(args) {
	const social = [
		"</br>",
		"<p style='margin-left:20px;'>Linkedin      <a class='social-link' target='_blank' href='https://www.linkedin.com/in/yosef-mohamed-9563a22aa'>linkedin/YosefMohamed/</a></p>",
		"<p style='margin-left:20px;'>Github        <a class='social-link' target='_blank' href='https://github.com/theyosefegy'>github/theyosefegy/</a></p>",
		"<p style='margin-left:20px;'>Instagram     <a class='social-link' target='_blank' href='https://www.instagram.com/theyosefegy/'>instagram/theyosefegy/</a></p>",
		"<p style='margin-left:20px;'>Facebook      <a class='social-link' target='_blank' href='https://www.facebook.com/yosef.mohammed.750546'>facebook/YosefMohamed/</a></p>",
		"</br>",
	];

	loopLines(social, 50);
}
