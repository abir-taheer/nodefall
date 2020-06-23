import React from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';

const Join = ({ room }) => {
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const context = React.useContext(AppContext);

	const joinRoom = () => {
		axios
			.post(`/api/rooms/${room?.publicID}/join`, { name, password })
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
			<input
				placeholder={'name'}
				value={name}
				onChange={ev => setName(ev.target.value)}
			/>
			<br />
			{room?.hasPassword && (
				<input
					value={password}
					onChange={ev => setPassword(ev.target.value)}
					placeholder={'password'}
				/>
			)}
			<br />
			<button onClick={joinRoom}>Join Room</button>
		</div>
	);
};

export default Join;
