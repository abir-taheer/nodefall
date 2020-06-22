import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			room_name: '',
			room_pass: '',
			nickname: ''
		};
	}

	render() {
		return (
			<>
				<h6>Create a game</h6>
				<form noValidate autoComplete="off">
					<TextField
						id="outlined-basic"
						label="Nickname"
						required
						variant="outlined"
						onChange={data => {
							this.setState({
								nickname: data.target.value
							});
						}}
					/>
					<br />
					<TextField
						id="outlined-basic"
						label="Room Name"
						required
						variant="outlined"
						onChange={data => {
							this.setState({
								room_name: data.target.value
							});
						}}
					/>
					<br />
					<TextField
						id="outlined-basic"
						label="Room Password"
						variant="outlined"
						onChange={data => {
							this.setState({
								room_pass: data.target.value
							});
						}}
					/>
					<br />
					<Fab variant="extended">Create Room!</Fab>
				</form>
			</>
		);
	}
}

export default Create;
