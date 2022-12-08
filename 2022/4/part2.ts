const input = Deno.readTextFileSync(Deno.args[0]);
const pairs = input
	.split('\n')
	.map((pairString) =>
		pairString
			.split(',')
			.map((rangeString) => rangeString.split('-').map((numberString) => Number(numberString)))
	);

function intersects([a1, a2]: [number, number], [b1, b2]: [number, number]) {
	return (a1 <= b1 && a2 >= b1) || (b1 <= a1 && b2 >= a1);
}

const numIntersects = pairs.reduce(
	(sum, [pair1, pair2]) => sum + Number(intersects([pair1[0], pair1[1]], [pair2[0], pair2[1]])),
	0
);

console.log(numIntersects);
