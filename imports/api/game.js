import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {gameLogic} from './gameLogic.js'
import { Meteor } from 'meteor/meteor';

Games = new Mongo.Collection("games");
Meteor.methods({
    "games.play"(){
        const game = Games.findOne({status: "waiting"});

        if (game === undefined){
            gameLogic.newGame();
        }else if (game !== undefined && game.player1 !== this.userId && game.player2 === ""){
            gameLogic.joinGame(game);
        }
    },
    //我觉得这里需要知道是谁翻牌 是我还是我的partner还是dealer
    "games.maketurn"(turn){
        check(turn, String);

        let game = Games.findOne({status: this.userId});

        if (game!== undefined){
            //makeTurn函数
            gameLogic.makeTurn(turn);
            
            if (gameLogic.checkIfGameswasWon()){
                gameLogic.setGameResult(game._id, this.userId);
            }else {
               gameLogic.updateTurn(game);
            }
        }
    }
});