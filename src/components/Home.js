import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Home extends Component {
	render() {
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
				<AccountBalance accountBalance={this.props.accountBalance} />
			</div>
		);
	}
}

export default Home;
