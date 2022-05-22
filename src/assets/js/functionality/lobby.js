'use strict';

function loadGameDataForLobby(){
    _$interfaces.iconInterface.classList.add("hidden");
    fetchFromServer(`/games?prefix=${_config.prefix}`)
        .then(response => {
            const game = findGameByID(response, loadFromStorage("gameId"));
            if (game.started === true) {
                window.location.href = "main-screen.html";
                saveToStorage("currentTile","Go");
            }
            renderLobby(game);
        });
}
