"use strict";

let _$startInterface = "";
let _$createInterface = "";
let _$joinInterface = "";
let _$lobbyInterface = "";
let _$iconInterface = "";
let _$rulesInterface = "";
let _$seeAllGamesInterface = "";
let _$errorMessage = "";

function initStartScreen() {
    _$startInterface = document.querySelector("#start-interface");
    _$createInterface = document.querySelector("#create-interface");
    _$joinInterface = document.querySelector("#join-interface");
    _$lobbyInterface = document.querySelector("#lobby-interface");
    _$iconInterface = document.querySelector("#icon-interface");
    _$rulesInterface = document.querySelector("#rules-interface");
    _$seeAllGamesInterface = document.querySelector("#see-all-games-interface");
    _$errorMessage = document.querySelector(".errormessages p");


    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);
    document.querySelector("#rules-interface .back-button").addEventListener("click", backButton);

    document.querySelector("#show-all-games").addEventListener("click", fetchNonStartedGames);

    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backButton);
    });

    _$seeAllGamesInterface.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function (e) {
            _$seeAllGamesInterface.classList.add("hidden");
            _$joinInterface.style.opacity = "1";
            _$joinInterface.querySelector("#ID").value = e.target.innerText;
        });
    });
}

function renderJoin() {
    _$errorMessage.innerHTML = "";
    _$startInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.remove("hidden");
    document.querySelector(".errormessages").classList.remove("hidden");

    // join button
    const $joinInterface = document.querySelector("#join-interface");
    $joinInterface.querySelector(".join-button").addEventListener("click", fetchAllGames);
}

function renderCreate() {
    _$errorMessage.innerHTML = "";
    _$startInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.remove("hidden");

    const $createInterface = document.querySelector("#create-interface");
    $createInterface.querySelector(".join-button").addEventListener("click", checkInput);
}


function renderLobby(id, numberOfPlayers, playerNames) {
    // Hide other interfaces for lobby //
    _$joinInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$lobbyInterface.classList.remove("hidden");

    _$lobbyInterface.querySelector("#players").innerText = ""; //prevents over flooding the screen when refreshing
    _$lobbyInterface.querySelector("span").innerText = id; //Display the ID of current game
    const playersToJoin = numberOfPlayers - playerNames.length;
    _$lobbyInterface.querySelector("p").innerText = `Waiting for ${playersToJoin} more players to join.`;
    playerNames.forEach(player => {
        const $templateClone = document.querySelector('template').content.firstElementChild.cloneNode(true);
        $templateClone.querySelector('h3').innerText = player.name;
        document.querySelector('#players').insertAdjacentHTML('beforeend', $templateClone.outerHTML);
    });
    // this ads a timeout every 1.5s to refresh the lobby
    // when clicking on the back button, this timeout gets removed.
    const timoutID = setTimeout(loadGameDataForLobby, 1500);
    _$lobbyInterface.querySelector("#back-lobby").addEventListener('click',() => clearTimeout(timoutID));
}

function renderIconPicker(e) {
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

function renderAllAvailableGames(allGames) {
    _$joinInterface.style.opacity = "0.2";
    _$seeAllGamesInterface.classList.remove("hidden");
    // renders all games that are PilsoPoly and that arent started.
    // also makes the li clickable
    const $ul = _$seeAllGamesInterface.querySelector('ul');
    $ul.innerHTML = "";
    allGames.forEach(game => {
        $ul.insertAdjacentHTML("beforeend", `<li id="${game.id}"><p class="gameID">${game.id}</p><p>${game.players.length}/${game.numberOfPlayers}</p></li>`);
    });
    const $listItems = $ul.querySelectorAll('li');
    $listItems.forEach(item => item.addEventListener("click", fillInGameID));
}
// todo: make it so that clicking anywhere on the screen, the popup for the games dissapears....
function backButton() {
    _$rulesInterface.classList.add("hidden");
    _$createInterface.classList.add("hidden");
    _$joinInterface.classList.add("hidden");
    _$lobbyInterface.classList.add("hidden");
    _$errorMessage.innerHTML = "";
    _$startInterface.classList.remove("hidden");
}
