import React, { Component } from "react";

// let linkToAPI = https://moj-api.herokuapp.com/debits

function Credits(props) {
  console.log(props.credits);
  let creditList = props.credits.map(x => (
    <ul>
      <li>Description: {x.description}</li>
      <li>Amount: {x.amount}</li>
      <li>Data: {x.date}</li>
    </ul>
  ));

  return (
    <div>
      <h1>Credits Page</h1>

      {/* Adding Credits Form*/}
      <form onSubmit={props.handleAddCredit}>
        Enter description: <input type="text" />
        Enter amount: <input type="number" />
        <input type="submit" />
      </form>

      <div>
        <h2>Credit Display Area</h2>
        {creditList}
      </div>

      <div>
        <h2>Account Balance Display Area</h2>
        <p>Your total credit amount is: ${props.credit} </p>
      </div>
    </div>
  );
}

export default Credits;
