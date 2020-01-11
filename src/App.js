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
    this.setState({ debit: val.toFixed(2) });
  };

  calcCredit = () => {
    let val = 0;
    for (let i = 0; i < this.state.credits.length; ++i) {
      val += this.state.credits[i].amount;
    }
    this.setState({ credit: val.toFixed(2) }, () => this.updateBalance());
  };

  updateBalance = () => {
    let val = this.state.credit - this.state.debit;
    console.log("val", val);
    this.setState({ accountBalance: val.toFixed(2) });
  };

  fetchDebits = () => {
    console.log("fetching");
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then(response => {
        this.setState({ debits: response.data }, () => this.calcDebit());
      })
      .catch(err => console.log(err));
  };

  fetchCredits = () => {
    console.log("fetching");
    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then(response => {
        this.setState({ credits: response.data }, () => this.calcCredit());
      })
      .catch(err => console.log(err));
  };

  handleAddCredit = () => {};

  handleAddDebit = () => {};

  render() {
    console.log("_debit", this.state.debit);
    console.log("_credit", this.state.credit);
    console.log("_balance", this.state.accountBalance);
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
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
      />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.credits}
        credit={this.state.credit}
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
