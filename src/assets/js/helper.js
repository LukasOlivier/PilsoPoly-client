"use strict";

/* put the players with their owning streets in to a dictionary. the name as a key value and the street as a list*/
function linkPlayersAndStreets(players) {
    const playersBoughtProperties = {};
    players.forEach(player => {
        const playerName = player.name;
        const playerStreets = [];
        player.properties.forEach(function (property) {
            playerStreets.push(createCardInfo(property));
        });
        playersBoughtProperties[playerName] = playerStreets;
    });
    saveToStorage("playerProperties", playersBoughtProperties);
}

function createCardInfo(property) {
    const info = {name: null, cost: null, rent: null};
    loadFromStorage("tiles").forEach(function (tile) {
        if (tile.name === property.property) {
            info.name = tile.name;
            info.cost = tile.cost;
            info.rent = tile.rent;
            info.mortgage = property.mortgage;
            info.houseCount = property.houseCount;
            info.hotelCount = property.hotelCount;
        }
    });
    return info;
}

function removeTemplate(container) {
    const $articles = document.querySelectorAll(container);
    $articles.forEach((article) => {
        article.remove();
    });
}

// This function finds a game with a specific ID in an array of games.
function findGameByID(allGames, id){
    for (const game of allGames){
        if (game.id === id){
            return game;
        }
    }
    throw new Error("There is no game with this code(2)");
}

function nameToId(name){
    return name.toLowerCase().replace(/\s/g, "-");
}

