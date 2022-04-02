'use strict';


function rollDice(){
    fetchFromServer(`/games/${_gameID}/players/${_name}/dice`, 'POST')
        .then(response => {
            console.log(response)
            console.log('you rolled ' + response.lastDiceRoll)

        })
        .catch(errorHandler);
}


function changeDiceRollNumber(number){
    document.querySelector('#number').innerHTML = number;
}
