"use strict";
let _playerProperties;
let _player;

function pollingGameState() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            updatePlayerInfo(currentGameInfo);
            checkGameStates(currentGameInfo);
            checkPlayerBalance(currentGameInfo);
            checkIfPlayerOnTile(currentGameInfo);
            _gameState = currentGameInfo;
            setTimeout(pollingGameState, 2000);
        });
}
function updatePlayerInfo(gameInfo) {
    gameInfo.players.forEach(player => {
        if (player.name === loadFromStorage("name")) {
            _player = player;
        }
    });
    return null;
}

function checkIfPlayerHasFreeCards() {
    if (_player.getOutOfJailFreeCards > 0) {
        _$containers.jailFreeButton.disabled = false;
        _$containers.jailFreeButton.classList.remove("disabled");
    }
}

function checkIfPlayerJailed(gameInfo) {
    _$containers.jailFreeButton.classList.add("disabled");
    _$containers.jailFreeButton.disabled = true;
    if (_player.jailed && gameInfo.currentPlayer === _player.name) {
        showElement(document.querySelector("#get-out-of-jail-popup"));
        checkIfPlayerHasFreeCards();
    } else {
        hideElement(document.querySelector("#get-out-of-jail-popup"));
    }
}

function checkIfCurrentTileBuyAble(gameInfo) {
    const currentTileName = loadFromStorage("currentTile");
    const currentTileAction = loadFromStorage("currentTileAction");
    if (gameInfo.turns.length > 0){
        if (currentTileAction === "buy" && gameInfo.currentPlayer === loadFromStorage("name") && !loadFromStorage("inventory").includes(nameToId(currentTileName))){
            showElement(document.querySelector("#buy-property-popup"));
        }
    }
}


function checkGameStates(newGameState) {
    // if your on the map screen, all the other checks are not needed.
    if (JSON.stringify(newGameState) !== JSON.stringify(_gameState)) {
        updatePlayerProperties(newGameState);
        checkIfPlayerWon(newGameState);
        checkIfBought(newGameState);
        checkIfPlayerJailed(newGameState);
        checkIfPlayerBankrupt(newGameState);
        checkIfPlayerWon(newGameState);
        checkIfPlayerJailed(newGameState);
        if (newGameState.currentPlayer !== _gameState.currentPlayer) {
            checkIfPlayerCanRoll(newGameState);
            checkIfPlayerNeedsToReceiveRent(newGameState);
        }
    }
}

function checkIfBought(gameInfo) {
    document.querySelectorAll('.square').forEach(square => square.classList.add("not-bought"));
    gameInfo.players.forEach(player => {
        player.properties.forEach(property => {
            // in case no properties are bought yet, property is 'null'
            if (property !== null) {
                const $propertyCard = document.querySelector(`#${nameToId(property.property)}`);
                const $propertyCardFooter = document.querySelector(`#${player.name} .${nameToId(property.property)}`);
                // $propertyCard doesn't need to be checked because the footer is always rendered in
                // Is the card mortgaged? Else render it as bought.
                if (property.mortgage && $propertyCardFooter !== null) {
                    renderMortgagedFooter(nameToId(property.property), player.name.toLowerCase());
                } else if ((!property.mortgage && $propertyCardFooter !== null)) {
                    renderBoughtFooter(nameToId(property.property), player.name.toLowerCase());
                }
                // $propertyCard !== null checks if the bought card is currently rendered in
                // Is the card mortgaged? Else render it as bought.
                if ($propertyCard !== null && property.mortgage) {
                    renderMortgagedMain($propertyCard, player.name);
                } else if ($propertyCard !== null) {
                    renderBoughtMain($propertyCard, player.name);
                    checkIfHousesBoughtMain(gameInfo);
                }
            }
        });
    });
}

function checkIfHousesBoughtMain(gameInfo) {
    gameInfo.players.forEach(player => {
        player.properties.forEach(property => {
            const $currentCard = document.querySelector(`#${nameToId(property.property)}`);
            if ($currentCard !== null) {
                if (property.houseCount > 0) {
                    $currentCard.querySelector(`li:nth-of-type(${property.houseCount}) img`).src = `images/${property.houseCount}houseBought.png`;
                }
                if (property.hotelCount > 0) {
                    $currentCard.querySelector('li:nth-of-type(5) img').src = "images/hotelBought.png";
                }
            }
        });
    });
}

function checkPlayerBalance(gameInfo) {
    gameInfo.players.forEach(function (player) {
        document.querySelector(`#${player.name} .player-balance`).innerText = `${player.name}: ${player.money}`;
    });
}

function checkIfPlayerOnTile(gameInfo) {
    document.querySelectorAll(".player-pos").forEach(card => {
        card.querySelector("span").innerText = "";
        card.classList.add("hidden");
    });
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        // Checks if player is on a card that is currently shown on screen. (And filters out bankrupted players)
        if (document.querySelector(`#${nameToId(player.currentTile)}`) !== null && !player.bankrupt && document.querySelector("body").id !== "see-all-the-streets-with-owners") {
            renderPlayerOnTile(nameToId(player.currentTile), player.name);
        }
    });
}

function checkIfPlayerBankrupt(gameInfo) {
    gameInfo.players.forEach(player => {
        if (player.bankrupt) {
            renderPlayerBankrupt(player.name.toLowerCase());
        }
    });
}

function checkIfPlayerWon(gameInfo) {
    if (gameInfo.winner === loadFromStorage("name")) {
        window.location.href = "win-screen.html";
    }
}

function checkIfPlayerNeedsToReceiveRent(gameInfo) {
    if (gameInfo.turns.length > 0 && _gameState.currentPlayer !== loadFromStorage("name")) {
        const currentTile = getCurrentTile(gameInfo);
        const inventory = loadFromStorage('inventory');
        if (inventory.includes(nameToId(currentTile.tile)) && currentTile.actionType !== "mortgage") {
            collectDebt(currentTile.tile, _gameState.currentPlayer, loadFromStorage("name"));
        }
    } else {
        saveToStorage("rent", ``);
    }
}
