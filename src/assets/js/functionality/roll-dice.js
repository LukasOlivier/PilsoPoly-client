'use strict';

function checkIfPlayerCanRoll(gameState) {
    const playerName = loadFromStorage("name");
    renderPlayerActionRollDice(gameState);
    _$containers["rollDiceOpenDialog"].disabled = !(gameState.currentPlayer === playerName && gameState.canRoll === true);
}
// This function adds the glowing effect to the player icon
function renderPlayerActionRollDice(gameState) {
    if (gameState.canRoll === true) {
        document.querySelectorAll(`.info-container img`).forEach(player => player.classList.remove("active-player"));
        document.querySelector(`#${gameState.currentPlayer} img`).classList.add("active-player");
    }
}

function rollDice() {
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/dice`, 'POST')
        .then(response => {
            checkIfRolledTwice(response);
            getTiles(response);
            saveCurrentTile(response);
            updateLastMoveInfo(response);
            seeWhatActionThatNeedsToBeTaken(response);
        })
        .catch(errorHandler);
}

function changePopUpText(text) {
    _$containers.rollDiceDialog.querySelector('p').innerText = text;
    document.querySelector("#location").innerText = `You landed at ${_lastMoveInfo.tileName}`;
    togglePopUpButtons();
}

function togglePopUpButtons(){
    document.querySelector("#roll-dice-oke").classList.toggle("hidden");
    document.querySelector("#roll-dice").classList.toggle("hidden");
    document.querySelector("#cancel-roll-dice").classList.toggle("hidden");
}

function checkIfRolledTwice(response) {
    const totalRolled = response.lastDiceRoll[0] + response.lastDiceRoll[1];
    let text = "";
    if (response.lastDiceRoll[0] === response.lastDiceRoll[1]) {
        text = `You rolled a double ${response.lastDiceRoll[0]}. You can throw again!`;
    } else {
        _$containers["rollDiceOpenDialog"].disabled = true;
        text = `You threw ${totalRolled}!`;
    }
    changePopUpText(text);
}


function saveCurrentTile(response) {
    let currentTile = response.turns.slice(-1)[0].moves.slice(-1)[0].tile;
    saveToStorage("currentTile", currentTile);
}


