import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";
// import Debits from "./Debits";
// import Credits from "./Credits";

function Home(props) {
  return (
    <div>
      <img
        src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png"
        alt="bank image"
      />
      <h1>Bank of React</h1>
      User Profile for: <Link to="/UserProfile">{props.userName}</Link>
      <br />
      <Link to="/Credits">Credits</Link>
      <br />
      <Link to="/Debits">Debits</Link>
      <br />
      <AccountBalance accountBalance={props.accountBalance} />
    </div>
  );
}

export default Home;
