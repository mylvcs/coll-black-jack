import React, {Component} from 'react';

export default class Outcome extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            status: "playing"
        };

    }
    render(){
        
            /* nothing fancy happening here , displaying a bootstrap alert representing the game status */
        switch(this.props.status) {
            case "playing":
                return (<div className="alert alert-info" role="alert">Hit or Stand</div>);
                break;
            case "win":
                return (<div className="alert alert-success" role="alert">Win Win Win</div>);
                break;
            case "lose":
                return (<div className="alert alert-danger" role="alert">You Lose</div>);
                break;
            default:
                return(<div className="alert alert-info" role="alert">Click Deal to Start ! </div>);
                break;
        }
        
    }
        
}