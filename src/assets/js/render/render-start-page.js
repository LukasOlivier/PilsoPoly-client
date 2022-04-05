"use strict";


function initStartScreen() {
    _$containers.createInterface = document.querySelector("#create-interface");
    _$containers.startInterface = document.querySelector("#start-interface");
    _$containers.joinInterface = document.querySelector("#join-interface");
    _$containers.lobbyInterface = document.querySelector("#lobby-interface");
    _$containers.iconInterface = document.querySelector("#icon-interface");
    _$containers.rulesInterface = document.querySelector("#rules-interface");
    _$containers.seeAllGamesInterface = document.querySelector("#see-all-games-interface");
    _$containers.errorMessage = document.querySelector(".errormessages p");


    document.querySelector("#join").addEventListener("click", renderJoin);
    document.querySelector("#create").addEventListener("click", renderCreate);
    document.querySelector("#rules").addEventListener("click", renderRules);
    document.querySelector("#rules-interface .back-button").addEventListener("click", backButton);

    _$containers["joinInterface"].querySelector("#show-all-games").addEventListener("click", fetchNonStartedGames);

    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backButton);
    });

    _$containers.seeAllGamesInterface.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function (e) {
            __$containers.seeAllGamesInterface.classList.add("hidden");
            _$co_$containers.joinInterface.style.opacity = "1";
            _$co_$containers.joinInterface.querySelector("#ID").value = e.target.innerText;
        });
    });
}

function renderJoin() {
    _$containers["errorMessage"].innerHTML = "";
    _$containers["errorMessage"].classList.remove("hidden");
    _$containers["startInterface"].classList.add("hidden");
    _$containers["joinInterface"].classList.remove("hidden");

    // join button
    _$containers["joinInterface"].querySelector(".join-button").addEventListener("click", fetchAllGames);
    _$containers["joinInterface"].querySelector("#show-all-games").addEventListener("click", fetchAllGames);

}

function renderCreate() {
    _$containers["errorMessage"].innerHTML = "";
    _$containers["startInterface"].classList.add("hidden");
    _$containers["createInterface"].classList.remove("hidden");
    _$containers["createInterface"].querySelector(".join-button").addEventListener("click", getInputValues);
}


function renderLobby(id, numberOfPlayers, playerNames) {
    // Hide other interfaces for lobby //
    _$containers["joinInterface"].classList.add("hidden");
    _$containers["createInterface"].classList.add("hidden");
    _$containers["lobbyInterface"].classList.remove("hidden");

    _$containers["lobbyInterface"].querySelector("#players").innerText = ""; //prevents over flooding the screen when refreshing
    _$containers["lobbyInterface"].querySelector("span").innerText = id; //Display the ID of current game
    const playersToJoin = numberOfPlayers - playerNames.length;
    _$containers["lobbyInterface"].querySelector("p").innerText = `Waiting for ${playersToJoin} more players to join.`;
    playerNames.forEach(player => {
        const $templateClone = document.querySelector('template').content.firstElementChild.cloneNode(true);
        $templateClone.querySelector('h3').innerText = player.name;
        document.querySelector('#players').insertAdjacentHTML('beforeend', $templateClone.outerHTML);
    });
    // this ads a timeout every 1.5s to refresh the lobby
    // when clicking on the back button, this timeout gets removed.
    const timoutID = setTimeout(loadGameDataForLobby, 1500);
    _$containers.lobbyInterface.querySelector("#back-lobby").addEventListener('click', () => clearTimeout(timoutID));
}

function renderIconPicker(e) {
    _$containers.lobbyInterface.classList.add("hidden");
    _$containers.iconInterface.classList.remove("hidden");
    _$containers.iconInterface.querySelectorAll('img').forEach(item => {
        item.addEventListener('click', event => {
            const icon = event.target.id;
            // this is the currently selected icon.
            _$containers.lobbyInterface.classList.remove("hidden");
            _$containers.iconInterface.classList.add("hidden");
            $clickedIcon.src = `assets/media/${icon}.png`;
            document.querySelector(`${previousScreen} button`).innerHTML = `<img src="assets/media/${icon}.png" alt="${icon}" id="${icon}">`;
        });
    });
}

function renderRules() {
    _$containers["startInterface"].classList.add("hidden");
    _$containers["rulesInterface"].classList.remove("hidden");
}

function renderAllAvailableGames(allGames) {
    _$containers["joinInterface"].style.opacity = "0.2";
    _$containers["seeAllGamesInterface"].classList.remove("hidden");
    // renders all games that are PilsoPoly and that haven't started.
    // also makes the li clickable
    const $ul = _$containers["seeAllGamesInterface"].querySelector('ul');
    $ul.innerHTML = "";
    allGames.forEach(game => {
        $ul.insertAdjacentHTML("beforeend", `<li id="${game.id}"><p class="gameID">${game.id}</p><p>${game.players.length}/${game.numberOfPlayers}</p></li>`);
    });
    const $listItems = $ul.querySelectorAll('li');
    $listItems.forEach(item => item.addEventListener("click", fillInGameID));
}

function backButton() {
    _$containers["startInterface"].classList.remove("hidden");
    _$containers["rulesInterface"].classList.add("hidden");
    _$containers["joinInterface"].classList.add("hidden");
    _$containers["createInterface"].classList.add("hidden");
    _$containers["lobbyInterface"].classList.add("hidden");
    _$containers["errorMessage"].innerHTML = "";
}
