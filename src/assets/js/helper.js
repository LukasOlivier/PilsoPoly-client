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

function removeTemplateContents(container) {
    const $elements = document.querySelectorAll(container);
    $elements.forEach((element) => {
        element.remove();
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

// switch case where all possible actions on the tiles
function seeWhatActionThatNeedsToBeTaken(lastMove){
    lastMove.forEach(move => {
        switch (move.description) {
            case "can buy this property in direct sale":
                makeBuyPopupNotHidden();
                break;
            case "has to go to jail":
                console.log("je moet naar het gevang");
                break;
            case "passes 'GO!' and receives 200 for it":
                console.log("you receive 200 flappen e niffow");
                break;
            case "should pay rent":
                removeHiddenClassToPayRentDiv();
                break;
            default:
                console.log(move.description);
        }
    });
}

function getLastMove(response) {
    return response.turns.slice(-1)[0].moves;
}

function getLastTile(response) {
    return getLastMove(response).slice(-1)[0].tile;
}

function findTileId(tileName){
    loadFromStorage("tiles").forEach(function (tile) {
        if (tile.name === tileName) {
            _tempPlayerPositionID = tile.position;
            _playerPositionID = tile.position;
            getCardById(tile.position);
        }
    });
}
