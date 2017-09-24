import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './components/home/homePage.jsx';
import LoginPage from './components/login/loginPage.jsx';
import LogoutPage from './components/login/logoutPage.jsx';
import SideNavigation from './components/shared/sideNavigation.jsx';

class App extends Component {
	render() {
		return (
			<div className="row">
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/logout' component={LogoutPage} />
				</Switch>
			</div>
		);
	}
}

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('container')
);
