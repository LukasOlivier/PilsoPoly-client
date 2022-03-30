"use strict";
let _token = null;
let _gameID = null
document.addEventListener('DOMContentLoaded',init);

function init(){
    initStartScreen();
    // testConnection();
    // renderMainPage();
    // this is the innit for the main page
}

function testConnection(){
    fetchFromServer('/tiles','GET').then(tiles => console.log(tiles)).catch(errorHandler);
}
