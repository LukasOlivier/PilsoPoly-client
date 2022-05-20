"use strict";

let _currentMoveInfo = {
    moves: "",
    player: "",
    tileName: "",
    actionType: ""
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
    _currentMoveInfo.moves.forEach(move => {
        if (move.actionType === "rent") {
            checkIfPlayerNeedsToPayRent(move,response);
        }else{
            addActionDescriptionToActivity(move.description);
        }
    });
    checkIfCurrentTileBuyAble(response);
}

function checkIfPlayerNeedsToPayRent(move,response) {
    if(!loadFromStorage("inventory").includes(nameToId(getCurrentTile(response).tile))){
        addActionDescriptionToActivity(move.description);
    }else {
        addActionDescriptionToActivity("You own this property");
    }
}

function addActionDescriptionToActivity(actionDescription) {
    document.querySelector("#activity").insertAdjacentHTML("afterbegin", `<li><p>${actionDescription}</p></li>`);

}

function goToPlayerPosition(playerName) {
    removeTemplateContents("#cards-parent article");
    let currentTileName = null;
    // Find the current tile of the player
    _gameState.players.forEach(function (player) {
        if (player.name === playerName) {
            currentTileName = player.currentTile;
            if (playerName === loadFromStorage("name")) {
                hideElement(_$containers.backToCurrentPositionButton);
            } else {
                showElement(_$containers.backToCurrentPositionButton);
            }
        }

    });
    // Find that tile in localStorage
    findTileId(currentTileName);
}

function updateCurrentMoveInfo(gameInfo) {
    if (gameInfo.turns.length !== 0) {
        _currentMoveInfo = {
            moves: getCurrentMove(gameInfo).moves,
            player: getCurrentMove(gameInfo).player,
            tileName: getCurrentTile(gameInfo).tile,
            actionType: getCurrentTile(gameInfo).actionType
        };
        saveToStorage("currentTile", _currentMoveInfo.tileName);
        saveToStorage("currentTileAction", _currentMoveInfo.actionType);
    }
}

function getCurrentMove(gameInfo) {
    const indexOfLastMove = gameInfo.turns.length - 1;
    return gameInfo.turns[indexOfLastMove];
}

function getCurrentTile(gameInfo) {
    if (getCurrentMove(gameInfo) !== undefined) {
        const allTilesInLastMove = getCurrentMove(gameInfo).moves;
        const indexOfLastTile = allTilesInLastMove.length - 1;
        return allTilesInLastMove[indexOfLastTile];
    }
    return null;
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

function getTaxSystem(gameInfo) {
    let taxSystem;
    gameInfo.players.forEach(player => {
        if (player.name === loadFromStorage("name")) {
            taxSystem = player.taxSystem;
        }
    });
    return taxSystem;
}

function addPropertyToInventory(tile) {
    const currentInventory = loadFromStorage('inventory');
    currentInventory.push(nameToId(tile));
    saveToStorage("inventory",currentInventory);
}

function toggleElementHidden($element){
    $element.classList.toggle("hidden");
}

function showElement($element) {
    $element.classList.remove("hidden");
}

function hideElement($element) {
    $element.classList.add("hidden");
}

function showErrorPopup(errorMessage) {
    document.querySelector(".errormessages").classList.remove("hidden");
    document.querySelector(".errormessages p").innerText = errorMessage;
}

function hideErrorPopup() {
    document.querySelector(".errormessages").classList.add("hidden");
}
