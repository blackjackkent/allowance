import React, { Component } from 'react';
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import ManagementControlRow from '../shared/managementControlRow.jsx';
import ManagementDataTable from '../shared/managementDataTable.jsx';

class ExpensesPage extends Component {
	constructor() {
		super();
		this.state = {
			budget: {}
		};
	}
	componentDidMount() {
		BudgetApi.getBudget().then((budget) => {
			this.setState({ budget: budget });
		});
		UserApi.getCurrentUser().then((user) => {
			this.setState({ user: user });
		});
	}
	render() {
		return (
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle="Expenses" user={this.state.user}>
					<ManagementControlRow transactionType="3" />
					<ManagementDataTable transactions={this.state.budget.transactions} transactionType="3" />
				</ContentContainer>
			</div>
		);
	}
}

export default ExpensesPage;
