_token = {token: loadFromStorage("token")};
_gameID = loadFromStorage("gameId");

function renderWinScreen(){
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            document.querySelector("p").insertAdjacentHTML("beforeend",`${getPlayerBalance(currentGameInfo)}M`)
        });
}