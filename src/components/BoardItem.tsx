import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaBomb } from 'react-icons/fa';
import { BsFlagFill } from 'react-icons/bs';

type Props = {
	val: number;
	handleRightClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		item: number,
		idx: number[]
	) => void;
	isHidden: Boolean;
	idx: number[];
	handleLeftClick: (idx: number[]) => void;
	isFlagged: Boolean;
};

const BoardItem = (props: Props) => {
	const isEmpty = props.val === 0;
	const isBomb = props.val === -1;
	const { handleRightClick, val, isHidden, idx, handleLeftClick, isFlagged } =
		props;
	return (
		<Box
			onClick={() => handleLeftClick(idx)}
			onContextMenu={(e) => {
				handleRightClick(e, val, idx);
			}}
			borderRadius={4}
			border='solid'
			borderWidth={'1px'}
			bg={
				isHidden || isFlagged
					? 'blue.600'
					: isBomb
					? 'red.300'
					: 'blue.400'
			}
		>
			{isFlagged ? (
				<Box textAlign={'center'} lineHeight='60px' w='50px' h='50px'>
					<Icon w={7} h={7} color={'red'} as={BsFlagFill} />
				</Box>
			) : isHidden ? (
				<Box w='50px' h='50px'></Box>
			) : (
				<Box
					textAlign='center'
					lineHeight={isBomb ? '60px' : '50px'}
					w='50px'
					h='50px'
				>
					{isEmpty ? (
						''
					) : isBomb ? (
						<Icon as={FaBomb} color={'black'} w={7} h={7} />
					) : (
						props.val
					)}
				</Box>
			)}
		</Box>
	);
};

export default BoardItem;
