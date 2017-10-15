import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import ManagementDataTableRow from './managementDataTableRow.jsx';

const StyledDataTable = styled.div`
	width: 75%; 
	margin: auto;
	thead tr {
		font-size: 14px;
		background: #2F4550;
		color: #F4F4F9;
	}
`;

class ManagementDataTable extends Component {
	render() {
		if (typeof this.props.transactions === "undefined") {
			return null;
		}
		var rows = [];
		var transactions = this.props.transactions.filter((transaction) => transaction.transactionType === parseInt(this.props.transactionType));
		for (var i = 0; i < transactions.length; i++) {
			rows.push(<ManagementDataTableRow transaction={transactions[i]} key={transactions[i].transactionId} onRowSelectionToggle={this.props.onRowSelectionToggle} />);
		}
		return (
			<StyledDataTable>
				<table className="table table-responsive table-striped">
					<thead>
						<tr><th /><th>Transaction Name</th><th>Transaction Date</th><th>Transaction Amount</th><th /></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</StyledDataTable>
		);
	}
}

export default ManagementDataTable;
