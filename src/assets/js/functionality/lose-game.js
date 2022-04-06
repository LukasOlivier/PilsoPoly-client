'use strict';

function loseGame() {
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/bankruptcy`, 'POST')
        .then(() => {
            localStorage.clear();
            window.location.href = "lose-screen.html";
        })
        .catch(() => {
            errorHandler("Something went wrong at our side :(");
            localStorage.clear();
            window.location.href = "lose-screen.html";
        });
}
