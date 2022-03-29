"use strict";


function initStartScreen() {

    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);
    document.querySelectorAll('.icon-picker').forEach(item => {
        item.addEventListener('click', renderIconPicker);
    });
    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backButton);
    });
}

function renderJoin() {
    document.querySelector("#start-interface").classList.add("hidden");
    document.querySelector("#create-interface").classList.add("hidden");
    document.querySelector("#join-interface").classList.remove("hidden");

    const $joinInterface = document.querySelector("#join-interface");
    // join button
    $joinInterface.querySelector(".join-button").addEventListener("click", joinGame);

}

function renderCreate() {
    document.querySelector("#start-interface").classList.add("hidden");
    document.querySelector("#join-interface").classList.add("hidden");
    document.querySelector("#create-interface").classList.remove("hidden");
    // document.querySelector("#rules-interface").classList.remove("hidden");
}


function renderIconPicker() {
    document.querySelectorAll('img').forEach(item => {
        item.addEventListener('click', event => {
            const icon = event.target.id;
            // this is the currently selected icon.
            document.querySelector(`${previousScreen} button`).innerHTML = `<img src="assets/media/${icon}.png" alt="${icon}" id="${icon}">`;
        });
    });
}


function renderRules() {
    console.log("Now in renderRules function");
}

function backButton() {
    document.querySelector("#create-interface").classList.add("hidden");
    document.querySelector("#join-interface").classList.add("hidden");
    document.querySelector("#start-interface").classList.remove("hidden");
}
