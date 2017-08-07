import React, { Component } from 'react';
import { render } from 'react-dom';

class BudgetHeader extends Component {
	render() {
		return (
			<span>{this.props.budget.budgetId}</span>
		);
	}
}

export default BudgetHeader;
