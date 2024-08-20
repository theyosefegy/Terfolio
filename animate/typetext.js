export function typetext(text, element, delay = 15) {
	if (!text) return;

	if (element.classList.contains("no-animation")) {
		element.textContent = text;
		return;
	}

	let index = 0;
	const intervalId = setInterval(() => {
		element.textContent += text[index];
		index++;
		if (index === text.length) {
			clearInterval(intervalId);
		}
	}, delay);
}
