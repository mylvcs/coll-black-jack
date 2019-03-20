import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.publish('games', () => Games.find({}));
}

Meteor.methods({
  'games.add': function () {
  	console.log("12 in games api");
    const id = Meteor.userId();
    console.log(id)
    if (!id) {
      throw new Meteor.Error('Not authorized');
    }

    Games.upsert(
      { id: Meteor.userId() },
      {
        id,
        status: 'waiting',
        player1_id: Meteor.userId(),
        player1_user: Meteor.user().username,
        player2_id: null,
        player2_user: null,
        date: new Date(),
      },
    );

    const game = Games.findOne({ id });
    console.log(game);
    return game;
  },
  'games.update': function (id) {
  	console.log(id)
    const game = Games.find({ id }).fetch();
    console.log(game)
    console.log(Meteor.user())
    Games.update(game[0]._id, {
      status: 'playing',
      player2_id: Meteor.userId(),
      player2_user: Meteor.user().username,
    });
    console.log(game[0]);
    return game[0]._id;
  },
  'games.findById': function (id) {
    const exist = Games.find({ id: Meteor.userId() }).fetch();
    return exist;
  },
  'games.remove': function (id) {
    Games.remove(id);
  },
  'games.find': function () {
    const game = Games.find({
      $or: [{ player1_id: Meteor.userId() }, { player2_id: Meteor.userId() }],
    }).fetch();
    return game;
  },
});