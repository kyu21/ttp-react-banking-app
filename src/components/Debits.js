import React, { Component } from "react";

// let linkToAPI = https://moj-api.herokuapp.com/debits

class Debits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			debitItems: props.debitItems,
			debit: props.debit,
			accountBalance: props.accountBalance
		};
	}

	render() {
		let debitList = this.state.debitItems.map(x => (
			<ul>
				<li>description: {x.description}</li>
				<li>amount: {x.amount}</li>
				<li>date: {x.date}</li>
			</ul>
		));
		const balance = this.state.accountBalance.toFixed(2);
		return (
			<div>
				<h1>Debits Page</h1>

				{/* Adding Debits Form*/}
				{/* <form onSubmit={this.handleAddDebit}>
                Enter name: <input type="text"/>
                <input type="submit"/>
            </form> */}
				<div>
					<h2>Account Balance Display Area</h2>
					<p>Your account balance is: ${balance}</p>
					<p>Your total debit amount is: ${this.state.debit} </p>
				</div>

				<div>
					<h2>Debit Display Area</h2>
					{debitList}
				</div>
			</div>
		);
	}
}

export default Debits;
