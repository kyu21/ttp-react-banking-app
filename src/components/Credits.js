import React from "react";
import { Link } from "react-router-dom";

// let linkToAPI = https://moj-api.herokuapp.com/debits

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
        <p>Your total credit amount is: ${props.credit.toFixed(2)} </p>
      </div>

      <div>
        <h2>Credit Transaction History</h2>
        {creditList}
      </div>
    </div>
  );
}

export default Credits;
