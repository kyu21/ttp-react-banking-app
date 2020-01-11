
import React from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";


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
			() =>
				this.props.handleAddCredit(
					this.state.creditItems,
					this.state.credit,
					this.state.accountBalance
				)
		);
	};

function Credits(props) {
  console.log(props.credits);
  let creditList = props.credits.map(x => (
    <ul>
      <li>Description: {x.description}</li>
      <li>Amount: ${x.amount}</li>
      <li>Date: {x.date}</li>
    </ul>
  ));

  return (
    <div>
      <h1>Credits</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/Debits">Debits</Link>

      {/* Adding Credits Form*/}
      <h2>Add a new credit transaction:</h2>
      <form onSubmit={props.handleAddCredit}>
        Enter description: <input type="text" name="description" required />
        Enter amount:{" "}
        <input type="number" name="amount" step="0.01" min="0.01" required />
        <input type="submit" value="Add credit transaction" />
      </form>

      <div>
        <h2>Total credit:</h2>
        <p>Your total credit is: ${props.credit.toFixed(2)} </p>
      </div>

      <AccountBalance accountBalance={props.accountBalance} />

      <div>
        <h2>Credit Transaction History</h2>
        {creditList}
      </div>
    </div>
  );

}

export default Credits;
