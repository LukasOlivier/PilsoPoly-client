'use strict';


function readyToRoll(){
    document.querySelector("#roll-dice-open-dialog").addEventListener('click', () => {
        document.querySelector("#roll-dice-dialog").showModal();
    } )
    document.querySelector("#cancel-roll-dice").addEventListener('click', () => {
        document.querySelector("#roll-dice-dialog").hide();
    } )
}

function rollDice(){
    fetchFromServer(`/games/${_gameID}/players/${_name}/dice`, 'POST')
        .then(response => {
            console.log(response)
            console.log('you rolled ' + response.lastDiceRoll)
            const totalRolled = response.lastDiceRoll[0] + response.lastDiceRoll[1];
            console.log(totalRolled)
            move(totalRolled)

        })
        .catch(errorHandler);
}


function changeDiceRollNumber(number){
    document.querySelector('#number').innerHTML = number;
}
