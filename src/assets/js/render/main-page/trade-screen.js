"use strict";

let _values = {
    player1 : 0,
    player2 : 0
};

function initTrade() {
    const currentPlayer = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}`)
        .then(res => {
            document.querySelector("#players-to-trade").innerHTML = "";
            linkPlayersAndStreets(res.players);
            res.players.forEach(function (player) {
                if (player.name !== currentPlayer) {
                    const html = `<li id="player-${player.name}">${player.name}</li>`;
                    document.querySelector("#players-to-trade").insertAdjacentHTML("beforeend", html);
                }
            });
        });
    const playerDropdown = document.querySelector("#trade-select-player-disabled");
    playerDropdown.showModal();
}

function cancelSelectPlayer() {
    const playerDropdown = document.querySelector("#trade-select-player");
    playerDropdown.close();
}

function selectPlayer(e) {
    if (e.target.nodeName === "LI") {
        startTrade(e.target.innerText.toLowerCase());
    }
}

function startTrade(otherPlayer) {
    cancelSelectPlayer();
    _values.player1 = 0;
    _values.player2 = 0;
    showTradingPage(otherPlayer);
}

function cancelTrading() {

    document.querySelector("#player1 ul").innerHTML = "";
    document.querySelector("#player2 ul").innerHTML = "";

    document.querySelector("#offers ul").innerHTML = "";
    document.querySelector("#wants ul").innerHTML = "";

    const tradingDialog = document.querySelector("#trade-dialog");
    tradingDialog.close();
}

function showTradingPage(otherPlayer) {

    const currentPlayer = loadFromStorage("name");

    const $player1 = document.querySelector("#player1");
    const $player2 = document.querySelector("#player2");

    $player1.querySelector("h4").innerHTML = currentPlayer;
    $player2.querySelector("h4").innerHTML = otherPlayer;

    renderTradableCards(currentPlayer, "#player1");
    renderTradableCards(otherPlayer, "#player2");

    const tradingDialog = document.querySelector("#trade-dialog");
    tradingDialog.showModal();
}

function renderTradableCards(player, id) {
    const playerProperties = loadFromStorage("playerProperties");
    playerProperties[player].forEach(function (property) {
        const html = `<li>${property.name}</li>`;
        document.querySelector(`${id} ul`).insertAdjacentHTML("beforeend", html);
    });
}

function addToOffers(e) {
    if (e.target.nodeName === "LI") {
        if (!checkIfSelected(e.target.innerText, "#offers")) {
            addToTotalValue(e.target.innerText, "player1");
            const html = `<li>${e.target.innerText}</li>`;
            document.querySelector("#offers ul").insertAdjacentHTML("beforeend", html);
        }
    }
}

function addToWants(e) {
    if (e.target.nodeName === "LI") {
        if (!checkIfSelected(e.target.innerText, "#wants")) {
            addToTotalValue(e.target.innerText, "player2");
            const html = `<li>${e.target.innerText}</li>`;
            document.querySelector("#wants ul").insertAdjacentHTML("beforeend", html);
        }
    }
}

function checkIfSelected(cardName, id) {
    let selected = false;
    const cards = document.querySelectorAll(`${id} ul li`);
    cards.forEach(function (card) {
        if (card.innerHTML === cardName) {
            selected = true;
        }
    });
    return selected;
}

function addToTotalValue(cardName, player) {
    const cardValue = getValueOfCard(cardName);
    _values[player] += cardValue;
    const id = `#${player}-value`;
    document.querySelector(id).innerHTML = `M${_values[player]}`;
}

function getValueOfCard(cardName) {
    let cost = null;
    loadFromStorage("tiles").forEach(function (tile) {
        if (tile.name === cardName) {
            cost = tile.cost;
        }
    });
    return cost;
}

function sendTrade() {
    const body = getTradeInfo();
    fetchFromServer(`/games/${_gameID}/players/${body.player}/trades`, "POST", body)
        .then(function (res) {
            return res;
        })
        .catch(errorHandler);
}

function getTradeInfo() {
    const offerList = [];
    const returnList = [];
    document.querySelectorAll("#player1 li").forEach(function (card) {
        offerList.push(card.innerHTML);
    });
    document.querySelectorAll("#player2 li").forEach(function (card) {
        returnList.push(card.innerHTML);
    });
    return {
        player: document.querySelector("#player2 h4").innerHTML,
        offer: offerList,
        return: returnList
    };
}
