import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

const StyledDataTableRow = styled.tr`
	
`;

class ManagementDataTableRow extends Component {
	render() {
		return (
			<StyledDataTableRow>
				<td>{this.props.transaction.transactionName}</td>
				<td>{Moment(this.props.transaction.transactionDate).format('D MMMM YYYY')}</td>
				<td>{this.props.transaction.value}</td>
			</StyledDataTableRow>
		);
	}
}

export default ManagementDataTableRow;
