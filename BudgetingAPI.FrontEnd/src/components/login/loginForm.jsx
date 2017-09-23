import React, { Component } from 'react';
import AuthApi from '../../api/authApi';
import {
	Redirect
} from 'react-router-dom';

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			loginSuccess: false
		};
	}
	updateUsername(event) {
		this.setState({ username: event.target.value });
	}
	updatePassword(event) {
		this.setState({ password: event.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		this.setState({ errorMessage: '' });
		AuthApi.login(this.state.username, this.state.password)
			.then(() => {
				this.setState({ loginSuccess: true });
			})
			.catch(() => {
				this.setState({ errorMessage: 'Invalid username or password' });
			});
	}
	render() {

		if (this.state.loginSuccess) {
			return (
				<Redirect to="/" />
			);
		}
		return (
			<form name="loginForm" onSubmit={(e) => this.onSubmit(e)}>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" id="username" onChange={(e) => this.updateUsername(e)} />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" onChange={(e) => this.updatePassword(e)} />
				<input type="submit" value="Login" />
				<p>{this.state.errorMessage}</p>
			</form>
		);
	}
}

export default LoginForm;
