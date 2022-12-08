let fs = require('fs');
let path = require('path');

function getInput() {
	let filename = 'input.txt';
	let content = fs.readFileSync(__dirname + path.sep + filename).toString();
	return content;
}

function sum(array) {
	return array.reduce((a, b) => a + b, 0);
}

const input = getInput();

const groupedCalories = input
	.split('\n\n')
	.map((calorieString) => calorieString.split('\n').map((value) => parseInt(value, 10)));

const groupedCaloriesSum = groupedCalories.map((calories) => sum(calories));

groupedCaloriesSum.sort((a, b) => a - b);

const maxCalories = sum(groupedCaloriesSum.slice(-3));

console.log(maxCalories);
