import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

function Home(props) {
	return (
		<div>
			<img
				src="https://cdn2.iconfinder.com/data/icons/leto-blue-ui-generic-2/64/ui-20-512.png"
				alt="bank"
			/>
			<h1>Bank of React</h1>

			<Link to="/UserProfile">User Profile</Link>
			<br></br>
			<Link to="/Debits">Debits Page</Link>
			<br></br>
			<Link to="/Credits">Credits Page</Link>
			<AccountBalance accountBalance={props.accountBalance} />
		</div>
	);
}

export default Home;
