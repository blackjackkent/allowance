import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const AddTransactionFormContainer = styled.div`
	.react-datepicker-wrapper {
		display: block;
		> .react-datepicker__input-container {
			display: block;
		}
	}
`;

class TransactionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transaction: {
				"transactionId": null,
				"transactionName": "",
				"transactionType": 1,
				"transactionDate": new Date(),
				"value": 0
			}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		if (this.props.transaction && this.props.transactionId) {
			this.setState({
				transaction: this.props.transaction
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.transaction && nextProps.transaction.transactionId !== this.state.transaction.transactionId) {
			this.setState({
				transaction: nextProps.transaction
			})
		}
		if (nextProps.transactionType && nextProps.transactionType != this.state.transaction.transactionType) {
			let currentTransaction = this.state.transaction;
			currentTransaction.transactionType = nextProps.transactionType;
			this.setState({
				transaction: currentTransaction
			});
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			transaction: Object.assign({}, this.state.transaction, {
				[name]: value,
			}),
		});
	}

	handleDateChange(momentEvent) {
		this.setState({
			transaction: Object.assign({}, this.state.transaction, {
				TransactionDate: momentEvent.toDate(),
			})
		})
	}

	render() {
		return (
			<AddTransactionFormContainer className="container">
				<form onSubmit={(event) => this.props.onSubmit(event, this.state.transaction)}>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label htmlFor="transactionName">Transaction Name</label>
								<input type="text" className="form-control" name="transactionName" value={this.state.transaction.transactionName} placeholder="Transaction Name" onChange={this.handleInputChange} />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="transactionType">Transaction Type </label>
								<select className="form-control" value={this.state.transaction.transactionType} name="transactionType" onChange={this.handleInputChange}>
									<option value="1">Income</option>
									<option value="2">Bill</option>
									<option value="3">Expense</option>
								</select>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="transactionAmount">Transaction Amount </label>
								<div className="input-group">
									<span className="input-group-addon">$</span>
									<input type="number" className="form-control" placeholder="Transaction Amount" name="value" value={this.state.transaction.value} onChange={this.handleInputChange} />
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="TransactionDate">Transaction Date </label>
								<DatePicker name="TransactionDate" className="form-control"
									selected={moment(this.state.transaction.transactionDate)}
									onChange={this.handleDateChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-1 pull-right">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</div>
				</form>
			</AddTransactionFormContainer>
		);
	}
}

export default TransactionForm;
