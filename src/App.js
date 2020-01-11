import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, UserProfile, Debits, Credits } from "./components";
import axios from "axios";

// If we had more time, we would've tried implementing Header and Body components, so that we could have had the same header on every page.
// Also, defining a Card component for rendering each Credit and Debit transaction.

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      debit: 0,
      credit: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99"
      }
    };
  }

  componentDidMount() {
    this.fetchDebits();
    this.fetchCredits();
  }

  calcDebit = () => {
    let val = 0;
    for (let i = 0; i < this.state.debits.length; ++i) {
      val += this.state.debits[i].amount;
    }
    this.setState({ debit: val }, () => this.updateBalance());
  };

  calcCredit = () => {
    let val = 0;
    for (let i = 0; i < this.state.credits.length; ++i) {
      val += this.state.credits[i].amount;
    }
    this.setState({ credit: val }, () => this.updateBalance());
  };

  updateBalance = () => {
    let val = this.state.credit - this.state.debit;
    this.setState({ accountBalance: val });
  };

  fetchDebits = () => {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then(response => {
        this.setState({ debits: response.data }, () => this.calcDebit());
      })
      .catch(err => console.log(err));
  };

  fetchCredits = () => {
    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then(response => {
        this.setState({ credits: response.data }, () => this.calcCredit());
      })
      .catch(err => console.log(err));
  };

  handleAddCredit = event => {
    event.preventDefault();
    let transaction = {};
    transaction.description = event.target.description.value;
    transaction.amount = parseFloat(
      event.target.amount.value.replace(/^0+/, "")
    );
    let d = new Date();
    transaction.date = d.toISOString();
    let newCredits = [...this.state.credits];
    newCredits.unshift(transaction);
    // console.log("unshift", newCredits);
    this.setState({ credits: newCredits }, () => this.calcCredit());
  };

  handleAddDebit = event => {
    event.preventDefault();
    let transaction = {};
    transaction.description = event.target.description.value;
    transaction.amount = parseFloat(
      event.target.amount.value.replace(/^0+/, "")
    );
    let d = new Date();
    transaction.date = d.toISOString();
    let newDebits = [...this.state.debits];
    newDebits.unshift(transaction);
    this.setState({ debits: newDebits }, () => this.calcDebit());
  };

  render() {
    const HomeComponent = () => (
      <Home
        accountBalance={this.state.accountBalance}
        userName={this.state.currentUser.userName}
      />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debits}
        debit={this.state.debit}
        handleAddDebit={this.handleAddDebit}
        accountBalance={this.state.accountBalance}
      />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.credits}
        credit={this.state.credit}
        handleAddCredit={this.handleAddCredit}
        accountBalance={this.state.accountBalance}
      />
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
        </Switch>
      </Router>
    );
  }
}
export default App;
