"use strict";
let _gameState = null;

function pollingGameState() {
    // This needs to be on a diff place for sure!!
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            checkGameStates(currentGameInfo);
            _gameState = currentGameInfo;
            setTimeout(pollingGameState, 2000);
        });
}

function checkGameStates(newGameState) {
    if (JSON.stringify(newGameState) !== JSON.stringify(_gameState)) {
        checkIfBought(newGameState);
        checkIfPlayerOnTile(newGameState);
        checkIfPlayerCanRoll(newGameState);
    }
}

function checkIfBought(gameInfo) {
    document.querySelectorAll('.square').forEach(square => square.classList.add("not-bought"));
    gameInfo.players.forEach(player => {
        player.properties.forEach(property => {
            // in case no properties are bought yet, property is 'null'
            if (property !== null) {
                const $propertyCard = document.querySelector(`#${nameToId(property.property)}`);
                const $propertyCardFooter = document.querySelector(`.${player.name} .${nameToId(property.property)}`);
                // $propertyCard doesn't need to be checked because the footer is always rendered in
                // Is the card mortgaged? Else render it as bought.
                if (property.mortgage && $propertyCardFooter !== null) {
                    renderMortgagedFooter(nameToId(property.property), player.name.toLowerCase());
                } else if((!property.mortgage && $propertyCardFooter !== null)){
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

function checkIfPlayerOnTile(gameInfo) {
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        // Checks if player is on a card that is currently shown on screen. (And filters out bankrupted players)
        if (document.querySelector(`#${nameToId(player.currentTile)}`) !== null && !player.bankrupt && document.querySelector("body").id !== "see-all-the-streets-with-owners"){
            renderPlayerOnTile(nameToId(player.currentTile), player.name);
        }
    });
}

function checkIfPlayerBankrupt(response) {
    response.players.forEach(player => {
        if (player.bankrupt) {
            renderPlayerBankrupt(player.name.toLowerCase());
        }
    });
}
