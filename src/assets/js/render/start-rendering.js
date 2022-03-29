"use strict";

let _$startInterface = "";
let _$createInterface = "";
let _$joinInterface = "";
let _$lobbyInterface = "";
let _$iconInterface = "";


function initStartScreen() {
    _$startInterface = document.querySelector("#start-interface");
    _$createInterface = document.querySelector("#create-interface");
    _$joinInterface = document.querySelector("#join-interface");
    _$lobbyInterface = document.querySelector("#lobby-interface");
    _$iconInterface = document.querySelector("#icon-interface");

    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);

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

function renderLobby() {
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$lobbyInterface.classList.remove("hidden");

    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$lobbyInterface.classList.remove("hidden");
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
    console.log("Now in renderRules function");
}

function backButton() {
    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$lobbyInterface.classList.add("hidden");
    document.querySelector(".errormessages p").innerHTML = "";
    _$startInterface.classList.remove("hidden");
}
