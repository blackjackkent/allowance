import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import BudgetApi from '../../api/budgetApi';
import BudgetHeader from './budgetHeader.jsx';

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			budget: {}
		};
		let component = this;
		BudgetApi.getBudget().then(function (budget) {
			component.state.budget = budget;
		})
	}
	render() {
		return (
			<div>
				<h1>This is the home page</h1>
				<BudgetHeader budget={this.state.budget} />
			</div>
		);
	}
}

export default HomePage;
