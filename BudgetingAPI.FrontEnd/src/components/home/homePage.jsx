import React, { Component } from 'react';
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import BudgetHeader from './budgetHeader.jsx';
import BudgetTotalRow from './budgetTotalRow.jsx';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';

class HomePage extends Component {
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
				<ContentContainer headerTitle="Dashboard" user={this.state.user}>
					<BudgetTotalRow budget={this.state.budget} />
					<BudgetHeader budget={this.state.budget} />
				</ContentContainer>
			</div>
		);
	}
}

export default HomePage;
