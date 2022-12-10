const input = await Deno.readTextFile(Deno.args[0]);
const lines = input.split('\n');

function groupByCommands(lines: string[]) {
	const groups: string[][] = [];
	let group: string[] = [lines[0]];
	for (let i = 1; i < lines.length; ++i) {
		if (lines[i].startsWith('$')) {
			groups.push(group);
			group = [lines[i]];
		} else {
			group.push(lines[i]);
		}
	}
	groups.push(group);
	return groups;
}

class File {
	name: string;
	size: number;

	constructor(name: string, size: number) {
		this.name = name;
		this.size = size;
	}
}

class Directory {
	name: string;
	files: File[];
	dirs: Directory[];
	parent: Directory | null;

	constructor(name: string, parent: Directory | null = null) {
		this.name = name;
		this.files = [];
		this.dirs = [];
		this.parent = parent;
	}

	addDir(name: string) {
		this.dirs.push(new Directory(name, this));
	}

	addFile(name: string, size: number) {
		this.files.push(new File(name, size));
	}

	getSize(): number {
		const fileSizeSum = this.files.reduce((sum, file) => sum + file.size, 0);
		const dirSizeSum = this.dirs.reduce((sum, dir) => sum + dir.getSize(), 0);
		return fileSizeSum + dirSizeSum;
	}
}

function createFileSystem() {
	const root = new Directory('/');
	let curDir = root;

	function processCommand(command: string, output: string[]) {
		if (command.includes('cd')) {
			const [, , dir] = command.split(' ');
			if (dir === '/') {
				curDir = root;
			} else if (dir === '..') {
				if (curDir.parent !== null) {
					curDir = curDir.parent;
				} else {
					console.error('Invalid directory');
					return;
				}
			} else {
				if (curDir.dirs.some((directory) => directory.name === dir)) {
					curDir = curDir.dirs.find((directory) => directory.name === dir)!;
				} else {
					console.error('Invalid directory');
					return;
				}
			}
		} else if (command.includes('ls')) {
			output.forEach((outputLine) => {
				const [first, second] = outputLine.split(' ');
				if (first === 'dir') {
					curDir.addDir(second);
				} else {
					curDir.addFile(second, parseInt(first));
				}
			});
		} else {
			console.error('Invalid Command');
			return;
		}
	}

	function sumDirectorySizesWithinSize(sizeLimit: number) {
		function traverse(dir: Directory): number {
			let sum = 0;
			const size = dir.getSize();
			if (size <= sizeLimit) {
				sum += size;
			}
			dir.dirs.forEach((dir) => (sum += traverse(dir)));
			return sum;
		}
		return traverse(root);
	}

	return { processCommand, sumDirectorySizesWithinSize };
}

const { processCommand, sumDirectorySizesWithinSize } = createFileSystem();

const groupedCommands = groupByCommands(lines);
groupedCommands.forEach((group) => {
	const [command, ...output] = group;
	processCommand(command, output);
});

console.log(sumDirectorySizesWithinSize(100000));
