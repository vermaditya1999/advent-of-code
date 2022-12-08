const input = Deno.readTextFileSync('input.txt');

function getPriorityAt(str: string, index: number) {
	const char = str.charAt(index);
	const code = str.charCodeAt(index);

	if (char === char.toLowerCase()) {
		return code - 97 + 1;
	}

	return code - 65 + 27;
}

const rucksacks = input.split('\n');
let prioritiesSum = 0;
rucksacks.forEach((rucksack) => {
	const len = rucksack.length;
	const left = rucksack.slice(0, len / 2);
	const right = rucksack.slice(len / 2, len);
	for (let i = 0; i < left.length; ++i) {
		if (right.indexOf(left[i]) !== -1) {
			prioritiesSum += getPriorityAt(left, i);
			break;
		}
	}
});

console.log(prioritiesSum);
