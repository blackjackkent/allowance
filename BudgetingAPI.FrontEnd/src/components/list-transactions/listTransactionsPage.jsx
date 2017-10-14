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
			transactionType: {},
			selectedRows: []
		}
		this.onRowSelectionToggle = this.onRowSelectionToggle.bind(this);
		this.onDeleteRows = this.onDeleteRows.bind(this);
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

	onRowSelectionToggle(event, transaction) {
		let selectedRows = this.state.selectedRows;
		if (selectedRows.includes(transaction)) {
			selectedRows = selectedRows.filter(t => t !== transaction);
			this.setState({ selectedRows: selectedRows });
			return;
		}
		selectedRows.push(transaction);
		this.setState({ selectedRows: selectedRows });
	}

	onDeleteRows(event) {
		this.setState({ isLoading: true });
		BudgetApi.deleteTransactions(this.state.budget.budgetId, this.state.selectedRows).then(() => {
			BudgetApi.getBudget().then((budget) => {
				this.setState({ budget: budget, isLoading: false, selectedRows: [] });
			});
		});
	}

	render() {
		return (
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle={this.state.transactionType.title} user={this.state.user}>
					<ManagementControlRow transactionType={this.state.transactionType.id} onDeleteRows={this.onDeleteRows} isDeleteDisabled={this.state.selectedRows.length} isLoading={this.state.isLoading} />
					<ManagementDataTable transactions={this.state.budget.transactions} transactionType={this.state.transactionType.id} onRowSelectionToggle={this.onRowSelectionToggle} />
				</ContentContainer>
			</div>
		);
	}
}

export default ExpensesPage;
