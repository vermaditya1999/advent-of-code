const input = await Deno.readTextFile(Deno.args[0]);
const forest = input.split('\n').map((line) => line.split('').map((numStr) => parseInt(numStr)));

const n = forest.length,
	m = forest[0].length;

let visibleTrees = 2 * (n + m) - 4;
for (let i = 1; i < n - 1; ++i) {
	for (let j = 1; j < m - 1; ++j) {
		const currentHeight = forest[i][j];
		let visibleLeft = true,
			visibleRight = true,
			visibleUp = true,
			visibleBottom = true;
		for (let left = 0; left < j; ++left) {
			if (forest[i][left] >= currentHeight) {
				visibleLeft = false;
			}
		}
		for (let right = m - 1; right > j; --right) {
			if (forest[i][right] >= currentHeight) {
				visibleRight = false;
			}
		}
		for (let up = 0; up < i; ++up) {
			if (forest[up][j] >= currentHeight) {
				visibleUp = false;
			}
		}
		for (let bottom = n - 1; bottom > i; --bottom) {
			if (forest[bottom][j] >= currentHeight) {
				visibleBottom = false;
			}
		}
		if (visibleLeft || visibleRight || visibleUp || visibleBottom) {
			++visibleTrees;
		}
	}
}

console.log(visibleTrees);
