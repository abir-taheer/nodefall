import React from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';

const Join = ({ room }) => {
	const [password, setPassword] = React.useState('');
	const context = React.useContext(AppContext);

	const joinRoom = () => {
		axios
			.post(`/api/rooms/${room?.publicID}/join`, { password })
			.then(res => {
				context.updateContext();
			})
			.catch(er => {
				alert(
					er?.response?.data?.error?.message ||
						'There was an unexpected error'
				);
			});
	};

	return (
		<div>
			{room?.hasPassword && (
				<input
					value={password}
					onChange={ev => setPassword(ev.target.value)}
					placeholder={'password'}
				/>
			)}

			<button onClick={joinRoom}>Join Room</button>
		</div>
	);
};

export default Join;
