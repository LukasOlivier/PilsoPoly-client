'use strict';

function checkInput(){
    const numberOfPlayers = parseInt(_$createInterface.querySelector("#amount-of-players").value);
    const name = {
        playerName: _$createInterface.querySelector(".name").value.toLowerCase()
    };
    try {
        const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890é§]/;
        if (isNaN(numberOfPlayers)) {
            throw new Error("Please provide a number between 2 and 8");
        } else if (numberOfPlayers > 8) {
            throw new Error("There can only be 8 players");
        } else if (numberOfPlayers < 2) {
            throw new Error("There need to be at least 2 players");
        } else if (name.playerName === "") {
            throw new Error("Your name cant be empty");
        } else if (specialChar.test(name.playerName) === true) {
            throw new Error("Your name cant contain any special characters or numbers");
        } else if (name.playerName.length > 10) {
            throw new Error("Your name can only be 10 characters long");
        }
    }
    catch (error) {
        errorHandler(error);
        return;
    }
    createGame(numberOfPlayers, name);
}
// ask a teacher (vlummens :)) what s the best solution
/*
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
 */
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
