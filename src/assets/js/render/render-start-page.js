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
        errorMessage: document.querySelector(".errormessages p"),
    };
    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);
    document.querySelector("#rules-interface .back-button").addEventListener("click", backButton);
    _$interfaces["joinInterface"].querySelector("#show-all-games").addEventListener("click", fetchNonStartedGames);
    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backButton);
    });
}

function renderJoin() {
    _$interfaces["errorMessage"].innerHTML = "";
    _$interfaces["errorMessage"].classList.remove("hidden");
    _$interfaces["startInterface"].classList.add("hidden");
    _$interfaces["joinInterface"].classList.remove("hidden");

    // join button
    _$interfaces["joinInterface"].querySelector(".join-button").addEventListener("click", fetchAllGames);
}

function renderCreate() {
    _$interfaces["errorMessage"].innerHTML = "";
    _$interfaces["startInterface"].classList.add("hidden");
    _$interfaces["createInterface"].classList.remove("hidden");
    _$interfaces["createInterface"].querySelector(".join-button").addEventListener("click", getInputValues);
}


function renderLobby(id, numberOfPlayers, playerNames) {
    // Hide other interfaces for lobby //
    _$interfaces["joinInterface"].classList.add("hidden");
    _$interfaces["createInterface"].classList.add("hidden");
    _$interfaces["lobbyInterface"].classList.remove("hidden");
    _$interfaces["lobbyInterface"].querySelector("#players").innerText = ""; //prevents over flooding the screen when refreshing
    _$interfaces["lobbyInterface"].querySelector("span").innerText = id; //Display the ID of current game
    const playersToJoin = numberOfPlayers - playerNames.length;
    _$interfaces["lobbyInterface"].querySelector("p").innerText = `Waiting for ${playersToJoin} more players to join.`;
    playerNames.forEach(player => {
        const $templateClone = document.querySelector('template').content.firstElementChild.cloneNode(true);
        $templateClone.querySelector('h3').innerText = player.name;
        $templateClone.id = player.name;
        if (player.name === loadFromStorage("name")) {
            $templateClone.querySelector('img').src = `assets/media/${loadFromStorage("iconId")}.png`
        }
        document.querySelector('#players').insertAdjacentHTML('beforeend', $templateClone.outerHTML);
    });
    // this ads a timeout every 1.5s to refresh the lobby
    // when clicking on the back button, this timeout gets removed.
    const timoutID = setTimeout(loadGameDataForLobby, 1500);
    _$interfaces.lobbyInterface.querySelector("#back-lobby").addEventListener('click', () => clearTimeout(timoutID));
}

function iconPicker(name) {
    renderIconPicker()
    document.querySelectorAll("li").forEach(icon => icon.addEventListener('click', () => {
        loadGameDataForLobby();
        joinGame(name, icon.id)
        _$interfaces.iconInterface.classList.add("hidden");
    }));
}

function renderIconPicker() {
    _$interfaces.joinInterface.classList.add("hidden");
    _$interfaces.createInterface.classList.add("hidden");
    _$interfaces.iconInterface.classList.remove("hidden");
}

function renderRules() {
    _$interfaces["startInterface"].classList.add("hidden");
    _$interfaces["rulesInterface"].classList.remove("hidden");
}

function renderAllAvailableGames(allGames) {
    _$interfaces["joinInterface"].style.opacity = "0.2";
    _$interfaces["seeAllGamesInterface"].classList.remove("hidden");
    // renders all games that are PilsoPoly and that haven't started.
    // also makes the li clickable
    const $ul = _$interfaces["seeAllGamesInterface"].querySelector('ul');
    $ul.innerHTML = "";
    allGames.forEach(game => {
        $ul.insertAdjacentHTML("beforeend", `<li id="${game.id}"><p class="gameID">${game.id}</p><p>${game.players.length}/${game.numberOfPlayers}</p></li>`);
    });
    const $listItems = $ul.querySelectorAll('li');
    $listItems.forEach(item => item.addEventListener("click", fillInGameID));
}

function backButton() {
    _$interfaces["startInterface"].classList.remove("hidden");
    _$interfaces["rulesInterface"].classList.add("hidden");
    _$interfaces["joinInterface"].classList.add("hidden");
    _$interfaces["createInterface"].classList.add("hidden");
    _$interfaces["lobbyInterface"].classList.add("hidden");
    _$interfaces["errorMessage"].innerHTML = "";
}
