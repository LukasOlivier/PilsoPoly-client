'use strict';

function fetchAllGames(){
    const id = makeID(_$joinInterface.querySelector("#ID").value);
    const name = {
        playerName: _$joinInterface.querySelector(".name").value.toLowerCase()
    };
    try {
        fetchFromServer(`/games?prefix=${_config.prefix}`)
            .then(response => {
                const game = findGameByID(response, id);
                if (game.started === true) {
                    throw new Error("This game has already started.");
                }
                checkName(name, game);
            })
            .catch(errorHandler);
    }
    catch(error) {
        errorHandler(error);
        return;
    }
    joinGame(id, name);
}
// if the id doesnt contains the prefix, add it. ;)
function makeID(id){
    if (id.includes(_config.prefix)) {
        return id;
    } else {
        return _config.prefix.concat("_", id);
    }
}

function checkName(name, game){
    // Special characters are not allowed in the name
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
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
    console.log("names are correct")
}
function findGameByID(allGames, id){
    for(let game of allGames){
        if(game.id === id){
            console.log('found with id ' + id);
            return game;
        }
    }
    throw new Error("There is no game with this code(2)")
}

function joinGame(id, name){
    document.querySelector(".errormessages p").innerText = "";
    fetchFromServer(`/games/${id}/players`,'POST', name)
        .then(response => {
            _gameID = id;
            _token = response.token;
            localStorage.clear();
            saveToStorage("gameId", id);
            saveToStorage("token", _token);
            saveToStorage("name", name.playerName);
            loadGameDataForLobby(id, name);
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

