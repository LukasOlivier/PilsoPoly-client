"use strict";

/* put the players with their owning streets in to a dictionary. the name as a key value and the street as a list*/
function linkPlayersAndStreets(players) {
    players.forEach(player => {
        const nameplayer = player.name;
        const playerStreets = [];
        playerStreets.push(player.properties.forEach(property => playerStreets.push(property.property)));
        _playersBoughtProperties[nameplayer] = playerStreets;
    });
    saveToStorage("playerProperties", _playersBoughtProperties);
}