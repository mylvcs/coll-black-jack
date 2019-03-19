import React from 'react';

import {Players} from './../api/players';

export default class Player extends React.Component {
  render() {
    return (
        //hit deal and it will count to 0
      <p key={this.props.player._id}>
        {this.props.player.name} has {this.props.player.score} point(s).
        <button onClick={() => {
          Players.update(this.props.player._id, {$inc: {score: 0}});
        }}>Deal</button>
      </p>
    );
  }
};

// Setup prop types. player should be a required object
Player.propTypes = {
  player: React.PropTypes.object.isRequired
};
