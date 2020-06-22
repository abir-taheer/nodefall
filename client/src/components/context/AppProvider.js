import React from 'react';
import AppContext from './AppContext';
import axios from 'axios';

class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inRoom: false
		};
	}

	componentDidMount() {
		axios.get('/api/state').then(res => {
			console.log(res);
			if (res.data.success) {
				this.setState(res.data.payload);
			}
		});
	}

	render() {
		return (
			<AppContext.Provider
				value={this.state}
				children={this.props.children}
			/>
		);
	}
}

export default AppProvider;
