'use strict';

function getInputValues() {
    const numberOfPlayers = parseInt(_$interfaces["createInterface"].querySelector("#amount-of-players").value);
    const name = {
        playerName: _$interfaces["createInterface"].querySelector(".name").value.toLowerCase()
    };
    const errorMessage = checkInput(numberOfPlayers, name);
    if (errorMessage !== "") {
        errorHandler(errorMessage);
        return;
    }
    // name0
    createGame(numberOfPlayers, name);
}

function checkInput(numberOfPlayers, name) {
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890é§]/;
    if (isNaN(numberOfPlayers)) {
        return "Please provide a number between 2 and 8";
    } else if (numberOfPlayers > 8) {
        return "There can only be 8 players";
    } else if (numberOfPlayers < 2) {
        return "There need to be at least 2 players";
    } else if (name.playerName === "") {
        return "Your name cant be empty";
    } else if (specialChar.test(name.playerName) === true) {
        return "Your name cant contain any special characters or numbers";
    } else if (name.playerName.length > 10) {
        return "Your name can only be 10 characters long";
    }
    return "";
}


function createGame(numberOfPlayer, name) {
    const body = {
        prefix: _config.prefix,
        numberOfPlayers: numberOfPlayer
    };
    fetchFromServer('/games', 'POST', body)
        .then(response => {
            _gameID = response.id;
            iconPicker(name)
        })
        .catch(errorHandler);
}
