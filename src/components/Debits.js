
import React from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";


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

function Debits(props) {
  let debitList = props.debits.map(x => (
    <ul>
      <li>Description: {x.description}</li>
      <li>Amount: ${x.amount}</li>
      <li>Date: {x.date}</li>
    </ul>
  ));
  return (
    <div>
      <h1>Debits</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/Credits">Credits</Link>

      {/* Adding Debits Form*/}
      <h2>Add a new debit transaction:</h2>
      <form onSubmit={props.handleAddDebit}>
        Enter description: <input type="text" name="description" required />
        Enter amount:{" "}
        <input type="number" name="amount" step="0.01" min="0.01" required />
        <input type="submit" value="Add debit transaction" />
      </form>

      <div>
        <h2>Total debit:</h2>
        <p>
          Your total debit is:
          <span id="debit"> ${props.debit.toFixed(2)} </span>
        </p>
      </div>

      <AccountBalance accountBalance={props.accountBalance} />

      <div>
        <h2>Debit Transaction History</h2>
        {debitList}
      </div>
    </div>
  );
}

export default Debits;
