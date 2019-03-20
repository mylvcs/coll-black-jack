import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Matches } from '../api/matches';
import { Games } from "../api/games.js";
import Interface from './Interface.js';
import { withTracker } from 'meteor/react-meteor-data';

import Hand from './Hand.js';

class TableForTwo extends Component{
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
        	status1: "",
        	status2: "",
        	player1score: 0,
        	player2score: 0,
        	dealerscore: 0,
        	dealer: [],
        	turn: "player1",
        	start: false,
        	status: "ready",
        	count: 0,
        	gameId: null

		};		
		this.handleDealButt1 = this.handleDealButt1.bind(this);
		this.handleHitButt1 = this.handleHitButt1.bind(this);
		this.handleStandButt1 = this.handleStandButt1.bind(this);
		this.handleDealButt2 = this.handleDealButt2.bind(this);
		this.handleHitButt2 = this.handleHitButt2.bind(this);
		this.handleStandButt2 = this.handleStandButt2.bind(this);
		this.renderDealerCard = this.renderDealerCard.bind(this);
		this.renderPlayer1button = this.renderPlayer1button.bind(this);
		this.renderPlayer2button = this.renderPlayer2button.bind(this);
		this.shuffle(this.state.deck);
	}

	componentDidMount() {
    
	    this.getCurrentGame();
	  }

	  componentDidUpdate() {
	
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
	getCurrentGame() {
	    const { id } = this.props;
	    const g = Games.find({ id: { $ne: id } }).fetch();
	    const actg = g[g.length - 1];
	    console.log(actg);
	    if (actg.player2_id === null) {
	      
	      const params = {
	        gameId: actg._id,
	        id1: actg.player1_id,
	        id2: actg.player2_id,
	        user1: actg.player1_user,
	        user2: actg.player2_user,
	        currentPlayer: this.state.turn,
	        player1: this.state.player1,
	        player2: this.state.player2,
	        player1score: this.state.player1score,
	        player2score: this.state.player2score
	      };
	      Meteor.call("matches.add", params, (err, match) => {
	        if (err) {
	          alert(err);
	        }
	        console.log(match)
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
	        this.renderDealerCard();
	      });
	    }
	  }
	renderDealerCard(){
		var deck = this.state.deck;
		
		var card1 = deck.pop();
		var newdealer = [];
		newdealer.push(card1);
		this.setState({
			dealer: newdealer,
			deck: deck
		});
		
		
		
		console.log(this.state.dealer);
		this.renderPlayer1button();


	}
	renderPlayer1button(){
		return(
			<div>
			<Interface
                    player1score={this.getScore(this.state.player1)}
                    dealerscore={this.getScore(this.state.dealer)}
                    deal={this.handleDealButt1}
                    hit={this.handleHitButt1}
                    stand={this.handleStandButt1}
                    status={this.state.status1}
                    />
            </div>
			);
	}

	renderPlayer2button(){
			return(
				<div>
				<Interface
	                    player1score={this.getScore(this.state.player2)}
	                    dealerscore={this.getScore(this.state.dealer)}
	                    deal={this.handleDealButt2}
	                    hit={this.handleHitButt2}
	                    stand={this.handleStandButt2}
	                    status={this.state.status2}
	                    />
	            </div>
				);
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

	handleHitButt1(){
		var deck = this.state.deck;
		var newStatus = this.state.status1;
		var playerHand = this.state.player1;
		playerHand.push(deck.pop());
		var newPlayerscore = this.getScore(playerHand);
		if(newPlayerscore < 21 && playerHand.length == 5)
            newStatus = "win";
        if(newPlayerscore > 21)
            newStatus = "lose";
        this.setState({
            player1:  playerHand,
            playerscore1: newPlayerscore,
            deck : deck,
            status1 : newStatus
        });
	}
	handleHitButt2(){
		var deck = this.state.deck;
		var newStatus = this.state.status2;
		var playerHand = this.state.player2;
		playerHand.push(deck.pop());
		var newPlayerscore = this.getScore(playerHand);
		if(newPlayerscore < 21 && playerHand.length == 5)
            newStatus = "win";
        if(newPlayerscore > 21)
            newStatus = "lose";
        this.setState({
            player2:  playerHand,
            playerscore1: newPlayerscore,
            deck : deck,
            status2 : newStatus
        });
	}
	handleDealButt1(){
		
		
		
		var deck = this.state.deck;
		var card1 = deck.pop();
		var card2 = deck.pop();
		var newplayer = [];
		newplayer.push(card1);
		newplayer.push(card2);
		
		this.setState({
			player1: newplayer,
			deck: deck
		});

	}
	handleDealButt2(){
		
		
		var deck = this.state.deck;
		
		var card1 = deck.pop();
		var card2 = deck.pop();
		
		
		var newplayer = [];
		newplayer.push(card1);
		newplayer.push(card2);
		
		this.setState({
			player2: newplayer,
			deck: deck
		});

	}
	handleStandButt1(){
		this.renderPlayer1button();
	}
	handleStandButt2(){
		var dealerHand = this.state.dealer;
		var deck = this.state.deck;


		var dealerScore = this.getScore(dealerHand);
        var player1Score = this.getScore(this.state.player1);
        var player2Score = this.getScore(this.state.player2);
        var dealerHasCharlie = false;

        
        while ( (dealerScore < player1Score && dealerScore < player2Score)
        	|| dealerScore <= 17) {

            dealerHand.push(deck.pop());
            dealerScore = this.getScore(dealerHand);

            if(dealerScore < 21 && dealerHand.length == 5){
                
                dealerHasCharlie = true;
                break;
            }

        }
        this.setState({
            dealer :  dealerHand,
            deck : deck,
            
            status1 : (dealerScore > player1Score || dealerHasCharlie) ? 'lose' : 'win',
            status2 : (dealerScore > player2Score || dealerHasCharlie) ? 'lose' : 'win'
	})}
	render(){
		return (
			<div>
				<h1>testing</h1>
			</div>
			
		);
	}
}

export default withTracker(() => {
  Meteor.subscribe("matches");
  return {
    match: Matches.find({}).fetch()
  };
})(TableForTwo);