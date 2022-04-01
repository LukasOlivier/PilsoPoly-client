'use strict';

function fetchAllGames(){
    const gameID = makeID(_$joinInterface.querySelector("#ID").value);
    const name = {
        playerName: _$joinInterface.querySelector(".name").value.toLowerCase()
    };
    try {
        fetchFromServer(`/games?prefix=${_config.prefix}`)
            .then(response => {
                const game = findGameByID(response, gameID);
                if (game.started === true) {
                    console.log("game started")
                    throw new Error("This game has already started.")
                }
                checkName(name, game);
                joinGame(gameID, name);
            })
            .catch(errorHandler)
    }
    catch(error) {
        errorHandler(error);
    }

}
// if the id doesnt contains the prefix, add it. ;)
function makeID(gameID){
    if (gameID.includes(_config.prefix)) {
        return gameID;
    } else {
        return _config.prefix.concat("_", gameID);
    }
}

function checkName(name, game){
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
    })
}

function joinGame(gameID, name){
    document.querySelector(".errormessages p").innerText = "";
    fetchFromServer(`/games/${gameID}/players`,'POST', name)
        .then(response => {
            _gameID = gameID;
            _token = response.token;
            localStorage.clear();
            saveToStorage("gameId", gameID);
            saveToStorage("token", _token);
            saveToStorage("name", name.playerName);
            loadGameDataForLobby(gameID, name);
        })
        // this token is your security token.
        .catch(errorHandler);
}

// https://project-i.ti.howest.be/monopoly-00/api/games?started=false&prefix=PilsoPoly
function fetchNonStartedGames(){
    // ${_config.prefix}
    fetchFromServer(`/games?started=false&prefix=${_config.prefix}`)
        .then(response => renderAllAvailableGames(response))
}

function fillInGameID(e){
    // hides the pop up, and fills the value from the li in the ID field
    _$seeAllGamesInterface.classList.add("hidden");
    _$joinInterface.style.opacity = "1";
    _$joinInterface.querySelector("#ID").value = e.target.id;
}

