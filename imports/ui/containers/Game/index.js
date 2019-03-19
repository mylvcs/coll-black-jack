import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
//import Lobby from '../../components/Lobby/index';
import Game from '../../components/Game/index';
import { Meteor } from 'meteor/meteor'
class Home extends React.Component{
	constructor(props) {
        super(props);

        this.state = {
            game: null,
        }
        this.changeGame = this.changeGame.bind(this);
    }


    Load(props) {
        const id = props.game
        const game = props.onGame

        if (id == null) {
            //return <Lobby onGame={game} />
        }
        else {
            //return <Game onGame={game} id={id} />
        }
    }

    changeGame(change) {
        this.setState({
            game: change
        });
    }




    render() {
        return <div>
            { Meteor.user() ?
                //<this.Load game={this.state.game} onGame={this.changeGame} />
                //<Game/>
                <div>
			  		<h1>Expecting HomePage</h1>
			  	</div>
                :
                <div>
                    <h1>please log in to play</h1>
                </div>
            }
        </div>
    }



}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Home)