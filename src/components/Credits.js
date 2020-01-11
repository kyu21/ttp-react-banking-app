import React, { Component } from "react";
import { Form, Label, Input, Button } from "reactstrap";
class Credits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creditItems: props.creditItems,
			credit: props.credit,
			accountBalance: props.accountBalance,
			newDescription: "",
			newAmount: 0,
			newDate: new Date().toISOString()
		};
	}

	handleAddCredit = e => {
		let newCredit = {
			description: this.state.newDescription,
			amount: parseFloat(this.state.newAmount),
			date: this.state.newDate
		};
		this.setState(
			prevState => ({
				creditItems: [...prevState.creditItems, newCredit],
				credit: prevState.credit + newCredit.amount,
				accountBalance: prevState.accountBalance + newCredit.amount
			}),
			() => console.log(this.state.debitItems)
		);
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		let creditList = this.state.creditItems.map(x => (
			<ul>
				<li>description: {x.description}</li>
				<li>amount: {x.amount}</li>
				<li>date: {x.date}</li>
			</ul>
		));

		const balance = this.state.accountBalance.toFixed(2);
		return (
			<div>
				<h1>Credits Page</h1>

				<div>
					<h2>Account Balance Display Area</h2>
					<p>Your account balance is: ${balance}</p>
					<p>Your total credit amount is: ${this.state.credit} </p>
				</div>

				<div>
					<h2>Credit Display Area</h2>
					{creditList}
				</div>
				{/* Adding Debits Form*/}
				<div className="form-container">
					<h2>Adding Credits Area</h2>
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
					<Button onClick={this.handleAddCredit}>Submit</Button>
				</div>
			</div>
		);
	}
}

export default Credits;
