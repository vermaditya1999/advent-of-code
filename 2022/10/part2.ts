import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';

const input = await Deno.readTextFile('input.txt');
const lines = input.split('\n');

let finishedCycles = 0;
let spritePosition = 1;

function drawPixel() {
	if (finishedCycles > 0 && finishedCycles % 40 === 0) {
		console.log();
		finishedCycles = 0;
	}
	const char = Math.abs(finishedCycles - spritePosition) <= 1 ? '#' : '.';
	writeAllSync(Deno.stdout, new TextEncoder().encode(char));
}

for (let i = 0; i < lines.length; ++i) {
	const line = lines[i];
	if (line.startsWith('noop')) {
		drawPixel();
		finishedCycles += 1;
	} else {
		const [, numStr] = line.split(' ');
		const num = parseInt(numStr);
		drawPixel();
		finishedCycles += 1;
		drawPixel();
		finishedCycles += 1;
		spritePosition += num;
	}
}
