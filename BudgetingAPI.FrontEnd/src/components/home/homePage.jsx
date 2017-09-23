import React, { Component } from 'react';

import BudgetApi from '../../api/budgetApi';
import Nav from '../shared/nav.jsx';
import BudgetControlRow from './budgetControlRow.jsx';
import BudgetHeader from './budgetHeader.jsx';
import BudgetTotalRow from './budgetTotalRow.jsx';

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			budget: {}
		};
		BudgetApi.getBudget().then((budget) => {
			this.setState({ budget: budget });
		});
	}
	render() {
		return (
			<div className="row">
				<Nav />
				<BudgetHeader budget={this.state.budget} />
				<BudgetTotalRow budget={this.state.budget} />
				<BudgetControlRow />
			</div>
		);
	}
}

export default HomePage;
