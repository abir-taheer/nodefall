import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';

const Game = () => {
	const { publicID } = useParams();
	const [room, setRoom] = React.useState(null);
	const [status, setStatus] = React.useState('loading');
	const context = React.useContext(AppContext);
	const isValid = room !== null && room?.isActive;

	React.useEffect(() => {
		axios
			.get(`/api/rooms/${publicID}`)
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
	}, [publicID]);

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
		return <div>There is no room with that publicID.</div>;
	}

	if (context?.inRoom) {
		if (context?.player?.room?.publicID === room?.publicID) {
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
			<p>You are attempting to join room: {publicID}</p>
			<pre>{JSON.stringify(room, null, 2)}</pre>
		</div>
	);
};

export default Game;
