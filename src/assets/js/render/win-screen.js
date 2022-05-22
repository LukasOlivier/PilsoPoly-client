"use strict";

function renderWinScreen(){
    fetchFromServer(`/games/${loadFromStorage("gameId")}`, "GET")
        .then(currentGameInfo => {
            document.querySelector("p").insertAdjacentHTML("beforeend",`${getPlayer(currentGameInfo).money}M`);
        });
}
