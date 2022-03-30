"use strict";

let _$startInterface = "";
let _$createInterface = "";
let _$joinInterface = "";
let _$lobbyInterface = "";
let _$iconInterface = "";
let _$rulesInterface = "";
let _$seeAllGamesInterface = ";"

function initStartScreen() {
    _$startInterface = document.querySelector("#start-interface");
    _$createInterface = document.querySelector("#create-interface");
    _$joinInterface = document.querySelector("#join-interface");
    _$lobbyInterface = document.querySelector("#lobby-interface");
    _$iconInterface = document.querySelector("#icon-interface");
    _$rulesInterface = document.querySelector("#rules-interface");
    _$seeAllGamesInterface = document.querySelector("#see-all-games-interface");


    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);
    document.querySelector("#show-all-games").addEventListener("click", renderAllAvailableGames);


    document.querySelectorAll('.icon-picker').forEach(item => {
        item.addEventListener('click', function (e) {
            document.querySelector("#icon-interface").classList.add("hidden");
            renderIconPicker(e.currentTarget);
        });
        item.addEventListener('click', renderIconPicker);
    });
    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backButton);
    });

    _$seeAllGamesInterface.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function (e) {
            _$seeAllGamesInterface.classList.add("hidden");
            _$joinInterface.style.opacity = "1";
            _$joinInterface.querySelector("#ID").value = e.target.innerText
        });
    })
}

function renderJoin() {
    document.querySelector(".errormessages p").innerHTML = "";
    _$startInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.remove("hidden");
    document.querySelector(".errormessages").classList.remove("hidden");

    // join button
    const $joinInterface = document.querySelector("#join-interface");
    $joinInterface.querySelector(".join-button").addEventListener("click", checkExistingGames);
}

function renderCreate() {
    document.querySelector(".errormessages p").innerHTML = "";
    _$startInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.remove("hidden");
    // should this button be named create button? and have an ID instead of a class?
    // kept it like this for css maybe??????? IDKKKKK
    const $createInterface = document.querySelector("#create-interface");
    $createInterface.querySelector(".join-button").addEventListener("click", checkInput);
}


function renderLobby(id, numberOfPlayers, playerNames) {
    hideEverythingForLobby();
    _$lobbyInterface.querySelector("span").innerText = id;
    console.log(_$lobbyInterface);
    const playersToJoin = numberOfPlayers - playerNames.length;
    _$lobbyInterface.querySelector("p").innerText = "Waiting for " + playersToJoin + " more players to join.";
    playerNames.forEach(player => {
        const $templateClone = document.querySelector('template').content.firstElementChild.cloneNode(true);
        $templateClone.querySelector('h3').innerText = player.name;
        document.querySelector('#players').insertAdjacentHTML('beforeend', $templateClone.outerHTML);
    });
    // current solution to refresh the lobby, give the gameID (id) with the refresh function
    // this function just goes back to loadGameFromData..
    _$lobbyInterface.querySelector('.refresh').addEventListener('click', function () {
        refresh(id);
        console.log('Your game id is:' + _gameID);
        console.log('your player token is: ' + _token);
    });
}

// oke pls give me a better name xd
function hideEverythingForLobby() {
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$lobbyInterface.classList.remove("hidden");

    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$lobbyInterface.classList.remove("hidden");

    _$lobbyInterface.querySelector("#players").innerText = "";
}

function renderIconPicker($clickedIcon) {
    console.log($clickedIcon);
    _$lobbyInterface.classList.add("hidden");
    _$iconInterface.classList.remove("hidden");
    _$iconInterface.querySelectorAll('img').forEach(item => {
        item.addEventListener('click', event => {
            const icon = event.target.id;
            // this is the currently selected icon.
            _$lobbyInterface.classList.remove("hidden");
            _$iconInterface.classList.add("hidden");
            $clickedIcon.src = `assets/media/${icon}.png`;
            document.querySelector(`${previousScreen} button`).innerHTML = `<img src="assets/media/${icon}.png" alt="${icon}" id="${icon}">`;
        });
    });
}

function renderRules() {
    _$startInterface.classList.add("hidden");
    _$rulesInterface.classList.remove("hidden");
}

function renderAllAvailableGames() {
    _$joinInterface.style.opacity = "0.2";
    _$seeAllGamesInterface.classList.remove("hidden");
}

function backButton() {
    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$lobbyInterface.classList.add("hidden");
    document.querySelector(".errormessages p").innerHTML = "";
    _$startInterface.classList.remove("hidden");
}
