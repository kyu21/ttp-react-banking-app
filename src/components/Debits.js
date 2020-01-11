import React, { Component } from "react";

// let linkToAPI = https://moj-api.herokuapp.com/debits

function Debits(props) {
  let debitList = props.debits.map(x => (
    <ul>
      <li>description: {x.description}</li>
      <li>amount: {x.amount}</li>
      <li>data: {x.date}</li>
    </ul>
  ));
  return (
    <div>
      <h1>Debits Page</h1>

      {/* Adding Debits Form*/}
      <form onSubmit={props.handleAddDebit}>
        Enter description: <input type="text" />
        Enter amount: <input type="number" />
        <input type="submit" />
      </form>

      <div>
        <h2>Debit Display Area</h2>
        {debitList}
      </div>

      <div>
        <h2>Account Balance Display Area</h2>
        <p>Your total debit amount is: ${props.debit} </p>
      </div>
    </div>
  );
}

export default Debits;
