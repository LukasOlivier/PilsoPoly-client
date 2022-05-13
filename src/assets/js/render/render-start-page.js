"use strict";
let _$interfaces = {};

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

    _$interfaces.startInterface.querySelector("#join").addEventListener("click", renderJoin);
    _$interfaces.startInterface.querySelector("#create").addEventListener("click", renderCreate);
    _$interfaces.startInterface.querySelector("#rules").addEventListener("click", renderRules);
    _$interfaces.joinInterface.querySelector(".join-button").addEventListener("click", fetchAllGames);
    _$interfaces.rulesInterface.querySelector(".back-button").addEventListener("click", backToMainMenu);
    _$interfaces.joinInterface.querySelector("#show-all-games").addEventListener("click", fetchNonStartedGames);
    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backToMainMenu);
    });
}

function renderJoin() {
    showElement(_$interfaces.joinInterface)
}

function renderCreate() {
    showElement(_$interfaces.createInterface)
    _$interfaces["createInterface"].querySelector(".join-button").addEventListener("click", getInputValues);
}


function renderLobby(id, numberOfPlayers, playerNames) {
    // Hide other interfaces for lobby //
    showElement(_$interfaces.lobbyInterface)
    _$interfaces["lobbyInterface"].querySelector("#players").innerText = ""; //prevents over flooding the screen when refreshing
    _$interfaces["lobbyInterface"].querySelector("span").innerText = id; //Display the ID of current game
    const playersToJoin = numberOfPlayers - playerNames.length;
    _$interfaces["lobbyInterface"].querySelector("p").innerText = `Waiting for ${playersToJoin} more players to join.`;
    playerNames.forEach(player => {
        renderPlayer(player)
    });
    // this ads a timeout every 1.5s to refresh the lobby
    // when clicking on the back button, this timeout gets removed.
    const timoutID = setTimeout(loadGameDataForLobby, 1500);
    _$interfaces.lobbyInterface.querySelector("#back-lobby").addEventListener('click', () => clearTimeout(timoutID));
}

function renderPlayer(player) {
    const $templateClone = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $templateClone.querySelector('h3').innerText = player.name;
    $templateClone.id = player.name;
    if (player.name === loadFromStorage("name")) {
        $templateClone.querySelector('img').src = `assets/media/${loadFromStorage("iconId")}.png`;
    }
    document.querySelector('#players').insertAdjacentHTML('beforeend', $templateClone.outerHTML);
}


function renderIconPicker(name) {
    showElement(_$interfaces.iconInterface)
    document.querySelectorAll("li").forEach(icon => icon.addEventListener('click', () => {
        loadGameDataForLobby();
        joinGame(name, icon.id);
    }));
}


function renderRules() {
    showElement(_$interfaces.rulesInterface)
}

function renderAllAvailableGames(allGames) {
    document.addEventListener('click', function (e) {
        if (!_$interfaces.seeAllGamesInterface.contains(e.target)) {
            _$interfaces.seeAllGamesInterface.classList.add("hidden");
            _$interfaces.joinInterface.classList.remove("reduce-opacity")
        }
    });
    _$interfaces.joinInterface.classList.add("reduce-opacity")
    _$interfaces.seeAllGamesInterface.classList.remove("hidden");
    // renders all games that are PilsoPoly and that haven't started.
    // also makes the li clickable
    const $ul = _$interfaces.seeAllGamesInterface.querySelector('ul');
    $ul.innerHTML = "";
    allGames.forEach(game => {
        $ul.insertAdjacentHTML("beforeend", `<li id="${game.id}"><p class="gameID">${game.id}</p><p>${game.players.length}/${game.numberOfPlayers}</p></li>`);
    });
    const $listItems = $ul.querySelectorAll('li');
    $listItems.forEach(item => item.addEventListener("click", fillInGameID));

}

function backToMainMenu() {
    showElement(_$interfaces.startInterface)
}

function showElement(elementToShow) {
    clearErrorMessage();
    Object.keys(_$interfaces).forEach((element) => {
        _$interfaces[element].classList.add("hidden")
    })
    elementToShow.classList.remove("hidden")
}

function clearErrorMessage() {
    document.querySelector(_config.errorHandlerSelector).innerHTML = "";
}



