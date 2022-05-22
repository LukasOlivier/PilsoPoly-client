"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (document.querySelector("body").id === "start-screen") {
        initStartScreen();
    } else if (document.querySelector("body").id === "main-screen") {
        renderMainPage();
    } else if (document.querySelector("body").id === "see-all-the-streets-with-owners") {
        initMap();
    } else if (document.querySelector("body").id === "win-page") {
        renderWinScreen();
    } else if (document.querySelector("body").id === "inventory") {
        initInventory();
    }

}
