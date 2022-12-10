const input = await Deno.readTextFile(Deno.args[0]);

function hasAllUniqueChars(input: string) {
	const chars = input.split('');
	const uniqueChars = new Set(chars);
	return uniqueChars.size === chars.length;
}

function getMarkerIndex(message: string, markerLength: number) {
	for (let i = markerLength; i <= message.length; ++i) {
		if (hasAllUniqueChars(message.slice(i - markerLength, i))) {
			return i;
		}
	}
	return -1;
}

console.log(getMarkerIndex(input, 14));
