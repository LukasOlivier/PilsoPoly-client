'use strict';
// name is for later :)
function loadGameDataForLobby(name){
    fetchFromServer(`/games?prefix=${_config.prefix}`)
        .then(response => {
            const game = findGameByID(response, _gameID);
            // api has changed?
            // _gameID = game.id;
            const numberOfPlayers = game.numberOfPlayers;
            const playerNames = game.players;
            renderLobby(_gameID, numberOfPlayers, playerNames);
        });
}

function refresh(){

    loadGameDataForLobby()
}
