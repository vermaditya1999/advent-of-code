const input = Deno.readTextFileSync('input.txt');

function commonChars(str1: string, str2: string) {
	const chars = str1.split('');
	return chars.filter((char) => str2.includes(char)).join('');
}

function intersection(array: string[]) {
	return array.reduce((a, b) => commonChars(a, b));
}

function group(array: string[], size: number) {
	const result = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}
	return result;
}

function getCharPriority(char: string) {
	const code = char.charCodeAt(0);
	if (char === char.toLowerCase()) {
		return code - 97 + 1;
	}
	return code - 65 + 27;
}

const groupedRucksacks = group(input.split('\n'), 3);
const prioritySum = groupedRucksacks.reduce(
	(prioritySum, rucksacks) => prioritySum + getCharPriority(intersection(rucksacks)),
	0
);

console.log(prioritySum);
