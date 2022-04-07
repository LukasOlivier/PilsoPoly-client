'use strict';

function checkIfPlayerCanRoll(gameState){
    const playerName = loadFromStorage("name");
    if (gameState.currentPlayer === playerName && gameState.canRoll === true) {
        console.log('and you can roll');
        readyToRoll();
        _$containers["rollDiceOpenDialog"].classList.remove("disabled");
    } else {
        _$containers["rollDiceOpenDialog"].classList.add("disabled");
    }
}

function readyToRoll(){
    _$containers["rollDiceOpenDialog"].addEventListener('click', () => {
        document.querySelector("#roll-dice-dialog").showModal();
    });
    document.querySelector("#cancel-roll-dice").addEventListener('click', () => {
        document.querySelector("#roll-dice-dialog").close();
    });
}

function rollDice(){
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/dice`, 'POST')
        .then(response => {
            checkIfRolledTwice(response);
            getTiles(response);
            getCurrentTile(response);
            seeWhatActionThatNeedsToBeTaken(getLastMove(response));
        })
        .catch(errorHandler);
}

function changeDiceRollNumber(text){
    document.querySelector('#roll-dice-dialog p').innerText = text;
    document.querySelector("#location").innerText = `You landed at ${_playerPositionID}`;
    document.querySelector("#cancel-roll-dice").innerText = "Oké";
    document.querySelector("#roll-dice").classList.add("hidden");
}

function checkIfRolledTwice(response) {
    const totalRolled = response.lastDiceRoll[0] + response.lastDiceRoll[1];
    let text = "";
    if (response.lastDiceRoll[0] === response.lastDiceRoll[1]) {
        text = `You rolled a double ${response.lastDiceRoll[0]}. You can throw again!`;
        changeDiceRollNumber(text);
        readyToRoll();
    } else {
        _$containers["rollDiceOpenDialog"].classList.add("disabled");
        text = `You threw ${totalRolled}!`;
        changeDiceRollNumber(text);
    }
}

function getLastMove(response){
    return response.turns.slice(-1)[0].moves;
}

function getCurrentTile(response){
    saveToStorage("currentTile", response.turns.slice(-1)[0].moves.slice(-1)[0].tile);
}
