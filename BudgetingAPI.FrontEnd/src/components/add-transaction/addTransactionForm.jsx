import React, { Component } from 'react';
import styled from 'styled-components';

class AddTransactionPage extends Component {
	constructor() {
		super();
		this.state = {
			newTransaction: {
				"TransactionName": "",
				"TransactionType": 1,
				"TransactionDate": null,
				"Value": 200
			}
		}
	}
	render() {
		return (
			<div>

			</div>
		);
	}
}

export default AddTransactionPage;
