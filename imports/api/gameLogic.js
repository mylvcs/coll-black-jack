import { Meteor } from "meteor/meteor";
import { Games } from "./games";

//in fact don't understand the matches.js so rewrite the game logic here
//temporarily ignore this
class GameLogic{
    newGame(){
        if (!this.userIsAlreadyPlaying()){
            Game.insert({
                player1: Meteor.userId(),
                player2: "",
                status: 'waiting'
            })
        }
    }
    userIsAlreadyPlaying(){
        const game = Games.findOne({
            $or:[
                {player1 : Meteor.userId()},
                {player2 : Meteor.userId()}
            ]
        });
        if (game !== undefined)
            return true;
    
        return false;
    }

    joinGame (game){
        if (game.player2 === "" && Meteor.userId()!== undefined){
            Games.update(
                {_id : game._id}, 
                {$set: {
                    "player2": Meteor.userId(),
                    "status": game.player1
                }}
            );
        }
    }
    updateTurn(game){
        let nextPlayer;
        if (game.player1 === Meteor.userId())
            nextPlayer = game.player2;
        else 
            nextPlayer = game.player1;

        Games.update(
            {state : Meteor.userId()},
                {
                    $set: {
                        "status": nextPlayer
                    }
                }
        );
    }
    makeTurn(turn){
        Games.update(
            {status: Meteor.userId()},
            {
                $push : {
                    
                }
            }
        );
    }
    //TODO
    setGameResult (game, result){
        Games.update({_id : gameId}, 
        {$set: {
            "result": result, 
            "status" : "end"
        }}
        );
    }
    checkIfGameWasWon(){
        const game= Games.findOne({status : Meteor.userId()});
        //这里要怎么写。。TODO

        // if (game.status == )
    }
}

export const gameLogic = new GameLogic();