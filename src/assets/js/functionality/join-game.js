'use strict';

function fetchAllGames(){
    const id = _config.prefix + '_' + _$joinInterface.querySelector("#ID").value;
    const name = {
        playerName: _$joinInterface.querySelector(".name").value.toLowerCase()
    };
    try {
        checkName(name);
        fetchFromServer(`/games?prefix=${_config.prefix}`)
            .then(response => {
                findGameByID(response, id);
            })
            .catch(errorHandler);
    }
    catch(error) {
        errorHandler(error);
        return;
    }
    joinGame(id, name);
}


function checkName(name){
    const specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
    if (name.playerName === "") {
        throw new Error("Your name cant be empty");
    } else if (specialchar.test(name.playerName) === true) {
        throw new Error("Your name cant contain any special characters or numbers");
    } else if (name.playerName.length > 10) {
        throw new Error("Your name can only be 10 characters long");
    }

}
function findGameByID(allGames, id){
    for(let game of allGames){
        if(game.id === id){
            console.log('found with id ' + id);
            if(game.started === true){
                throw new Error("Game has already started (2)")
            }
            return game;
        }
    }
    throw new Error("There is no game with this code(2)")
}

function joinGame(id, name){
    document.querySelector(".errormessages p").innerText = "";
    console.log(id);
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
    console.log(_config.prefix)
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

