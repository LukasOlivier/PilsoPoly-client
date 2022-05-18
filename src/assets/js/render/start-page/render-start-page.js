"use strict";
let _$interfaces = {};
let timoutIDForIconPicker = null;

function initStartScreen() {
    _$interfaces = {
        startInterface: document.querySelector("#start-interface"),
        createInterface: document.querySelector("#create-interface"),
        joinInterface: document.querySelector("#join-interface"),
        lobbyInterface: document.querySelector("#lobby-interface"),
        iconInterface: document.querySelector("#icon-interface"),
        rulesInterface: document.querySelector("#rules-interface"),
        seeAllGamesInterface: document.querySelector("#see-all-games-interface"),
    };
    addEventListeners();
}

function renderJoin() {
    showElement(_$interfaces.joinInterface);
}

function renderCreate() {
    showElement(_$interfaces.createInterface);
    _$interfaces["createInterface"].querySelector(".join-button").addEventListener("click", getInputValues);
}


function renderLobby(game) {
    showElement(_$interfaces.lobbyInterface);
    const numberOfPlayers = game.numberOfPlayers;
    const players = game.players;
    const playersToJoin = numberOfPlayers - players.length;
    _$interfaces.lobbyInterface.querySelector("#players").innerText = "";
    _$interfaces.lobbyInterface.querySelector("span").innerText = _gameID;
    _$interfaces.lobbyInterface.querySelector("p").innerText = `Waiting for ${playersToJoin} more players to join.`;
    players.forEach(player => {
        renderPlayer(player);
    });
    const timoutID = setTimeout(loadGameDataForLobby, 1500);
    _$interfaces.lobbyInterface.querySelector("#back-lobby").addEventListener('click', () => clearTimeout(timoutID));
}

function renderPlayer(player) {
    const $templateClone = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $templateClone.querySelector('h3').innerText = player.name;
    $templateClone.querySelector('img').src = `assets/media/${player.icon}.png`;
    $templateClone.id = player.name;
    document.querySelector('#players').insertAdjacentHTML('beforeend', $templateClone.outerHTML);
}

function goToLobby(name, icon) {
    if (!document.querySelector(`#${icon}`).classList.contains("taken")) {
        clearTimeout(timoutIDForIconPicker);
        loadGameDataForLobby();
        joinGame(name, icon);
        _$interfaces.iconInterface.classList.add("hidden");
    }
}

function loadGameDataForIconPicker() {
    fetchFromServer(`/games?prefix=${_config.prefix}`)
        .then(response => {
            const game = findGameByID(response, _gameID);
            game.players.forEach(player => {
                if (document.querySelector(`li`).id !== player.icon) {
                    document.querySelector(`#${player.icon}`).classList.remove("available");
                    document.querySelector(`#${player.icon}`).classList.add("taken");
                }
            });
            timoutIDForIconPicker = setTimeout(loadGameDataForIconPicker, 1500);
        });
}

function renderIconPicker(name) {
    document.querySelectorAll(".available").forEach(icon => icon.addEventListener('click', () => goToLobby(name.playerName, icon.id)));
    loadGameDataForIconPicker();
    showElement(_$interfaces.iconInterface);
}

function renderRules() {
    showElement(_$interfaces.rulesInterface);
}

function renderAllAvailableGames(allGames) {
    _$interfaces.joinInterface.classList.add("reduce-opacity");
    _$interfaces.seeAllGamesInterface.classList.remove("hidden");
    const $ul = _$interfaces["seeAllGamesInterface"].querySelector('ul');
    $ul.innerHTML = "";
    allGames.forEach(game => {
        $ul.insertAdjacentHTML("beforeend", `<li id="${game.id}"><p class="gameID">${game.id}</p><p>${game.players.length}/${game.numberOfPlayers}</p></li>`);
    });
    const $listItems = $ul.querySelectorAll('li');
    $listItems.forEach(item => item.addEventListener("click", fillInGameID));
}

function backToMainMenu() {
    showElement(_$interfaces.startInterface);
}

function showElement(elementToShow) {
    clearErrorMessage();
    Object.keys(_$interfaces).forEach((element) => {
        _$interfaces[element].classList.add("hidden");
    });
    elementToShow.classList.remove("hidden");
}

function clearErrorMessage() {
    document.querySelector(_config.errorHandlerSelector).innerHTML = "";
}



