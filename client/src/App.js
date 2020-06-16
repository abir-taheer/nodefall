import React from 'react';
import { useSpring, animated } from 'react-spring';
import Button from '@material-ui/core/Button';
import './App.modules.css';

function App() {
	const props = useSpring({ opacity: 1, from: { opacity: 0 } });
	return (
		<div>
			<animated.div style={props}>
				<span className={'node'}>Node</span>fall
				<h3>Welcome!</h3>
			</animated.div>
			<Button> Create </Button>
		</div>
	);
}

export default App;
