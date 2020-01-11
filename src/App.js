import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, UserProfile, Debits, Credits } from "./components";
import axios from "axios";

class App extends Component {
	constructor() {
		super();
		this.state = {
			accountBalance: 0,
			credit: 0,
			debit: 0,
			creditItems: [],
			debitItems: [],
			currentUser: {
				userName: "bob_loblaw",
				memberSince: "08/23/99"
			}
		};
	}

	componentDidMount = () => {};

	render() {
		const HomeComponent = () => (
			<Home accountBalance={this.state.accountBalance} />
		);
		const UserProfileComponent = () => (
			<UserProfile
				userName={this.state.currentUser.userName}
				memberSince={this.state.currentUser.memberSince}
			/>
		);
		const DebitsComponent = () => <Debits />;
		const CreditsComponent = () => <Credits />;

		return (
			<Router>
				<div>
					<Route exact path="/" render={HomeComponent} />
					<Route exact path="/userProfile" render={UserProfileComponent} />
					<Route exact path="/debits" render={DebitsComponent} />
					<Route exact path="/credits" render={CreditsComponent} />
				</div>
			</Router>
		);
	}
}
export default App;
