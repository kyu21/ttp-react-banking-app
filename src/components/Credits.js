import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import TransactionForm from "./TransactionForm";
class Credits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creditItems: props.creditItems,
			credit: props.credit,
			accountBalance: props.accountBalance
		};
	}

	handleAddCredit = (newDescription, newAmount, newDate) => {
		let newCredit = {
			description: newDescription,
			amount: parseFloat(newAmount),
			date: newDate
		};
		this.setState(
			prevState => ({
				creditItems: [...prevState.creditItems, newCredit],
				credit: prevState.credit + newCredit.amount,
				accountBalance: prevState.accountBalance + newCredit.amount
			}),
			() =>
				this.props.handleAddCredit(
					this.state.creditItems,
					this.state.credit,
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
		let creditList = this.state.creditItems.map(x => (
			<ul>
				<li>description: {x.description}</li>
				<li>amount: {x.amount}</li>
				<li>date: {new Date(x.date).toLocaleString()}</li>
			</ul>
		));

		return (
			<div>
				<Link to="/">Home Page</Link>
				<h1>Credits Page</h1>

				<div>
					<h2>Account Balance Display Area</h2>
					<AccountBalance accountBalance={this.state.accountBalance} />
					<p>Your total credit amount is: ${this.state.credit} </p>
				</div>

				<div>
					<h2>Credit Display Area</h2>
					{creditList}
				</div>
				{/* Adding Debits Form*/}
				<TransactionForm
					transactionType="credit"
					handleAddCredit={this.handleAddCredit}
				/>
			</div>
		);
	}
}

export default Credits;
