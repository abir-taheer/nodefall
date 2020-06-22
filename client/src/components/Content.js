import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Create from './pages/Create';
import Home from './pages/Home';

const Content = () => {
	return (
		<Switch>
			<Route path="/create" component={Create} />
			<Route path="/" component={Home} />
		</Switch>
	);
};

export default Content;
