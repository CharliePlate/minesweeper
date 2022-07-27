import React, { useState } from 'react';
import Board from './Board';
import StartingForm from './StartingForm';

type Props = {};

interface Values {
	height: string;
	width: string;
}

const Game = (props: Props) => {
	const [status, setStatus] = useState('starting');
	const [h, setH] = useState(0);
	const [w, setW] = useState(0);

	const handleSubmit = (values: Values) => {
		setH(parseInt(values.height));
		setW(parseInt(values.width));
	};

	return (
		<>
			{status === 'starting' ? (
				<StartingForm
					setStatus={setStatus}
					handleSubmit={handleSubmit}
				/>
			) : (
				<Board
					status={status}
					setStatus={setStatus}
					height={h}
					width={w}
				/>
			)}
		</>
	);
};

export default Game;
