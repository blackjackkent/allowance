import React, { Component } from 'react';
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import ManagementControlRow from '../shared/managementControlRow.jsx';
import ManagementDataTable from '../shared/managementDataTable.jsx';

class AddTransactionPage extends Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
	}
	componentDidMount() {
		UserApi.getCurrentUser().then((user) => {
			this.setState({ user: user });
		});
	}
	render() {
		return (
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle="Expenses" user={this.state.user}>
					<AddTransactionForm />
				</ContentContainer>
			</div>
		);
	}
}

export default AddTransactionPage;
