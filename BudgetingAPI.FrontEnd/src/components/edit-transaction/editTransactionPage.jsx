import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import TransactionForm from '../shared/transactionForm.jsx';

class EditTransactionPage extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			budget: {},
			transaction: {}
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		UserApi.getCurrentUser().then((user) => {
			this.setState({ user: user });
		});
		let props = this.props;
		BudgetApi.getBudget().then((budget) => {
			let transaction = budget.transactions.find(t => t.transactionId == props.match.params.transactionId);
			this.setState({ budget: budget, transaction: transaction });
		});
	}

	onSubmit(event, transaction) {
		event.preventDefault();
		let component = this;
		BudgetApi.editTransaction(this.state.budget.budgetId, transaction).then(function (data) {
			let transactionType = BudgetApi.getTransactionTypeById(transaction.transactionType);
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
				<ContentContainer headerTitle="Edit Transaction" user={this.state.user}>
					<TransactionForm onSubmit={this.onSubmit} transaction={this.state.transaction} />
				</ContentContainer>
			</div>
		);
	}
}

export default EditTransactionPage;
