'use strict';

function loadGameDataForLobby(id, name){
    fetchFromServer(`/games?prefix=${id}`)
        .then(response => {
            const gameID = response[0].id;
            console.log(id);
            const numberOfPlayers = response[0].numberOfPlayers;
            console.log(numberOfPlayers);
            const playerNames = response[0].players;
            renderLobby(id, numberOfPlayers, playerNames);
        });
}

