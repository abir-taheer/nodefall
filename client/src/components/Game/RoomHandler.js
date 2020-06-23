import React, { useContext } from 'react';
import SocketContext from './SocketContext';

const RoomHandler = () => {
	const socket = useContext(SocketContext);

	const [players, setPlayers] = React.useState([]);

	React.useEffect(() => {
		if (!socket) {
			return;
		}

		socket.on('updatePlayers', list => {
			setPlayers(list);
		});

		socket.emit('active');

		return () => socket.removeAllListeners('updatePlayers');
	}, [socket]);

	return (
		<div>
			{players.map(i => (
				<p
					style={{
						color: i.isActive ? 'green' : 'red'
					}}
				>
					{i.name}
				</p>
			))}
		</div>
	);
};

export default RoomHandler;
