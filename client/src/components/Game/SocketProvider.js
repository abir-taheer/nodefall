import React from 'react';
import SocketContext from './SocketContext';

import io from 'socket.io-client';

const SocketProvider = ({ children }) => {
	const [socket] = React.useState(
		io(window.location.origin, { transports: ['websocket'] })
	);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
