'use strict';

function checkInput(){
    const numberOfPlayers = parseInt(_$createInterface.querySelector("#amount-of-players").value);
    const name = {
        playerName: _$createInterface.querySelector(".name").value.toLowerCase()
    };
    if (isNaN(numberOfPlayers)) {
        errorHandler("Please provide a number between 2 and 8");
        return;
    } else if (numberOfPlayers > 8) {
        errorHandler("There can only be 8 players");
        return;
    } else if (numberOfPlayers < 2) {
        errorHandler("There need to be at least 2 players");
        return;
    } else if (name.playerName === "") {
        errorHandler("Your name cant be empty");
        return;
    }
    createGame(numberOfPlayers, name);
}

function createGame(numberOfPlayer, name){
    const body = {
        prefix: _config.prefix,
        numberOfPlayers: numberOfPlayer
    };
    fetchFromServer('/games', 'POST', body)
        .then(response => {
            _gameID = response.id;
            joinGame(_gameID, name);
        })
        .catch(errorHandler);
}

