// "use strict";

let _playerPositionID = null;
let _tempPlayerPositionID = null;
let _$giveUpPopup = "";
let _currentGameState = null;
function renderMainPage() {

    _$giveUpPopup = document.querySelector("#give-up-popup");

    _token = {token: loadFromStorage("token")};
    _gameID = loadFromStorage("gameId");
    _name = loadFromStorage("name")

    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("main").addEventListener("wheel", wheelEvent);
    document.addEventListener('keydown', keyPressEvent);
    document.querySelector("#trade").addEventListener("click", trade);
    document.querySelector("#back-to-current-position button").addEventListener("click", backToCurrentPosition);
    document.querySelector("#give-up").addEventListener("click", giveUp);
    document.querySelector("#give-up-deny").addEventListener("click", giveUpDeny);
    document.querySelector("#give-up-confirm").addEventListener("click", giveUpConfirm);


    document.querySelector("#roll-dice").addEventListener("click", rollDice);

    // mijn idee => render alles voor eerste keer -> fetch eenmalig en steek dit in _currenGameState
    // Daarna, start met polling en steek daar dan een hoop switch cases in,
    // ALS er iets verandert, render enkel dat opnieuw...
    getTiles();
    renderFirstTime();

}

function renderFirstTime(){
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            renderPlayerInfo(res);
            checkIfPlayerBankrupt(res);
            checkIfPlayerCanRoll(res);
            _currentGameState = res;
            pollingGameState();
        })
}


function pollingGameState(){
    // This needs to be on a diff place for sure!!
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            const newGameState = res;
            checkGameStates(newGameState)
            setTimeout(pollingGameState, 10000)
        })
}

function checkGameStates(newState){
    if (newState.currentPlayer !== _currentGameState.currentPlayer) {
        console.log('Its your turn')
        checkIfPlayerCanRoll(newState)
    }
}

function endTurn() {
    console.log("end");
}

function renderCards() {
    removeTemplate("#cards-parent article");
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            res.players.forEach(function (player) {
                if (player.name === playerName) {
                    currentTileName = player.currentTile;
                }
            });
            loadFromStorage("tiles").forEach(function (tile) {
                if (tile.name === currentTileName) {
                    _tempPlayerPositionID = tile.position;
                    _playerPositionID = tile.position;
                    getCardById(tile.position);
                }
            });
        });
}

function getCardById(id) {
    const toShow = createToShow(id, id - 2, id + 3);
    for (const cardId of toShow) {
        if (cardId === id) {
            showCards(loadFromStorage("tiles")[cardId], true);
        } else {
            showCards(loadFromStorage("tiles")[cardId], false);
        }
    }
}

function createToShow(id, firstId, lastId) {
    const toShow = [];
    if (id === 0) {
        toShow.push(38, 39, 0, 1, 2);
    } else if (id === 1) {
        toShow.push(39, 0, 1, 2, 3);
    } else if (id === 38) {
        toShow.push(36, 37, 38, 39, 0);
    } else if (id === 39) {
        toShow.push(37, 38, 39, 0, 1);
    } else {
        for (let i = firstId; i < lastId; i++) {
            toShow.push(i);
        }
    }
    return toShow;
}

function showCards(cardInfo, middle) {
    switch (cardInfo.type) {
        case "street":
            renderNormalCard(cardInfo, middle);
            break;
        case "utility":
            renderUtilityCard(cardInfo, middle);
            break;
        case "railroad":
            renderRailroad(cardInfo, middle);
            break;
        default:
            renderSpecialCard(cardInfo, middle);
            return;
    }
}

function renderPlayerInfo(res) {
    res.players.forEach(function (player) {
        const $template = document.querySelector('.player-info-template').content.firstElementChild.cloneNode(true);
        $template.classList.add(player.name.toLowerCase());
        $template.querySelector(".player-balance").innerText = `${player.name}: ${player.money}`;
        document.querySelector('footer').insertAdjacentHTML("beforeend", $template.outerHTML);
    });
    renderPlayerProperties();
}

function renderPlayerProperties() {
    const playerProperties = loadFromStorage("playerProperties");
    for (const player in playerProperties) {
        if (player) {
            const $container = document.querySelector(`.${player.toLowerCase()}`);
            playerProperties[player].forEach(function (property) {
                if (property !== null) {
                    $container.querySelector(`.${property.toLowerCase().replace(/\s/g, "-")}`).classList.remove("not-bought");
                }
            });
        }
    }
}

function giveUp() {
    _$giveUpPopup.classList.remove("hidden");
    document.querySelector("section").classList.add("hidden");
}

function giveUpDeny() {
    document.querySelector("section").classList.remove("hidden");
    _$giveUpPopup.classList.add("hidden");
}

function giveUpConfirm() {
    window.location.href = "lose-screen.html";
}

function trade() {
    console.log("trade");
}

function checkIfPlayerBankrupt(response) {
    response.players.forEach(player => {
        if (player.bankrupt) {
            const $container = document.querySelector(`.${player.name}`);
            $container.style.opacity = "0.5";
            $container.querySelector("p").style.color = "red";
            $container.querySelector("p").innerHTML = `${player.name}: BANKRUPT`;
        }
    });
}


