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