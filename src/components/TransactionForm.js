import React, { Component } from "react";
import { Form, Label, Input, Button } from "reactstrap";

class TransactionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newDescription: "",
			newAmount: 0,
			newDate: new Date()
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleFormSubmit = () => {
		const transactionType = this.props.transactionType;
		const { newDescription, newAmount, newDate } = this.state;
		if (transactionType === "debit") {
			this.props.handleAddDebit(newDescription, newAmount, newDate);
		} else if (transactionType === "credit") {
			this.props.handleAddCredit(newDescription, newAmount, newDate);
		}
	};

	render() {
		return (
			<div className="form-container">
				<h2>Adding {this.state.transactionType} Area</h2>
				<Form className="add-form">
					<Label for="newDescription">Description:</Label>
					<Input
						name="newDescription"
						type="text"
						placeholder="Describe your transaction"
						onChange={this.handleChange}
					/>
					<br></br>
					<Label for="newAmount">Amount:</Label>
					<Input
						name="newAmount"
						type="number"
						placeholder="0.00"
						onChange={this.handleChange}
					/>
					<br></br>
					<Label for="newDate">Date:</Label>
					<Input
						name="newDate"
						type="text"
						value={new Date().toLocaleString()}
						readOnly
					/>
				</Form>
				<Button onClick={this.handleFormSubmit}>Submit</Button>
			</div>
		);
	}
}

export default TransactionForm;
