import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Games } from '../api/games.js';
import {Template} from 'meteor/templating';

import {Session} from 'meteor/session';
//这里是我加的
Template.ui.onCreated(() => {
	Meteor.subscribe('Games');
})

Template.ui.events({
	"click #play-btn" : () =>{
		Session.set("inGame", true);
		Meteor.call("games.play");
		Meteor.subscribe('MyGame');
	}
})

Template.ui.helpers({
	inGame : () => {
		return Session.get("inGame");
	},
	status: () => {
		if (Session.get("inGame")){
			let myGame = Games.findOne();

			if (myGame.status === "waiting")
			return "Looking for the partner";
			else if (myGame.status=== Meteor.userId())
				return "Your turn";
				else if (myGame.status !== Meteor.userId() && myGame.status !== "end")
				return "partnes's turn";

				else if (myGame.result === Meteor.userId())
				return "You won!";
				else if (myGame.status === "end" && myGame.result !== Meteor.userId() && myGame.result !== "tie")
				return "You lost";
				else if (myGame.status === "tie")
				return "Your partner won!";
				else 
				return "";
		}
	}
});


//下面是没动
class Lobby extends React.Component {

	constructor(props) {
	    super(props);
	    this.joinGame = this.joinGame.bind(this);
	    this.changeGame = this.changeGame.bind(this);
	 }



	 createNewGame(e) {
	    e.preventDefault();

	    alert('new game created');

	    Meteor.call('games.add', (err, game) => {
	      if (err) {
	        alert(err);
	        return;
	      }
	      this.changeGame(game);
	    });
	  }
		
	 joinGame(id) {
	 	console.log(id);
	    Meteor.call('games.update', id, (err, game) => {
	      if (err) {
	        alert(err);
	        return;
	      }
	      this.changeGame(game);
	    });
	  }

	  changeGame(id) {
	    this.props.onGame(id);
	  }

	renderActiveGames() {
		return this.props.games.map((g, i) => (

		  <li key={i}>
		  	
		    <Button key={g.id} onClick={() => this.joinGame(g.id)}>
		      {g.player1_user}
		    </Button>
		  </li>
		));
		}

	render(){
		return(
			<div>
				<Button 
		            className="newGame-btt"
								onClick={this.createNewGame.bind(this)}  
		          >
		          	Create a new Game? 
		         </Button>
						 
						 
		          <div className="join">
		            <legend>
		              <h5>Or you can play a existing game with</h5>
		            </legend>
		            <div className="legend1">
		              <ul>{this.renderActiveGames()}</ul>
		            </div>
		            
		          </div>
			</div>	
		)
	}
}

Lobby.propTypes = {
  games: PropTypes.array.isRequired,
  onGame: PropTypes.func,
};

export default withTracker(() => {
	  Meteor.subscribe('games');
	  console.log("89 in lobby");
	  return {

	    games: Games.find({
	      status: 'waiting',
	      id: { $ne: Meteor.userId() }
	    }).fetch(),
	    if(match) {
    		console.log(96);
    		console.log(games)
    	}
	  };
})(Lobby);
