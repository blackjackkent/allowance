import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/home/homePage.jsx';
import LoginPage from './components/loginPage.jsx'

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/login' component={LoginPage} />
				</Switch>
			</div>
		)
	};
};

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('container')
);
