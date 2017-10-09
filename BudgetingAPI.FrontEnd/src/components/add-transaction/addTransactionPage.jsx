import React, { Component } from 'react';
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import AddTransactionForm from './addTransactionForm.jsx';

class AddTransactionPage extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			budget: {}
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		UserApi.getCurrentUser().then((user) => {
			this.setState({ user: user });
		});
		BudgetApi.getBudget().then((budget) => {
			this.setState({ budget: budget });
		});
	}

	onSubmit(event, transaction) {
		event.preventDefault();
		console.log(transaction);
		BudgetApi.addTransaction(this.state.budget.budgetId, transaction).then(function (data) {
			if (transaction.TransactionType == 1)
				return window.location.href = '/income';
			if (transaction.TransactionType == 2)
				return window.location.href = '/bills';
			if (transaction.TransactionType == 3)
				return window.location.href = '/expenses';
		});
	}

	render() {
		return (
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle="Add Transaction" user={this.state.user}>
					<AddTransactionForm onSubmit={this.onSubmit} transactionType={this.props.match.params.transactionType} />
				</ContentContainer>
			</div>
		);
	}
}

export default AddTransactionPage;
