import React, {Component} from 'react';

// let linkToAPI = https://moj-api.herokuapp.com/debits

class Debits extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            debitList: [], 
            totalAmount: 0
        }
    }

    handleApiFetch = () =>{
        let linkToAPI = "https://moj-api.herokuapp.com/debits";
            //console.log(linkToAPI);
            fetch(linkToAPI)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({data: myJson})
            })
            .then( () =>{
                let totalAmount = 0;
                this.state.data.forEach((e) =>{
                    totalAmount += e.amount;
                });
                //console.log("Total amount: ", totalAmount);
                this.setState({totalAmount: totalAmount});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    componentDidMount(){
        document.title = "Debits Page"; 
        this.handleApiFetch();
    }

    render(){
        let debitList = this.state.data.map(x =>
            <ul>
                <li>description: {x.description}</li>
                <li>amount: {x.amount}</li>
                <li>data: {x.date}</li>
            </ul>);
        return(
        <div>
            <h1>Debits Page</h1>
            <div>
                <h2>Debit Display Area</h2>
                {debitList}
            </div>
            <div>
                <h2>Account Balance Display Area</h2>
                <p>Your total debit amount is: ${this.state.totalAmount} </p>
            </div>
        </div>
        )   
    }
}

export default Debits