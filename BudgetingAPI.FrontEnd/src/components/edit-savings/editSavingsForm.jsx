import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const EditSavingsFormContainer = styled.div``;

class EditSavingsForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newSavings: 0,
			budget: {
				savings: 0
			}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		if (this.props.budget && this.props.budgetId) {
			this.setState({
				budget: this.props.budget,
				newSavings: this.props.budget.savings
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.budget && nextProps.budget.budgetId !== this.state.budget.budgetId) {
			this.setState({
				budget: nextProps.budget,
				newSavings: nextProps.budget.savings
			})
		}
	}

	handleInputChange(event) {
		this.setState({
			newSavings: event.target.value
		});
	}

	render() {
		return (
			<EditSavingsFormContainer className="container">
				<form onSubmit={(event) => this.props.onSubmit(event, this.state.newSavings)}>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<p>Currently you are planning to save <NumberFormat value={this.state.budget.savings} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} /> this month.</p>
								<p>Enter a new savings goal:</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="form-group">
								<label htmlFor="transactionAmount">Savings Amount </label>
								<div className="input-group">
									<span className="input-group-addon">$</span>
									<input type="number" className="form-control" placeholder="Savings Amount" name="savings" value={this.state.newSavings} onChange={this.handleInputChange} />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-1">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</div>
				</form>
			</EditSavingsFormContainer>
		);
	}
}

export default EditSavingsForm;
