
import React, { Component } from "react";

function AccountBalance(props) {
  return (
    <div>
      <h2>Total balance:</h2>
      <p>Your total balance is: ${props.accountBalance.toFixed(2)}</p>
    </div>
  );
}

export default AccountBalance;
