const input = await Deno.readTextFile(Deno.args[0]);
const forest = input.split('\n').map((line) => line.split('').map((numStr) => parseInt(numStr)));

const n = forest.length,
	m = forest[0].length;

let maxScenicScore = 0;
for (let i = 0; i < n; ++i) {
	for (let j = 0; j < m; ++j) {
		const currentHeight = forest[i][j];
		let leftScore = j;
		for (let left = j - 1; left >= 0; --left) {
			if (forest[i][left] >= currentHeight) {
				leftScore = j - left;
				break;
			}
		}
		let rightScore = m - 1 - j;
		for (let right = j + 1; right < m; ++right) {
			if (forest[i][right] >= currentHeight) {
				rightScore = right - j;
				break;
			}
		}
		let upScore = i;
		for (let up = i - 1; up >= 0; --up) {
			if (forest[up][j] >= currentHeight) {
				upScore = i - up;
				break;
			}
		}
		let bottomScore = n - 1 - i;
		for (let bottom = i + 1; bottom < n; ++bottom) {
			if (forest[bottom][j] >= currentHeight) {
				bottomScore = bottom - i;
				break;
			}
		}
		const currentScore = leftScore * rightScore * upScore * bottomScore;
		maxScenicScore = Math.max(currentScore, maxScenicScore);
	}
}

console.log(maxScenicScore);
