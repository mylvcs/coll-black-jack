import React , {Component} from 'react';

import Hand from './Hand.js';
import Interface from './Interface.js';


export default class Table extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			deck: [
	            {v:11,f:"c1"},{v:2,f:"c2"},{v:3,f:"c3"},{v:4,f:"c4"},{v:5,f:"c5"},{v:6,f:"c6"},
	            {v:7,f:"c7"},{v:8,f:"c8"},{v:9,f:"c9"},{v:10,f:"c10"},{v:10,f:"c11"},{v:10,f:"c12"},{v:10,f:"c13"},
	            {v:11,f:"h1"},{v:2,f:"h2"},{v:3,f:"h3"},{v:4,f:"h4"},{v:5,f:"h5"},{v:6,f:"h6"},
	            {v:7,f:"h7"},{v:8,f:"h8"},{v:9,f:"h9"},{v:10,f:"h10"},{v:10,f:"h11"},{v:10,f:"h12"},{v:10,f:"h13"},
	            {v:11,f:"s1"},{v:2,f:"s2"},{v:3,f:"s3"},{v:4,f:"s4"},{v:5,f:"s5"},{v:6,f:"s6"},
	            {v:7,f:"s7"},{v:8,f:"s8"},{v:9,f:"s9"},{v:10,f:"s10"},{v:10,f:"s11"},{v:10,f:"s12"},{v:10,f:"s13"},
	            {v:11,f:"d1"},{v:2,f:"d2"},{v:3,f:"d3"},{v:4,f:"d4"},{v:5,f:"d5"},{v:6,f:"d6"},
	            {v:7,f:"d7"},{v:8,f:"d8"},{v:9,f:"d9"},{v:10,f:"d10"},{v:10,f:"d11"},{v:10,f:"d12"},{v:10,f:"d13"}
        	],
        	player: [],
        	playerscore: 0,
        	dealerscore: 0,
        	dealer: [],
        	nextDeck:[],
        	status: "new",
		}
		this.handleDealButt = this.handleDealButt.bind(this);
  		this.handleHitButt = this.handleHitButt.bind(this);
  		this.handleStandButt = this.handleStandButt.bind(this);
	}


	shuffle(deck){
		var len = deck.length, temporaryValue, randomIndex;
		while(len != 0){
			randomIndex = Math.floor(Math.random() * len);
			len -= 1;
			temporaryValue = deck[len];
		    deck[len] = deck[randomIndex];
		    deck[randomIndex] = temporaryValue;

		}
		return deck;
	}

	getInitialState (deck){
		this.setState({deck: shuffle(this.deck)})
	}


	getScore(hand){
		
		var n = hand.length;
		var score = 0;
		var hasAce = false;
		for(var i = 0; i < n; i++){
			score += hand[i].v;
			if(hand[i].v == 11){
				hasAce = true;
			}
		}
		if(score > 21 && hasAce){
			score -= 10;
		}

		return score;
	}

	handleDealButt(){
		console.log("hit Deal");
		var deck = this.state.deck;
		// var nexdeck = []
		// if(deck.length < 5){
		// 	var size = deck.length;
		// 	while(size > 0){
		// 		size -= 1;
		// 		nexdeck.push(deck.pop());
		// 	}
		// }
		var card1 = deck.pop();
		var card2 = deck.pop();
		var card3 = deck.pop();
		var card4 = deck.pop();
		
		var newplayer = [];
		newplayer.push(card1);
		newplayer.push(card2);
		var newdealer = [];
		newdealer.push(card3);
		// nexdeck.push(card1);
		// nexdeck.push(card2);
		// nexdeck.push(card4);
		// nexdeck.push(card4);
		
		this.setState({
			player: newplayer,
			dealer: newdealer,
			deck: deck,
			status: "playing",
		});

	}

	handleHitButt(){
		console.log("hit Hit!");
		var deck = this.state.deck;
		var newStatus = this.state.status;
		var playerHand = this.state.player;
		playerHand.push(deck.pop());
		var newPlayerscore = this.getScore(playerHand);
		if(newPlayerscore < 21 && playerHand.length == 5)
            newStatus = "win";
        if(newPlayerscore > 21)
            newStatus = "lose";
        this.setState({
            player :  playerHand,
            playerscore: newPlayerscore,
            deck : deck,
            status : newStatus
        });
	}

	handleStandButt(){
		var dealerHand = this.state.dealer;
		var deck = this.state.deck;


		var dealerScore = this.getScore(dealerHand);
        var playerScore = this.getScore(this.state.player);
        var dealerHasCharlie = false;

        // compute game status while dealing cards to the dealer
        while (dealerScore < playerScore || dealerScore <= 17) {

            // deal a card
            dealerHand.push(deck.pop());
            dealerScore = this.getScore(dealerHand);

            if(dealerScore < 21 && dealerHand.length == 5){
                // five card charlie
                dealerHasCharlie = true;
                break;
            }

        }
        this.setState({
            dealer :  dealerHand,
            deck : deck,
            // compute game status
            status : (dealerScore < 21 || dealerHasCharlie) ? 'lose' : 'win'
        });
	}


	render(){
		return(	
				<div>
				<Hand
                    showDeck={true}
                    hand={this.state.dealer}
                    />
                <Interface
                    playerscore={this.getScore(this.state.player)}
                    dealerscore={this.getScore(this.state.dealer)}
                    deal={this.handleDealButt}
                    hit={this.handleHitButt}
                    stand={this.handleStandButt}
                    status={this.state.status}
                    />
                <Hand
                    hand={this.state.player}
                    />
			
                </div>
		
		);
	}



}