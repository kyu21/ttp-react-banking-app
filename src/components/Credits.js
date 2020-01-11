import React, {Component} from 'react';

// let linkToAPI = https://moj-api.herokuapp.com/debits

class Credits extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            creditList: [], 
            totalAmount: 0
        }
    }

    handleApiFetch = () =>{
        let linkToAPI = "https://moj-api.herokuapp.com/credits";
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
        document.title = "Crebits Page"; 
        this.handleApiFetch();
    }

    handleAddCredit = () =>{
        
    }

    render(){
        let creditList = this.state.data.map(x =>
            <ul>
                <li>description: {x.description}</li>
                <li>amount: {x.amount}</li>
                <li>data: {x.date}</li>
            </ul>);
        return(
        <div>
            <h1>Credits Page</h1>

            {/* Adding Debits Form*/}
            <form onSubmit={this.handleAddCredit}>
                Enter name: <input type="text"/>
                <input type="submit"/>
            </form>

            <div>
                <h2>Credit Display Area</h2>
                {creditList}
            </div>

            <div>
                <h2>Account Balance Display Area</h2>
                <p>Your total credit amount is: ${this.state.totalAmount} </p>
            </div>
        </div>
        )   
    }
}

export default Credits