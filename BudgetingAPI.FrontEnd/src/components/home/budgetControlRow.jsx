import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

const StyledBudgetControlRow = styled.div`
	text-align: center;
    color: #efefff;
    background: #123;
    font-size: 30px;
    padding: 10px;
`;

class BudgetControlRow extends Component {
	render() {
		return (
			<StyledBudgetControlRow className="row">
				<div className="col-md-12">
					For the remainder of the month, you can spend test per day!
    			</div>
			</StyledBudgetControlRow>
		);
	}
}

export default BudgetControlRow;
