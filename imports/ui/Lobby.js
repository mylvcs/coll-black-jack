import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Games } from '../api/games.js';

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
