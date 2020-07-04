import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Create from './pages/Create';
import Home from './pages/Home';
import Room from './pages/Room';

const Content = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/create" component={Create} />
			<Route path={'/room/:publicId'} component={Room} />
		</Switch>
	);
};

export default Content;
