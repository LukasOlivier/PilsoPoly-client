
_gameID = loadFromStorage("gameId");

function renderWinScreen(){
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            document.querySelector("p").insertAdjacentHTML("beforeend",`${getPlayer(currentGameInfo).money}M`);
        });
}
