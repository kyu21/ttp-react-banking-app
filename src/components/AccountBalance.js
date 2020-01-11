import React from "react";

function AccountBalance(props) {
	const balance = props.accountBalance.toFixed(2);
	return <p>Account Balance: ${balance}</p>;
}

export default AccountBalance;
