import { Box, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
	findNeighborZeros,
	firstClick,
	getNumBombs,
	makeBoard,
	makeGameStateBoard,
} from '../lib/minesweeper';
import BoardItem from './BoardItem';

type Props = {
	height: number;
	width: number;
	setStatus: (status: string) => void;
	status: string;
};

const Board = (props: Props) => {
	const { height, width, setStatus, status } = props;

	const [gameStateBoard, setGameStateBoard] = useState(
		makeGameStateBoard(height, width)
	);

	const [countBombs] = useState(getNumBombs(height, width));
	const [numFlagged, setNumFlagged] = useState(0);
	const [board, setBoard] = useState(makeBoard(height, width));

	const handleRightClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		item: number,
		idx: number[]
	) => {
		const [x, y] = idx;
		e.preventDefault();
		if (gameStateBoard[x][y] === 's' || status.includes('gameover')) {
			return;
		}
		const tempGameStateBoard = [...gameStateBoard];
		tempGameStateBoard[x][y] = tempGameStateBoard[x][y] === 'f' ? 'h' : 'f';
		if (tempGameStateBoard[x][y] === 'f') {
			setNumFlagged(numFlagged + 1);
		} else {
			setNumFlagged(numFlagged - 1);
		}
		setGameStateBoard(tempGameStateBoard);
	};

	const handleLeftClick = (idx: number[]): void => {
		const [x, y] = idx;
		if (gameStateBoard[x][y] !== 'h' || status.includes('gameover')) {
			return;
		}
		if (status === 'awaiting first click') {
			const currBoard = firstClick(height, width, idx);
			const newBoard = findNeighborZeros(
				currBoard,
				gameStateBoard,
				idx,
				true
			);
			setBoard([...currBoard]);
			setGameStateBoard([...newBoard]);
			setStatus('playing');
			return;
		}
		if (board[x][y] === 0) {
			const newBoard = findNeighborZeros(
				board,
				gameStateBoard,
				idx,
				true
			);
			setGameStateBoard([...newBoard]);
		} else {
			const tempGameStateBoard = [...gameStateBoard];
			tempGameStateBoard[x][y] = 's';
			setGameStateBoard(tempGameStateBoard);
		}
		if (board[x][y] === -1) {
			setStatus('gameover-lose');
		}
	};

	useEffect(() => {
		checkIfWin();
	}, [gameStateBoard]);

	const checkIfWin = () => {
		if (
			gameStateBoard.every((row) => {
				return row.every((col) => {
					return col !== 'h';
				});
			}) &&
			numFlagged === countBombs
		) {
			setStatus('gameover-win');
		}
	};

	return (
		<Box mx='auto' mt='5vh' w='fit-content' pb={20}>
			{status === 'gameover-lose' ? (
				<Box textAlign={'center'} fontSize={30}>
					Game Over!
				</Box>
			) : status === 'gameover-win' ? (
				<Box textAlign={'center'} fontSize={30}>
					You Win!
				</Box>
			) : (
				''
			)}
			<Grid
				px={5}
				py={5}
				border='solid'
				templateRows={`repeat(${props.height}, 1fr)`}
				templateColumns={`repeat(${props.width}, 1fr)`}
				bg={'gray.500'}
				borderRadius={6}
				borderWidth={'1px'}
			>
				{board.map((row, rowIdx) =>
					row.map((item, colIdx) => (
						<BoardItem
							key={rowIdx.toString() + colIdx.toString()}
							handleRightClick={handleRightClick}
							handleLeftClick={handleLeftClick}
							isHidden={gameStateBoard[rowIdx][colIdx] === 'h'}
							isFlagged={gameStateBoard[rowIdx][colIdx] === 'f'}
							val={item}
							idx={[rowIdx, colIdx]}
						/>
					))
				)}
			</Grid>
		</Box>
	);
};

export default Board;
