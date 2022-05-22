"use strict";
let _playerProperties;

function pollingGameState() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            if (document.querySelector("body").id === "main-screen"){
                console.log(currentGameInfo)
                checkMainPage(currentGameInfo);
            }
            checkGameStateAfterTurn(currentGameInfo);
            checkIfBought(currentGameInfo);
            checkIfPlayerBankrupt(currentGameInfo);
            checkIfPlayerWon(currentGameInfo);
            saveToStorage("gameState", currentGameInfo);
            setTimeout(pollingGameState, 1000);
        });
}
function checkMainPage(currentGameInfo){
    checkIfPlayerAuction(currentGameInfo);
    checkPlayerBalance(currentGameInfo);
    checkIfPlayerOnTile(currentGameInfo);
    console.log("test")
    checkAmountOfJailFreeCards(currentGameInfo);
    checkIfPlayerCanRoll(currentGameInfo);
}

function checkGameStateAfterTurn(newGameState) {
    if (newGameState.currentPlayer !== loadFromStorage("gameState").currentPlayer) {
        checkIfAPlayerThrewDouble(newGameState);
        checkIfPlayerNeedsToReceiveRent(newGameState);
        renderOutOfJailOptions(newGameState);
    }
}

function checkIfPlayerHasFreeCards(gameInfo) {
    if (getPlayer(gameInfo).getOutOfJailFreeCards > 0) {
        _$containers.jailFreeButton.disabled = false;
        _$containers.jailFreeButton.classList.remove("disabled");
    }
}

function renderOutOfJailOptions(gameInfo) {
    _$containers.jailFreeButton.classList.add("disabled");
    _$containers.jailFreeButton.disabled = true;
    if (checkIfPlayerJailed(gameInfo) && gameInfo.currentPlayer === loadFromStorage("name")){
        showElement(document.querySelector("#get-out-of-jail-popup"));
        checkIfPlayerHasFreeCards(gameInfo);
    } else {
        hideElement(document.querySelector("#get-out-of-jail-popup"));
    }
}

function checkAmountOfJailFreeCards(gameInfo) {
    gameInfo.players.forEach(player => {
        document.querySelector(`footer #${player.name} .jail-free-card-amount`).innerText = player.getOutOfJailFreeCards;
    });
}

function checkIfCurrentTileBuyAble(gameInfo) {
    const currentTileName = loadFromStorage("currentTile");
    const currentTileAction = loadFromStorage("currentTileAction");
    const name = loadFromStorage("name");
    if (gameInfo.turns.length > 0) {
        if (isCurrentActionBuy(currentTileAction) && gameInfo.auction == null && gameInfo.currentPlayer === name && !playerHasTile(currentTileName)) {
            showElement(document.querySelector("#buy-property-popup"));
        }
    }
}

function playerHasTile(currentTileName) {
    return loadFromStorage("inventory").includes(nameToId(currentTileName));
}

function isCurrentActionBuy(currentTileAction) {
    return currentTileAction === "buy";
}

function checkIfAPlayerThrewDouble(gameInfo) {
    const diceOne = gameInfo.lastDiceRoll[0];
    const diceTwo = gameInfo.lastDiceRoll[1];

    if (diceOne === diceTwo) {
        addActionDescriptionToActivity(`${loadFromStorage("gameState").currentPlayer} just threw a double`);
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
        document.querySelector(`#${player.name} .balance`).innerText = `${player.money}`;
    });
}


function checkIfPlayerOnTile(gameInfo) {
    document.querySelectorAll(".player-pos").forEach(card => {
        card.querySelector("span").innerText = "";
        card.classList.add("hidden");
    });
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        console.log(player)
        // Checks if player is on a card that is currently shown on screen. (And filters out bankrupted players)
        if (document.querySelector(`#${nameToId(player.currentTile)}`) !== null && !player.bankrupt && document.querySelector("body").id !== "see-all-the-streets-with-owners") {
            renderPlayerOnTile(nameToId(player.currentTile), player.name);
        }
    });
}

function checkIfPlayerBankrupt(gameInfo) {
    gameInfo.players.forEach(player => {
        if (player.bankrupt) {
            if (player.name === loadFromStorage("name")) {
                loseGame();
            }
            renderPlayerBankrupt(player.name.toLowerCase());
        }
    });
}

function checkIfPlayerAuction(gameInfo) {
    if (gameInfo.auction !== null) {
        if (_$containers.auctionPopup.classList.contains("hidden")) {
            startAuction();
        }
        renderAuctionPopup(gameInfo);
    } else if (!_$containers.auctionPopup.classList.contains("hidden")) {
        endAuction();
    }
}

function checkIfPlayerWon(gameInfo) {
    if (gameInfo.winner === loadFromStorage("name")) {
        window.location.href = "win-screen.html";
    }
}

function checkIfPlayerNeedsToReceiveRent(gameInfo) {
    if (gameInfo.turns.length > 0 && loadFromStorage("gameState").currentPlayer !== loadFromStorage("name") && loadFromStorage("gameState").auction === null) {
        const currentTile = getCurrentTile(gameInfo);
        const inventory = loadFromStorage('inventory');
        if (inventory.includes(nameToId(currentTile.tile)) && currentTile.actionType !== "mortgage") {
            collectDebt(currentTile.tile, loadFromStorage("gameState").currentPlayer, loadFromStorage("name"));
        }
    } else {
        saveToStorage("rent", ``);
    }
}
