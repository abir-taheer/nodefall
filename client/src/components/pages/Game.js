import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import Join from '../Game/Join';

const Game = () => {
	const { publicId } = useParams();
	const [room, setRoom] = React.useState(null);
	const [status, setStatus] = React.useState('loading');
	const context = React.useContext(AppContext);
	const isValid = room !== null && room?.isActive;

	React.useEffect(() => {
		axios
			.get(`/api/rooms/${publicId}`)
			.then(res => {
				setStatus('loaded');
				setRoom(res.data.payload);
			})
			.catch(er => {
				if (er?.response?.status === 404) {
					setStatus('loaded');
				} else {
					setStatus('error');
				}
			});
	}, [publicId]);

	if (status === 'loading') {
		return <div>Loading Room...</div>;
	}

	if (status === 'error') {
		return (
			<div>
				There was an unexpected error while loading that room. Try again
			</div>
		);
	}

	if (!isValid) {
		return <div>There is no room with that publicId.</div>;
	}

	if (context?.inRoom) {
		if (context?.player?.room?.publicId === room?.publicId) {
			// The player belongs in this room, show them the gameplay stuff
			return <div>You are already in this room. Good Job.</div>;
		} else {
			// The player does not belong in this room, but they belong in another room.
			// Show them a button to take them to the other room.
			return (
				<div>You are already in room {context?.player?.room?.name}</div>
			);
		}
	}

	// The final case is that they're not in the room and that they need to join it.
	return (
		<div>
			<p>
				You are attempting to join room: {publicId}.{' '}
				{room?.hasPassword && 'There is a password in this room.'}
			</p>
			<pre>{JSON.stringify(room, null, 2)}</pre>
			<Join room={room} />
		</div>
	);
};

export default Game;
