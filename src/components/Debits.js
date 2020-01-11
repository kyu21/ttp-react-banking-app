import React, { Component } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
class Debits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			debitItems: props.debitItems,
			debit: props.debit,
			accountBalance: props.accountBalance,
			newDescription: "",
			newAmount: 0,
			newDate: new Date().toISOString()
		};
	}

	handleAddDebit = e => {
		let newDebit = {
			description: this.state.newDescription,
			amount: parseFloat(this.state.newAmount),
			date: this.state.newDate
		};
		this.setState(
			prevState => ({
				debitItems: [...prevState.debitItems, newDebit],
				debit: prevState.debit + newDebit.amount,
				accountBalance: prevState.accountBalance - newDebit.amount
			}),
			() =>
				this.props.handleAddDebit(
					this.state.debitItems,
					this.state.debit,
					this.state.accountBalance
				)
		);
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const debitList = this.state.debitItems.map(x => (
			<ul>
				<li>description: {x.description}</li>
				<li>amount: {x.amount}</li>
				<li>date: {x.date}</li>
			</ul>
		));
		return (
			<div>
				<Link to="/">Home Page</Link>
				<h1>Debits Page</h1>

				<div>
					<h2>Account Balance Display Area</h2>
					<AccountBalance accountBalance={this.state.accountBalance} />
					<p>Your total debit amount is: ${this.state.debit} </p>
				</div>

				<div>
					<h2>Debit Display Area</h2>
					{debitList}
				</div>
				{/* Adding Debits Form*/}
				<div className="form-container">
					<h2>Adding Debits Area</h2>
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
							value={new Date().toISOString()}
							readOnly
						/>
					</Form>
					<Button onClick={this.handleAddDebit}>Submit</Button>
				</div>
			</div>
		);
	}
}

export default Debits;
