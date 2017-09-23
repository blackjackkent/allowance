import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const TotalSpendRow = styled.div`
	text-align: center;
    color: #efefff;
    background: #123;
    font-size: 30px;
    padding: 10px;
`;

class BudgetTotalRow extends Component {
	render() {
		return (
			<TotalSpendRow className="row">
				<div className="col-md-12">
					For the remainder of the month, you can spend <NumberFormat value={this.props.budget.spendPerDay} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /> per day!
    			</div>
			</TotalSpendRow>
		);
	}
}

export default BudgetTotalRow;
