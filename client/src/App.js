import React from 'react';
import { useSpring, animated } from 'react-spring';
import './App.modules.css';

function App() {
	const props = useSpring({ opacity: 1, from: { opacity: 0 } });
	return (
		<div>
			<animated.div style={props}>
				<span className={'node'}>Node</span>fall
				<h3>Welcome!</h3>
			</animated.div>
		</div>
	);
}

export default App;
