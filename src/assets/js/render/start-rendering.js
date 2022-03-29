"use strict";



function initStartScreen() {
    console.log("InitStartScreen");
    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);
    document.querySelectorAll('.icon-picker').forEach(item => {
        item.addEventListener('click', function (e){
            document.querySelector("#icon-interface").classList.add("hidden");
            renderIconPicker(e.currentTarget);
        });
    });
    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backButton);
    });
}

function renderJoin() {
    _$startInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.remove("hidden");

    // const $joinInterface = document.querySelector("#join-interface");
    // join button
    // $joinInterface.querySelector(".join-button").addEventListener("click", joinGame);

}

function renderCreate() {
    _$startInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.remove("hidden");

}
function renderLobby() {
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
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

    _$startInterface.classList.remove("hidden");
}
