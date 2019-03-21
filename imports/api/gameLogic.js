import { Meteor } from "meteor/meteor";
import { Games } from "./games";

//in fact don't understand the matches.js so rewrite the game logic here
//temporarily ignore this
class GameLogin{
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

            )
        }
    }
}