import React from 'react';
import { useParams } from 'react-router-dom';

const Game = () => {
	const { publicID } = useParams();
	return <div>You are attempting to join room: {publicID}</div>;
};

export default Game;
