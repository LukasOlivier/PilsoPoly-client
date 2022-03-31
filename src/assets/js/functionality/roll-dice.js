'use strict';
document.addEventListener('DOMContentLoaded',rollDice);
_token = {
    token: 'PilsoPoly_002-Niels'
}

function rollDice(){
    document.querySelector("#rolldice");
    document.addEventListener("click", function(){
        initDice('Niels', 'PilsoPoly_002')
        document.querySelector("#rolldice").innertext = "";
    });
}

function initDice(playerName, _gameId){
        fetchFromServer(`/games/${_gameId}/players/${playerName}/dice`, 'POST')
            .then(response => {
             console.log('you rolled' + '' + response.lastDiceRoll)

            })
            .catch(errorHandler);



}

