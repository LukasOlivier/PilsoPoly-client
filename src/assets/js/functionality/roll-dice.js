'use strict';

function checkIfPlayerCanRoll(gameState) {
    const playerName = loadFromStorage("name");
    renderPlayerActionRollDice(gameState);
    if (gameState.currentPlayer === playerName && gameState.canRoll === true) {
        _$containers["rollDiceOpenDialog"].disabled = false;
        readyToRoll();
    } else {
        _$containers["rollDiceOpenDialog"].disabled = true;
    }
}
// This function adds the glowing effect to the player icon
function renderPlayerActionRollDice(gameState) {
    if (gameState.canRoll === true) {
        document.querySelectorAll(`.info-container img`).forEach(player => player.classList.remove("active-player"));
        document.querySelector(`#${gameState.currentPlayer} img`).classList.add("active-player");
    }
}

function readyToRoll() {
    document.querySelector("#roll-dice").addEventListener("click", rollDice);
    _$containers["rollDiceOpenDialog"].addEventListener('click', () => {
        document.querySelector("#roll-dice-dialog").showModal();
    });
    document.querySelector("#cancel-roll-dice").addEventListener('click', () => {
        document.querySelector("#roll-dice-dialog").close();
    });
    document.querySelector("#roll-dice-oke").addEventListener('click', () => {
        // this should be in one function probably
        document.querySelector("#roll-dice-dialog").close();
        document.querySelector("#roll-dice-dialog p").innerText = "You can roll the dice";
        document.querySelector("#roll-dice-dialog #location").innerText = "";
        togglePopUpButtons()
    })
}

function rollDice() {
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/dice`, 'POST')
        .then(response => {
            checkIfRolledTwice(response);
            getTiles(response);
            saveCurrentTile(response);
            seeWhatActionThatNeedsToBeTaken(getLastMove(response));
        })
        .catch(errorHandler);
}

function changePopUpText(text, location) {
    document.querySelector('#roll-dice-dialog p').innerText = text;
    document.querySelector("#location").innerText = `You landed at ${location[0].tile}`;
    togglePopUpButtons()
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
        readyToRoll();
    } else {
        _$containers["rollDiceOpenDialog"].disabled = true;
        text = `You threw ${totalRolled}!`;
    }
    changePopUpText(text, getLastMove(response));
}

function getLastMove(response) {
    return response.turns.slice(-1)[0].moves;
}
//
function saveCurrentTile(response) {
    saveToStorage("currentTile", response.turns.slice(-1)[0].moves.slice(-1)[0].tile);
}
