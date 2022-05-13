'use strict';

function fetchAllGames() {
    const gameID = makeID(_$interfaces["joinInterface"].querySelector("#ID").value);
    const name = {
        playerName: _$interfaces["joinInterface"].querySelector(".name").value.toLowerCase()
    };
    try {
        fetchFromServer(`/games?prefix=${_config.prefix}`)
            .then(response => {
                const game = findGameByID(response, gameID);
                if (game.started === true) {
                    throw new Error("This game has already started.");
                }
                checkName(name, game);
                _gameID = gameID;

                renderIconPicker(name);
            })
            .catch(errorHandler);
    } catch (error) {
        errorHandler(error);
    }
}

// if the id doesnt contains the prefix, add it. ;)
function makeID(gameID) {
    if (gameID.includes(_config.prefix)) {
        return gameID;
    } else {
        return _config.prefix.concat("_", gameID);
    }
}

function checkName(name, game) {
    // Special characters are not allowed in the name
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890é§]/;
    if (name.playerName === "") {
        throw new Error("Your name cant be empty");
    } else if (specialChar.test(name.playerName) === true) {
        throw new Error("Your name cant contain any special characters or numbers");
    } else if (name.playerName.length > 10) {
        throw new Error("Your name can only be 10 characters long");
    }
    // Here we check if the name that has been provided is not already in the game.
    game.players.forEach(namesInGame => {
        if (namesInGame.name === name.playerName) {
            throw new Error("This name is already in use");
        }
    });
}

function joinGame(name, icon) {
    const body = {
        playerName: name.playerName,
        icon: icon
    };
    document.querySelector(".errormessages p").innerText = "";
    fetchFromServer(`/games/${_gameID}/players`, 'POST', body)
        .then(response => {
            _token = response.token;
            localStorage.clear();
            saveToStorage("gameId", _gameID);
            // this token is your security token.
            saveToStorage("token", _token);
            saveToStorage("name", name.playerName);
            saveToStorage("inventory", []);
            loadGameDataForLobby();
        })
        .catch(errorHandler);
}

// https://project-i.ti.howest.be/monopoly-00/api/games?started=false&prefix=PilsoPoly
function fetchNonStartedGames() {
    // ${_config.prefix}
    fetchFromServer(`/games?started=false&prefix=${_config.prefix}`)
        .then(response => renderAllAvailableGames(response));
}

function fillInGameID(e) {
    // hides the pop up, and fills the value from the li in the ID field
    _$interfaces["seeAllGamesInterface"].classList.add("hidden");
    _$interfaces["joinInterface"].style.opacity = "1";
    _$interfaces["joinInterface"].querySelector("#ID").value = e.currentTarget.id;
}

