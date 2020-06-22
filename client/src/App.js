import React from 'react';
import './App.modules.css';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './components/context/AppProvider';
import Content from './components/Content';

function App() {
	return (
		<BrowserRouter>
			<AppProvider>
				<Content />
			</AppProvider>
		</BrowserRouter>
	);
}

export default App;
