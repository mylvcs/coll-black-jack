import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Matches = new Mongo.Collection('matches');

const sizeBoard = 6;

if (Meteor.isServer) {
    Meteor.publish('matches', () => Matches.find({}));
}

Meteor.methods({
    'matches.add': (params) => {
        console.log(params)
        const {
            /*
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
            *
            */
            gameId: game, id1, id2, user1, user2, currentPlayer, dealer, player1,
            player2, player1score, player2score
        } = params;
        const { _id: gameId } = game;
        console.log(game);
        if (!game) {
            throw new Meteor.Error('Not authorized');
        }

        

        try {
            Matches.insert({
                _id: game,
                status: 'waiting',
                dealer: dealer,
                player1_id: id1,
                player1_user: user1,
                player2_id: id2,
                player2_user: user2,
                current_player: currentPlayer,
                player1: player1,
                player2: player2,
                player1score: player1score,
                player2score: player2score
            });
        }
        catch (err) { }
        const match = Matches.findOne(game);
        console.log(match)
        return match;
    },
    'matches.join': (params) => {
        console.log('*********');
        const { gameId, id2, user2 } = params;
        console.log('params', params);
        actg = Matches.findOne(gameId);
        console.log('matches found', actg);
        Matches.update(gameId, {
            $set: {
                player2_id: id2,
                player2_user: user2,
                status: 'onGame',
            },
        });
        const match = Matches.findOne(gameId);
        console.log('updated match', match);
        return match;
    }
    
});