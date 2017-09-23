import React, { Component } from 'react';
import AuthApi from '../../api/authApi';
import {
	Redirect
} from 'react-router-dom';

class LogoutPage extends Component {
	componentWillMount() {
		AuthApi.logout();
	}
	render() {
		return (
			<Redirect to="/login" />
		);
	}
}

export default LogoutPage;
