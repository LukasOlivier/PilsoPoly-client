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
let _token = null;
let _gameID = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (document.querySelector("body").id === "start-screen") {
        initStartScreen();
    } else if (document.querySelector("body").id === "main-screen") {
        renderMainPage();
    } else if (document.querySelector("body").id === "see-all-the-streets-with-owners") {
        initMap();
    }
}
