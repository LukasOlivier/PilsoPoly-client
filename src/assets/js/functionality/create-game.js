'use strict';

function checkInput(){
    const numberOfPlayers = parseInt(_$createInterface.querySelector("#amount-of-players").value);
    const name = {
        playerName: _$createInterface.querySelector(".name").value.toLowerCase()
    };
    let errorMessage = false;
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890é§]/;
    if (isNaN(numberOfPlayers)) {
        errorMessage = "Please provide a number between 2 and 8";
    } else if (numberOfPlayers > 8) {
        errorMessage = "There can only be 8 players";
    } else if (numberOfPlayers < 2) {
        errorMessage = "There need to be at least 2 players";
    } else if (name.playerName === "") {
        errorMessage = "Your name cant be empty";
    } else if (specialChar.test(name.playerName) === true) {
        errorMessage = "Your name cant contain any special characters or numbers";
    } else if (name.playerName.length > 10) {
        errorMessage = "Your name can only be 10 characters long";
    }
    if (errorMessage) {
        errorHandler(errorMessage);
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
