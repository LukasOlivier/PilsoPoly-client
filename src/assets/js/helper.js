"use strict";

/* put the players with their owning streets in to a dictionary. the name as a key value and the street as a list*/
function linkPlayersAndStreets(players) {
    players.forEach(player => {
        const playerName = player.name;
        const playerStreets = [];
        playerStreets.push(player.properties.forEach(property => playerStreets.push(property.property.toLowerCase().replace(/\s/g, '-'))));
        _playersBoughtProperties[playerName] = playerStreets;
    });
    saveToStorage("playerProperties", _playersBoughtProperties);
}

// This function finds a game with a specific ID in an array of games.
function findGameByID(allGames, id){
    for(let game of allGames){
        if(game.id === id){
            console.log('found with id ' + id);
            return game;
        }
    }
    throw new Error("There is no game with this code(2)")
}
