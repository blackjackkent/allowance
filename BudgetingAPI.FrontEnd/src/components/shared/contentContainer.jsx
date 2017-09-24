import React, { Component } from 'react';

import Header from '../shared/header.jsx';
import styled from 'styled-components';

const StyledContainer = styled.div`
	margin-left: 300px;
`;

class ContentContainer extends Component {
	constructor() {
		super();
		this.state = {
			budget: {}
		};
		// BudgetApi.getBudget().then((budget) => {
		// 	this.setState({ budget: budget });
		// });
	}
	render() {
		return (
			<StyledContainer>
				<Header headerTitle={this.props.headerTitle} />
				{this.props.children}
			</StyledContainer>
		);
	}
}

export default ContentContainer;
