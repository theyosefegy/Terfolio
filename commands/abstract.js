// Commands Register

export const commandMap = new Map();

export class Command {
	constructor(name, description) {
		this.name = name;
		this.description = description;
		this.aliases = [];
	}

	async execute(args) {
		throw new Error("Method 'execute()' must be implemented.");
	}

	async register(hashmap) {
		hashmap.set(this.name, this);
	}
}
