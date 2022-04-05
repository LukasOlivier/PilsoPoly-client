'use strict';

function loseGame(){
    const gameID = loadFromStorage("gameId");
    const playerName = loadFromStorage("name");
    _token = {token:loadFromStorage("token")};

    fetchFromServer(`/games/${gameID}/players/${playerName}/bankruptcy`,'POST')
        .then(() => localStorage.clear())
        .catch(() => {
            errorHandler("Something went wrong at our side :(");
            localStorage.clear();
        });
}
