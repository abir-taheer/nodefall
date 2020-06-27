import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Create from './pages/Create';
import Home from './pages/Home';
import Game from './pages/Game';

const Content = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/create" component={Create} />
			<Route path={'/game/:publicId'} component={Game} />
		</Switch>
	);
};

export default Content;
