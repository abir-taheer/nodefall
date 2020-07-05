import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { Redirect } from 'react-router-dom';

class Create extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);
		this.state = {
			roomName: '',
			password: '',
			playerName: ''
		};
		this.updateField = this.updateField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	updateField(ev) {
		const name = ev.target.getAttribute('name');
		const value = ev.target.value;
		this.setState({
			[name]: value
		});
	}

	onSubmit() {
		axios
			.post('/api/rooms/create', this.state)
			.then(this.context.updateContext)
			.catch(er => {
				// TODO REPLACE WITH REAL ERROR DISPLAY
				alert(
					er?.response?.data?.error?.message ||
						'Unknown error communicating with the server'
				);
			});
	}

	render() {
		if (this.context.inRoom) {
			return (
				<Redirect to={`/room/${this.context.player.room.publicId}`} />
			);
		}

		return (
			<>
				<h6>Create a game</h6>
				<form noValidate autoComplete="off">
					<TextField
						id="outlined-basic"
						label="Your Name"
						name={'playerName'}
						variant="outlined"
						onChange={this.updateField}
						required
					/>
					<br />
					<TextField
						id="outlined-basic"
						label="Room Name"
						variant="outlined"
						name={'roomName'}
						onChange={this.updateField}
						required
					/>
					<br />
					<TextField
						id="outlined-basic"
						label="Room Password"
						variant="outlined"
						name={'password'}
						onChange={this.updateField}
					/>
					<br />
					<Fab variant="extended" onClick={this.onSubmit}>
						Create Room!
					</Fab>
				</form>
			</>
		);
	}
}

export default Create;
