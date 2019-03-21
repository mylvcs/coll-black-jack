import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Matches = new Mongo.Collection('matches');



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
        
        
        console.log('params', params);
        actg = Matches.findOne(params.gameId);
        console.log('matches found', actg);
        console.log(actg)
        console.log(params.gameId);
        Matches.update(params.gameId, {
            $set: {
                player2_id: params.id2,
                player2_user: params.user2,
                status: 'onGame',
            },
        });
        const match = Matches.findOne(params.gameId);
        console.log(match);
        return match;
    },
    'matches.update': (id, dealer,player1, player2) =>{
        const match = Matches.findOne(id);
        console.log(84 + "in matches.js")
        console.log(match)
        Matches.update(id, {
            $set:{
                dealer: dealer,
                player1: player1,
                player2: player2
            }
        })
        console.log(93)
        console.log(Matches.findOne(id))
    }
    
});