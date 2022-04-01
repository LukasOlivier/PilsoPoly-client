'use strict';

function loadGameDataForLobby(){
    //if (_$lobbyInterface.classList.contains('hidden')){
    //    return;
    // }
    fetchFromServer(`/games?prefix=${_config.prefix}`)
        .then(response => {
            const game = findGameByID(response, _gameID);
            if (game.started === true) {
                console.log("THE GAME HAS STARTED");
                window.location.href = "index.html";
            }
            const numberOfPlayers = game.numberOfPlayers;
            const playerNames = game.players;
            renderLobby(_gameID, numberOfPlayers, playerNames);
            setTimeout(loadGameDataForLobby, 1500);
        })
}
