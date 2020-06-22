import React from 'react';
import AppContext from './AppContext';
import axios from 'axios';

class AppProvider extends React.Component {
	constructor(props) {
		super(props);

		this.updateContext = this.updateContext.bind(this);

		this.state = {
			inRoom: false,
			updateContext: this.updateContext
		};
	}

	updateContext() {
		axios.get('/api/state').then(res => {
			console.log(res);
			if (res.data.success) {
				this.setState(res.data.payload);
			}
		});
	}

	componentDidMount() {
		this.updateContext();
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
