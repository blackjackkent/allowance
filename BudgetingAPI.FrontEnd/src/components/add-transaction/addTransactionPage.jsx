import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
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
		let component = this;
		BudgetApi.addTransaction(this.state.budget.budgetId, transaction).then(function (data) {
			let transactionType = BudgetApi.getTransactionTypeById(transaction.TransactionType);
			component.setState({ submitted: true, submittedTransactionType: transactionType })
		});
	}

	render() {
		if (this.state.submitted) {
			return <Redirect to={`/list-transactions/${this.state.submittedTransactionType.key}`} />
		}

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
