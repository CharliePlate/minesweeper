const makeBoard = (height: number, width: number): number[][] => {
	const board: number[][] = [...Array(height)].map((e) =>
		Array(width).fill(0)
	);

	const bombs = getBombs(height, width, getNumBombs(height, width));

	const increaseSurroundingBomb = (h: number, w: number) => {
		if (
			h === -1 ||
			w === -1 ||
			h > board.length - 1 ||
			w > board[0].length - 1 ||
			board[h][w] === -1
		) {
			return;
		}
		board[h][w]++;
	};
	const cords = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];
	for (let point of bombs) {
		let h = point[0];
		let w = point[1];
		board[h][w] = -1;
		for (let cord of cords) {
			increaseSurroundingBomb(h + cord[0], w + cord[1]);
		}
	}
	return board;
};

const makeGameStateBoard = (height: number, width: number): String[][] => {
	const board: String[][] = [...Array(height)].map((e) =>
		Array(width).fill('h')
	);
	return board;
};

const getNumBombs = (height: number, width: number): number => {
	const countBombs = Math.max(Math.floor((height * width) / 8), 1);
	return countBombs;
};

const findNeighborZeros = (
	valArr: number[][],
	gameStateArr: String[][],
	idx: number[],
	cameFromBomb: Boolean
): String[][] => {
	const [x, y] = idx;
	if (
		idx[0] < 0 ||
		idx[0] > gameStateArr.length - 1 ||
		idx[1] < 0 ||
		idx[1] > gameStateArr[0].length - 1 ||
		cameFromBomb === false
	) {
		return gameStateArr;
	}
	if (gameStateArr[x][y] === 's') {
		return gameStateArr;
	}

	gameStateArr[x][y] = 's';
	cameFromBomb = valArr[x][y] === 0;

	const cords = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];
	for (let cord of cords) {
		const newIdx = [x + cord[0], y + cord[1]];
		gameStateArr = findNeighborZeros(
			valArr,
			gameStateArr,
			newIdx,
			cameFromBomb
		)!;
	}
	return gameStateArr;
};

const firstClick = (h: number, w: number, idx: number[]) => {
	let board = makeBoard(h, w);

	while (countSurroundingZeros(board, new Set(), idx, 0) < 5) {
		board = makeBoard(h, w);
	}
	return board;
};

const countSurroundingZeros = (
	board: number[][],
	visited: Set<string>,
	idx: number[],
	countZeros: number
): number => {
	const [x, y] = idx;
	if (
		x < 0 ||
		x > board.length - 1 ||
		y < 0 ||
		y > board[0].length - 1 ||
		board[x][y] !== 0 ||
		visited.has(JSON.stringify(idx))
	) {
		return 0;
	}

	countZeros++;
	visited.add(JSON.stringify(idx));

	const cords = [
		[-1, 0],
		[0, -1],
		[0, 1],
		[1, 0],
	];

	for (let cord of cords) {
		const newIdx = [x + cord[0], y + cord[1]];
		countZeros =
			countZeros +
			countSurroundingZeros(board, visited, newIdx, countZeros);
	}
	return countZeros;
};

const getBombs = (
	height: number,
	width: number,
	countBombs: number
): number[][] => {
	const currBombs: Set<string> = new Set();
	while (currBombs.size < countBombs) {
		let randHeight = Math.floor(Math.random() * height);
		let randWidth = Math.floor(Math.random() * width);
		let point = [randHeight, randWidth];
		currBombs.add(JSON.stringify(point));
	}
	const bombArr = Array.from(currBombs).map((point) => JSON.parse(point));
	return bombArr;
};

export {
	makeBoard,
	makeGameStateBoard,
	getNumBombs,
	findNeighborZeros,
	firstClick,
};
