"use strict";

let _lastMoveInfo = {
    moves: null,
    player: null,
    tile: null,
    actionType: null
};

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


function updatePlayerProperties(gameInfo) {
    gameInfo.players.forEach(player => {
        if (player.name === loadFromStorage("name")) {
            _playerProperties = player.properties;
        }
    });
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
function findGameByID(allGames, id) {
    for (const game of allGames) {
        if (game.id === id) {
            return game;
        }
    }
    throw new Error("There is no game with this code");
}

function nameToId(name) {
    return name.toLowerCase().replace(/\s/g, "-");
}

// switch case where all possible actions on the tiles
function seeWhatActionThatNeedsToBeTaken(response) {
    _lastMoveInfo.moves.forEach(move => {
        switch (move.actionType) {
            case "rent":
                if (!loadFromStorage("inventory").includes(nameToId(getLastTile(response).tile))) {
                    removeHiddenClassToPayRentDiv();
                }
                break;
            case "jailed":
                document.querySelector("#card-description").classList.remove("hidden");
                document.querySelector("#card-description").insertAdjacentHTML("beforeend", `<p>You are in jail!</p>`);
                break;
            case "go":
                document.querySelector("#card-description").classList.remove("hidden");
                document.querySelector("#card-description").insertAdjacentHTML("beforeend", `<p>${move.description}</p>`);
                break;
            default:
                if (_lastMoveInfo.actionType === "buy") {
                    document.querySelector(`#buy-property-popup`).classList.remove("hidden");
                } else {
                    document.querySelector("#card-description").classList.remove("hidden");
                    document.querySelector("#card-description").insertAdjacentHTML("beforeend", `<p>${move.description}</p>`);
                }
        }
    });
}

function goToPlayerPosition(playerName) {
    removeTemplateContents("#cards-parent article");
    let currentTileName = null;
    // Find the current tile of the player
    _gameState.players.forEach(function (player) {
        if (player.name === playerName) {
            currentTileName = player.currentTile;
            if (playerName === loadFromStorage("name")){
                hideElement(_$containers.backToCurrentPositionButton);
            }else{
                showElement(_$containers.backToCurrentPositionButton);
            }
        }

    });
    // Find that tile in localStorage
    findTileId(currentTileName);
}

function updateLastMoveInfo(gameInfo) {
    _lastMoveInfo = {
        moves: getLastMove(gameInfo).moves,
        player: getLastMove(gameInfo).player,
        tileName: getLastTile(gameInfo).tile,
        actionType: getLastTile(gameInfo).actionType
    };
}

function hidePopupCardDescription() {
    document.querySelector("#card-description").classList.add("hidden");
    document.querySelector("#card-description").innerText = "";
}
function getLastMove(gameInfo) {
    const indexOfLastMove = gameInfo.turns.length - 1;
    return gameInfo.turns[indexOfLastMove];
}

function getLastTile(gameInfo) {
    const indexOfLastMove = gameInfo.turns.length - 1;
    const lastMove = (gameInfo.turns[indexOfLastMove]);
    const allTilesInLastMove = lastMove.moves;
    const indexOfLastTile = allTilesInLastMove.length - 1;
    return allTilesInLastMove[indexOfLastTile];
}


function findTileId(tileName) {
    loadFromStorage("tiles").forEach(function (tile) {
        if (tile.name === tileName) {
            _tempPlayerPositionID = tile.position;
            _playerPositionID = tile.position;
            getCardById(tile.position);
        }
    });
}

function getPlayerBalance(gameInfo) {
    let balance = 0;
    gameInfo.players.forEach(player => {
        if (player.name === loadFromStorage("name")) {
            balance = player.money;
        }
    });
    return balance;
}


function showElement($element){
    $element.classList.remove("hidden");
}

function hideElement($element){
    $element.classList.add("hidden");
}
