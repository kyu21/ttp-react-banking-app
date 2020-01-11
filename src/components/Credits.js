import React, { Component } from "react";

// let linkToAPI = https://moj-api.herokuapp.com/debits

class Credits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creditItems: props.creditItems,
			credit: props.credit,
			accountBalance: props.accountBalance
		};
	}

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

				{/* Adding Debits Form*/}
				{/* <form onSubmit={this.handleAddCredit}>
					Enter name: <input type="text" />
					<input type="submit" />
				</form> */}

				<div>
					<h2>Account Balance Display Area</h2>
					<p>Your account balance is: ${balance}</p>
					<p>Your total credit amount is: ${this.state.credit} </p>
				</div>

				<div>
					<h2>Credit Display Area</h2>
					{creditList}
				</div>
			</div>
		);
	}
}

export default Credits;
