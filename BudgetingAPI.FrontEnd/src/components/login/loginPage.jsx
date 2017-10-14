import React, { Component } from 'react';
import LoginForm from './loginForm.jsx';
import AuthApi from '../../api/authApi';

class LoginPage extends Component {
	render() {
		return (
			<div className="col-md-12">
				<h1>Login</h1>
				<LoginForm />
			</div>
		);
	}
}

export default LoginPage;
