'use strict';
// name is for later :)
function loadGameDataForLobby(id, name){
    fetchFromServer(`/games?prefix=${id}`)
        .then(response => {
            console.log("fetching game data");
            _gameID = response[0].id;
            const numberOfPlayers = response[0].numberOfPlayers;
            const playerNames = response[0].players;
            renderLobby(id, numberOfPlayers, playerNames);
        });
}

function refresh(id){
    loadGameDataForLobby(id)
}

