import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

const StyledDataTableRow = styled.tr`
	
`;

class ManagementDataTableRow extends Component {
	render() {
		return (
			<StyledDataTableRow>
				<td><input type="checkbox" onChange={(event) => this.props.onRowSelectionToggle(event, this.props.transaction)} /></td>
				<td>{this.props.transaction.transactionName}</td>
				<td><Moment date={this.props.transaction.transactionDate} format={'D MMMM YYYY'} /></td>
				<td><NumberFormat value={this.props.transaction.value} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /></td>
				<td><Link to={"/edit-transaction/" + this.props.transaction.transactionId}>Edit</Link></td>
			</StyledDataTableRow>
		);
	}
}

export default ManagementDataTableRow;
