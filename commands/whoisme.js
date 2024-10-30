import { loopLines } from "../animation.js";
import { Command } from "./abstract.js";

export class WhoIsMe extends Command {
	constructor() {
		super("whoisme", "  Who is Yosef?");
	}

	async execute(args) {
		const aboutme = `
-
Hey, I'm Yosef!👋  
I’m a software engineer dedicated to building engaging, high-quality websites like this one.
My journey in tech began in 2023 when I started studying Computer Science.
While diving into my college studies, I found myself learning even more outside the classroom,
driven by the goal of landing a rewarding role in this field.

-

Learning has become more than a habit; it’s a passion. I’m hungry for information and constantly pushing myself to improve.
I wanted to learn *everything*—Machine Learning, DevOps, and not just the tech world.
I wanted to explore roles like HR and Product Management to truly understand all sides of building impactful projects.Over time, 
I’ve worked on a wide range of projects, both for fun and for practice,
and I've enjoyed helping my peers navigate the vast world of software engineering and computer science. 

-

What started as a personal journey became an online presence that’s connected me with a world of knowledge and innovation.
My goal? To keep learning, keep growing, and maybe even make a significant impact on humanity along the way.
I’m excited to see where this journey takes me next—and what I can create as I strive to become the best version of myself.
-
`;

		loopLines(aboutme.split("\n"), 100);
	}
}
