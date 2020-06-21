import React from 'react';
import './App.modules.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Create from './components/create';

function App() {
	return (
		<BrowserRouter>
			<Switch>
                <Route path="/create" component={Create} />
				<Route path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
