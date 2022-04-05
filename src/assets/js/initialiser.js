"use strict";

let _token = null;
let _gameID = null;
let _tiles = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector("body").id === "start-screen") {
        initStartScreen();
    }
    else if (document.querySelector("body").id === "main-screen"){
        renderMainPage();
    }
    else if (document.querySelector("body").id === "lose-screen"){
        loseGame();
    }
}
