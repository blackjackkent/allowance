import React, { Component } from 'react';
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import ManagementControlRow from './managementControlRow.jsx';
import ManagementDataTable from './managementDataTable.jsx';

class ExpensesPage extends Component {
	constructor() {
		super();
		this.state = {
			budget: {},
			user: {},
			transactionType: {}
		}
	}

	componentDidMount() {
		this.init(this.props);

		BudgetApi.getBudget().then((budget) => {
			this.setState({ budget: budget });
		});
		UserApi.getCurrentUser().then((user) => {
			this.setState({ user: user });
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.transactionType !== nextProps.match.params.transactionType) {
			this.init(nextProps);
		}
	}

	init(props) {
		this.setState({
			transactionType: BudgetApi.getTransactionTypeByKey(
				props.match.params.transactionType
			)
		});
	}

	render() {
		return (
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle={this.state.transactionType.title} user={this.state.user}>
					<ManagementControlRow transactionType={this.state.transactionType.id} />
					<ManagementDataTable transactions={this.state.budget.transactions} transactionType={this.state.transactionType.id} />
				</ContentContainer>
			</div>
		);
	}
}

export default ExpensesPage;
