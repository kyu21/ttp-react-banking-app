import React, { Component } from "react";

function AccountBalance(props) {
	const balance = props.accountBalance.toFixed(2);
	return <div>Balance: ${balance}</div>;
}

export default AccountBalance;
