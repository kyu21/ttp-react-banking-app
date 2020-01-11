import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, UserProfile, Debits, Credits } from "./components";
import axios from "axios";

const API_URL_DEBIT = "https://moj-api.herokuapp.com/debits";
const API_URL_CREDIT = "https://moj-api.herokuapp.com/credits";
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

	componentDidMount = () => {
		return Promise.all([this.getDebits(), this.getCredits()]);
	};

	getDebits = async () => {
		try {
			let res = await axios.get(API_URL_DEBIT);
			// console.log(res);
			res.data.forEach(i => {
				this.setState(prevState => ({
					debitItems: [...prevState.debitItems, i],
					debit: prevState.debit + i.amount,
					accountBalance: prevState.accountBalance - i.amount
				}));
			});
		} catch (err) {
			console.log(err);
		}
		return Promise.resolve("success");
	};

	getCredits = async () => {
		try {
			let res = await axios.get(API_URL_CREDIT);
			// console.log(res);
			res.data.forEach(i => {
				this.setState(prevState => ({
					creditItems: [...prevState.creditItems, i],
					credit: prevState.credit + i.amount,
					accountBalance: prevState.accountBalance + i.amount
				}));
			});
		} catch (err) {
			console.log(err);
		}
		return Promise.resolve("success");
	};

	handleAddDebit = (debitItems, debit, accountBalance) => {
		this.setState({
			debitItems: debitItems,
			debit: debit,
			accountBalance: accountBalance
		});
	};

	handleAddCredit = (creditItems, credit, accountBalance) => {
		this.setState({
			creditItems: creditItems,
			credit: credit,
			accountBalance: accountBalance
		});
	};

	render() {
		const {
			accountBalance,
			debit,
			credit,
			debitItems,
			creditItems
		} = this.state;

		const HomeComponent = () => <Home accountBalance={accountBalance} />;
		const UserProfileComponent = () => (
			<UserProfile
				userName={this.state.currentUser.userName}
				memberSince={this.state.currentUser.memberSince}
			/>
		);
		const DebitsComponent = () => (
			<Debits
				debit={debit}
				debitItems={debitItems}
				accountBalance={accountBalance}
				handleAddDebit={this.handleAddDebit}
			/>
		);
		const CreditsComponent = () => (
			<Credits
				credit={credit}
				creditItems={creditItems}
				accountBalance={accountBalance}
				handleAddCredit={this.handleAddCredit}
			/>
		);

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
