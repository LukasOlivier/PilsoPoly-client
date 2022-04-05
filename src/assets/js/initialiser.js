"use strict";
const _$containers = {
    cardsParent: "",
    startInterface: "",
    createInterface: "",
    joinInterface: "",
    lobbyInterface: "",
    iconInterface: "",
    rulesInterface: "",
    seeAllGamesInterface: "",
    errorMessage: "",
};
const _token = null;
const _gameID = null;
const _tiles = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (document.querySelector("body").id === "start-screen") {
        initStartScreen();
    } else if (document.querySelector("body").id === "main-screen") {
        renderMainPage();
    } else if (document.querySelector("body").id === "lose-screen") {
        loseGame();
    }
}
