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
function seeWhatActionThatNeedsToBeTaken(response){
    const lastMove = getLastMove(response)
    console.log(lastMove)
    const lastActionType = getLastTile(response).actionType;
    lastMove.forEach(move => {
        switch (move.actionType) {
            case "rent":
                if (!inventory.includes(getLastTile(gameInfo).tile)) {
                    removeHiddenClassToPayRentDiv();
                }
                break;
            case "jailed":
                document.querySelector("#card-description").classList.remove("hidden");
                document.querySelector("#card-description").insertAdjacentHTML("beforeend", `<p>You are in jail!</p>`);
                setTimeout(hidePopup,8000);
                break;
            case "already owns this property":
                break;
            default:
                if (lastActionType === "buy"){
                    makeBuyPopupNotHidden();
                }else{
                    document.querySelector("#card-description").classList.remove("hidden");
                    document.querySelector("#card-description").insertAdjacentHTML("beforeend", `<p>${move.description}</p>`);
                    setTimeout(hidePopup,8000);
                }
        }
    });
}

function hidePopup(){
    document.querySelector("#card-description").classList.add("hidden");
    document.querySelector("#card-description").innerText = "";

}

function getLastMove(response) {
    return response.turns.slice(-1)[0].moves;
}

function getLastTile(response) {
    return getLastMove(response).slice(-1)[0];
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

function getPlayerBalance(gameInfo){
    let balance = 0;
    gameInfo.players.forEach(player => {
        if(player.name === loadFromStorage("name")){
            balance = player.money
        }
    })
    return balance
}
