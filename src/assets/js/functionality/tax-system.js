'use strict';

function setTaxSystem(e){
    const type = e.target.value;
    console.log(e.target.value);
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/tax/${type}`, 'POST')
        .catch(errorHandler)
}