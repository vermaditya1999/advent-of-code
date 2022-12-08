let fs = require('fs');
let path = require('path');

function getInput() {
	let filename = 'input.txt';
	let content = fs.readFileSync(__dirname + path.sep + filename).toString();
	return content;
}

function partOne() {
	const moveScore = {
		R: 1,
		P: 2,
		S: 3,
	};

	const outcomeScore = {
		L: 0,
		D: 3,
		W: 6,
	};

	const stdMoveMap = {
		A: 'R',
		B: 'P',
		C: 'S',
		X: 'R',
		Y: 'P',
		Z: 'S',
	};

	function roundScore(opponentMove, myMove) {
		let score = 0;
		if (opponentMove === myMove) {
			score = outcomeScore['D'];
		} else if (
			(opponentMove === 'R' && myMove === 'P') ||
			(opponentMove === 'P' && myMove === 'S') ||
			(opponentMove === 'S' && myMove === 'R')
		) {
			score = outcomeScore['W'];
		} else {
			score = outcomeScore['L'];
		}

		return score;
	}

	const input = getInput();
	const rounds = input.split('\n');
	const score = rounds.reduce((score, round) => {
		let [opponentMove, myMove] = round.split(' ').map((move) => stdMoveMap[move]);
		return score + roundScore(opponentMove, myMove) + moveScore[myMove];
	}, 0);

	console.log(score);
}

function partTwo() {
	const moveScore = {
		R: 1,
		P: 2,
		S: 3,
	};

	const outcomeScore = {
		L: 0,
		D: 3,
		W: 6,
	};

	const stdMoveMap = {
		A: 'R',
		B: 'P',
		C: 'S',
		X: 'R',
		Y: 'P',
		Z: 'S',
	};

	const myOutcomeMap = {
		X: 'L',
		Y: 'D',
		Z: 'W',
	};

	function calculateMyMove(opponentMove, myOutcome) {
		let myMove = 'R';
		if (
			(opponentMove === 'R' && myOutcome === 'D') ||
			(opponentMove === 'P' && myOutcome === 'L') ||
			(opponentMove === 'S' && myOutcome === 'W')
		) {
			myMove = 'R';
		} else if (
			(opponentMove === 'R' && myOutcome === 'W') ||
			(opponentMove === 'P' && myOutcome === 'D') ||
			(opponentMove === 'S' && myOutcome === 'L')
		) {
			myMove = 'P';
		} else {
			myMove = 'S';
		}

		return myMove;
	}

	const input = getInput();
	const rounds = input.split('\n');
	const score = rounds.reduce((score, round) => {
		let [opponentMove, myOutcome] = round.split(' ');
		opponentMove = stdMoveMap[opponentMove];
		myOutcome = myOutcomeMap[myOutcome];
		return score + moveScore[calculateMyMove(opponentMove, myOutcome)] + outcomeScore[myOutcome];
	}, 0);

	console.log(score);
}

partTwo();
