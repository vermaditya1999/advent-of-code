const input = await Deno.readTextFile(Deno.args[0]);

class Stacks {
	private stacks: string[][] = [];

	pushAt(index: number, value: string) {
		if (!this.stacks[index - 1]) this.stacks[index - 1] = [];
		this.stacks[index - 1].push(value);
	}

	move(from: number, to: number, count = 1) {
		this.stacks[to - 1].push(...this.stacks[from - 1].splice(-count, count));
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
	const [count, from, to] = operation;
	stacks.move(from, to, count);
});

console.log(stacks.peekAll());
