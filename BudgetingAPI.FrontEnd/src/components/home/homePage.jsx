import React, { Component } from 'react';

import BudgetApi from '../../api/budgetApi';
import Header from '../shared/header.jsx';
import BudgetControlRow from './budgetControlRow.jsx';
import BudgetHeader from './budgetHeader.jsx';
import BudgetTotalRow from './budgetTotalRow.jsx';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import styled from 'styled-components';

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
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle="Dashboard">
					<BudgetTotalRow budget={this.state.budget} />
					<BudgetHeader budget={this.state.budget} />
				</ContentContainer>
				{/* <BudgetHeader budget={this.state.budget} />
				
				<BudgetControlRow /> */}
			</div>
		);
	}
}

export default HomePage;
