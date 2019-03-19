import React , {Component} from 'react';
import Card from './Card.js';

export default class Hand extends React.Component{


	constructor(props) {
        super(props);
        this.state = {           
            hand: []
        }

    }
	render(){
		return(
			<div>
				<h1>Hand Component</h1>
				{this.props.showDeck ? <Card hidden={true}/> : ''}


				{this.props.hand.map(function(card,i){
                    return <Card face={card.f} value={card.v} key={i}/>
                })}
			</div>	


		)
	}
}