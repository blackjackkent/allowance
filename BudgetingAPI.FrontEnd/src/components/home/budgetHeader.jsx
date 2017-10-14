import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

const Row = styled.div`
	padding: 30px;
	background: #F4F4F9;
	text-align: center;
`;
const RowHeading = styled.h2`
	margin-top: 10px;
`;
const ItemHeading = styled.p`
	font-size: 14px;
`;
const ItemValue = styled.p`
	font-size: 28px;
`;

class BudgetHeader extends Component {
	render() {
		return (
			<Row className="row">
				<div className="col-md-3">
					<RowHeading><Moment date={new Date()} format="MMMM, YYYY" /></RowHeading>
					<p>Desired savings: <NumberFormat value={this.props.budget.savings} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /></p>
				</div>
				<div className="col-md-3">
					<ItemHeading>Planned Income</ItemHeading>
					<ItemValue><NumberFormat value={this.props.budget.incomeTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /></ItemValue>
				</div>
				<div className="col-md-3">
					<ItemHeading>Planned Bills</ItemHeading>
					<ItemValue><NumberFormat value={this.props.budget.billTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /></ItemValue>
				</div>
				<div className="col-md-3">
					<ItemHeading>Expenses To Date</ItemHeading>
					<ItemValue><NumberFormat value={this.props.budget.expenseTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /></ItemValue>
				</div>
			</Row>
		);
	}
}

export default BudgetHeader;
