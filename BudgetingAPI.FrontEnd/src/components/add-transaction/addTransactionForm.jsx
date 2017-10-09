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

class AddTransactionForm extends Component {
	constructor() {
		super();
		this.state = {
			newTransaction: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			newTransaction: {
				"TransactionName": "",
				"TransactionType": this.props.transactionType,
				"TransactionDate": new Date(),
				"Value": 0
			}
		})
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			newTransaction: Object.assign({}, this.state.newTransaction, {
				[name]: value,
			}),
		});
	}

	handleDateChange(momentEvent) {
		const value =
			this.setState({
				newTransaction: Object.assign({}, this.state.newTransaction, {
					TransactionDate: momentEvent.toDate(),
				})
			})
	}

	render() {
		return (
			<AddTransactionFormContainer className="container">
				<form onSubmit={(event) => this.props.onSubmit(event, this.state.newTransaction)}>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label htmlFor="TransactionName">Transaction Name</label>
								<input type="text" className="form-control" name="TransactionName" placeholder="Transaction Name" onChange={this.handleInputChange} />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="TransactionType">Transaction Type </label>
								<select className="form-control" value={this.state.newTransaction.TransactionType} name="TransactionType" onChange={this.handleInputChange}>
									<option value="1">Income</option>
									<option value="2">Bill</option>
									<option value="3">Expense</option>
								</select>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="TransactionAmount">Transaction Amount </label>
								<div className="input-group">
									<span className="input-group-addon">$</span>
									<input type="number" className="form-control" placeholder="Transaction Amount" name="Value" onChange={this.handleInputChange} />
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="TransactionDate">Transaction Date </label>
								<DatePicker name="TransactionDate" className="form-control"
									selected={moment(this.state.newTransaction.TransactionDate)}
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

export default AddTransactionForm;
