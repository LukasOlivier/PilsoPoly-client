'use strict';


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
