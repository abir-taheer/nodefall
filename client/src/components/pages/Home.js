import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Nodefall from '../../img/Nodefall.gif';

const buttonStyle = {
	variant: 'outlined',
	size: 'large',
	margin: 'auto'
};

function Home() {
	return (
		<div>
			<img src={Nodefall} width="300px" alt="Nodefall" />
			<br />
			<Button {...buttonStyle}>
				<Link to="/create" style={{ textDecoration: 'none' }}>
					Create a game
				</Link>
			</Button>
			<br />
			<Button {...buttonStyle}>Join a game</Button>
		</div>
	);
}

export default Home;
