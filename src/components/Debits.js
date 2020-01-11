import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import TransactionForm from "./TransactionForm";
class Debits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			debitItems: props.debitItems,
			debit: props.debit,
			accountBalance: props.accountBalance
		};
	}

	handleAddDebit = (newDescription, newAmount, newDate) => {
		let newDebit = {
			description: newDescription,
			amount: parseFloat(newAmount),
			date: newDate
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
			<ul key={x.description}>
				<li>description: {x.description}</li>
				<li>amount: {x.amount}</li>
				<li>date: {new Date(x.date).toLocaleString()}</li>
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
				<TransactionForm
					transactionType="debit"
					handleAddDebit={this.handleAddDebit}
				/>
			</div>
		);
	}
}

export default Debits;
