import React from 'react';
import './App.modules.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
	return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
            
	);
}

export default App;
