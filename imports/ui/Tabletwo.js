import React , {Component} from 'react';

import Hand from './Hand.js';
import Interface from './Interface.js';

import { Games } from "../api/games.js";

export default class TableTwo extends React.Component{
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
        	player1: [],
        	player2: [],
        	playerscore1: 0,
        	playerscore2: 0,
        	dealerscore: 0,
        	dealer: [],
        	
        	status: "ready",
        	count: 0,
        	turn: 0

		};
		
		this.handleDealButt = this.handleDealButt.bind(this);
		this.handleHitButt = this.handleHitButt.bind(this);
		this.handleStandButt = this.handleStandButt.bind(this);
		this.getCurrentGame = this.getCurrentGame.bind(this);
		this.leaveGame = this.leaveGame.bind(this);
		
		this.shuffle(this.state.deck);

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

			//console.log(hand[i])
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

	getCurrentGame() {
	    const { id } = this.props;
	    const g = Games.find({ id: { $ne: id } }).fetch();
	    const actg = g[g.length - 1];
	    if (actg.player2_id === null) {
	      
	      
	      const params = {
	        gameId: id,
	        id1: actg.player1_id,
	        id2: actg.player2_id,
	        user1: actg.player1_user,
	        user2: actg.player2_user,
	        turn: 0
	      };
	      Meteor.call("matches.add", params, (err, match) => {
	        if (err) {
	          alert(err);
	        }
	        if (match) this.setState({ gameId: match._id });
	        console.log("Match added!");
	      });
	    } else {
	      // Start game
	      const params = {
	        gameId: id,
	        id2: actg.player2_id,
	        user2: actg.player2_user
	      };
	      Meteor.call("matches.join", params, (err, match) => {
	        if (err) {
	          alert(err);
	        }
	        console.log("Joined!");
	        console.log(match);
	        if (match) this.setState({ gameId: match._id });
	        this.renderBoard();
	      });
	    }
  	}


  	leaveGame() {
	    Meteor.call("games.remove", this.props.id);
	    this.props.onGame(null);
	  }

	handleDealButt(){
		
		
		
		console.log(this.state.deck)
		var newcount = this.state.count + 1;
		var deck = this.state.deck;
		
		var card1 = deck.pop();
		var card2 = deck.pop();
		var card3 = deck.pop();
		var card4 = deck.pop();
		//var newPlayerscore = this.state.playerscore + 1;
		var newplayer = [];
		newplayer.push(card1);
		newplayer.push(card2);
		var newdealer = [];
		newdealer.push(card3);
		
		this.setState({
			player: newplayer,
			dealer: newdealer,
			deck: deck,
			//playerscore: newPlayerscore,
			count: newcount
		});

	}

	handleHitButt(playerHand){
		var deck = this.state.deck;
		var newStatus = this.state.status;
		//var playerHand = this.state.player;
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

				// var scores = [];
				// var hands = [];
    //             for(var i = 0; i < this.state.player.length; i++){
    //             	scores.push(
                		// <Interface
	                 //    playerscore={this.getScore(this.state.player[i])}
	                 //    dealerscore={this.getScore(this.state.dealer)}
	                 //    deal={this.handleDealButt}
	                 //    hit={this.handleHitButt}
	                 //    stand={this.handleStandButt}
	                 //    status={this.state.status}
	                 //    />)
		  //           hands.push(
		                // <Hand
		                //     hand={this.state.player[i]}
		                //     />);
    //             }
    //             console.log(scores.length);
                
                
		return(	
				<div>
				<h1>console.log("167")</h1>
				<button onClick={this.leaveGame}> Leave Game? </button>
				<Hand
                    showDeck={true}
                    hand={this.state.dealer}
                    />
                 <Interface
	                    playerscore={this.getScore(this.state.player1)}
	                    dealerscore={this.getScore(this.state.dealer)}
	                    deal={this.handleDealButt}
	                    hit={this.handleHitButt}
	                    stand={this.handleStandButt}
	                    status={this.state.status}
	                    />)

				<Hand
	                    hand={this.state.player1}
	                    />;
                 <Interface
	                    playerscore={this.getScore(this.state.player2)}
	                    dealerscore={this.getScore(this.state.dealer)}
	                    deal={this.handleDealButt}
	                    hit={this.handleHitButt}
	                    stand={this.handleStandButt}
	                    status={this.state.status}
	                    />

				<Hand
	                    hand={this.state.player2}
	                    />;
                 

                
                </div>
                
		);
	}



}