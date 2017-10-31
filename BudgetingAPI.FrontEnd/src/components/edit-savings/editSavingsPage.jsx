import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import styled from 'styled-components';

import BudgetApi from '../../api/budgetApi';
import UserApi from '../../api/userApi';
import SideNavigation from '../shared/sideNavigation.jsx';
import ContentContainer from '../shared/contentContainer.jsx';
import EditSavingsForm from './editSavingsForm.jsx';

class EditSavingsPage extends Component {
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

	onSubmit(event, newSavings) {
		event.preventDefault();
		this.setState({
			budget: Object.assign({}, this.state.budget, {
				savings: newSavings,
			}),
		}, this.submitUpdatedBudget);
	}

	submitUpdatedBudget() {
		let component = this;
		BudgetApi.editBudget(this.state.budget.budgetId, this.state.budget).then(function (data) {
			component.setState({ submitted: true })
		});
	}

	render() {
		if (this.state.submitted) {
			return <Redirect to={`/`} />
		}

		return (
			<div>
				<SideNavigation className="col-md-2" />
				<ContentContainer headerTitle="Edit Savings Plan" user={this.state.user}>
					<EditSavingsForm onSubmit={this.onSubmit} budget={this.state.budget} />
				</ContentContainer>
			</div>
		);
	}
}

export default EditSavingsPage;
