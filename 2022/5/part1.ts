const input = await Deno.readTextFile(Deno.args[0]);

class Stacks {
	private stacks: string[][] = [];

	pushAt(index: number, value: string) {
		if (!this.stacks[index - 1]) this.stacks[index - 1] = [];
		this.stacks[index - 1].push(value);
	}

	popAt(index: number) {
		return this.stacks[index - 1].pop();
	}

	peekAll() {
		const length = this.stacks.length;
		let result = '';
		for (let i = 0; i < length; ++i) {
			result += this.stacks[i].at(-1);
		}
		return result;
	}
}

const stacks = new Stacks();

input
	.slice(0, input.indexOf('1') - 2)
	.split('\n')
	.reverse()
	.forEach((cargo) => {
		for (let i = 0; i < cargo.length; i++) {
			if (/[A-Z]/.test(cargo[i])) {
				stacks.pushAt(Math.floor((i - 1) / 4 + 1), cargo[i]);
			}
		}
	});

const operations = input
	.slice(input.indexOf('move'))
	.split('\n')
	.map((opString) => {
		const stringNumbers = opString.match(/\d+/g);
		if (stringNumbers === null) {
			return [];
		}
		return stringNumbers.map((number) => Number(number));
	});

operations.forEach((operation) => {
	const [times, from, to] = operation;
	for (let i = 0; i < times; ++i) {
		const popped = stacks.popAt(from);
		if (popped !== undefined) {
			stacks.pushAt(to, popped);
		}
	}
});

console.log(stacks.peekAll());
