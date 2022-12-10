import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';

const input = await Deno.readTextFile('input.txt');
const lines = input.split('\n');

let spritePosition = 1;
let pixelPosition = 0;

function drawPixel() {
	if (pixelPosition > 0 && pixelPosition % 40 === 0) {
		console.log();
		pixelPosition = 0;
	}
	const char = Math.abs(pixelPosition - spritePosition) <= 1 ? '#' : '.';
	writeAllSync(Deno.stdout, new TextEncoder().encode(char));
}

for (let i = 0; i < lines.length; ++i) {
	const line = lines[i];
	if (line.startsWith('noop')) {
		drawPixel();
		pixelPosition += 1;
	} else {
		const [, numStr] = line.split(' ');
		const num = parseInt(numStr);
		drawPixel();
		pixelPosition += 1;
		drawPixel();
		pixelPosition += 1;
		spritePosition += num;
	}
}
