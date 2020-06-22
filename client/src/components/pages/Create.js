import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomName: '',
			password: '',
			playerName: ''
		};
		this.updateField = this.updateField.bind(this);
	}

	updateField(ev) {
		const name = ev.target.getAttribute('name');
		const value = ev.target.value;
		this.setState({
			[name]: value
		});
	}

	render() {
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
						onChange={this.updateField}
						required
					/>
					<br />
					<TextField
						id="outlined-basic"
						label="Room Password"
						variant="outlined"
						onChange={this.updateField}
					/>
					<br />
					<Fab variant="extended">Create Room!</Fab>
				</form>
			</>
		);
	}
}

export default Create;
