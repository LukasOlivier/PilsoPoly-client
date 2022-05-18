"use strict";

function pollingGameState() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            checkGameStates(currentGameInfo);
            _gameState = currentGameInfo;
            setTimeout(pollingGameState, 1000);
            checkIfPlayerWon(currentGameInfo);
            checkIfBought(currentGameInfo);
            checkIfPlayerAuction(currentGameInfo);
        });
}



function checkGameStates(newGameState) {
    // if your on the map screen, all the other checks are not needed.
   if (JSON.stringify(newGameState) !== JSON.stringify(_gameState)) {
        if (newGameState.currentPlayer !== _gameState.currentPlayer) {
            checkIfPlayerCanRoll(newGameState);
            checkIfPlayerNeedsToPayRent(newGameState);
        }
        checkIfPlayerOnTile(newGameState);
        checkPlayerBalance(newGameState);
        checkIfPlayerBankrupt(newGameState);
        checkIfPlayerWon(newGameState);
        checkIfPlayerAuction(newGameState);
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

function checkIfPlayerAuction(gameInfo) {
    if (gameInfo.auction !== null) {
        renderAuctionPopup(gameInfo);
        showAuctionPopup();
    } else {
        hideAuctionPopup();
    }
}

function checkIfPlayerWon(gameInfo) {
    if (gameInfo.winner === loadFromStorage("name")) {
        window.location.href = "win-screen.html";
    }
}

function checkIfPlayerNeedsToPayRent(gameInfo) {
    if (gameInfo.turns.length !== 0 && _lastMoveInfo.player !== loadFromStorage("name")) {
        const inventory = loadFromStorage('inventory');
        if (inventory.includes(nameToId(getLastTile(gameInfo).tile))) {
            collectDebt(getLastTile(gameInfo).tile, getLastPlayer(gameInfo), loadFromStorage("name"));
        }
    } else {
        saveToStorage("rent", ``);
    }
}
