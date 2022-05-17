"use strict";

function auctionProperty() {
    const auctionDuration = 30;
    const playerName = loadFromStorage("name");
    const currentTile = loadFromStorage("currentTile");
    const body = {
        "start-bid": 0,
        "duration": auctionDuration,
        "tradable": true
    }
    fetchFromServer(`/games/${_gameID}/players/${playerName}/auctions/${currentTile}`, 'POST', body);
    makeBuyPopupHidden();
}

function renderAuctionPopup(gameInfo) {
    const auctionInfo = gameInfo.auction;
    document.querySelector("#property-name").innerHTML = `${auctionInfo.property}`;
    document.querySelector("#highest-bid").innerHTML = `highest bid: ${auctionInfo.highest_bid}`;
    document.querySelector("#duration").innerHTML = `duration: ${auctionInfo.duration}`;
}

function showAuctionPopup() {
    const $dialog = document.querySelector("#auction-property-popup");
    if ( !$dialog.open ) {
        $dialog.showModal();
    }
}

function addOne() {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + 1;
    const body = {
      bidder: loadFromStorage("name"),
        amount: newBid
    };
    fetchFromServer(`/games/${_gameID}/players/TEST/auctions/TEST/bid`, "POST", body);
}

function addTen() {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + 10;
    const body = {
        bidder: loadFromStorage("name"),
        amount: parseInt(newBid)
    };
    fetchFromServer(`/games/${_gameID}/players/TEST/auctions/TEST/bid`, "POST", body);
}

function addHunderd() {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + 100;
    const body = {
        bidder: loadFromStorage("name"),
        amount: parseInt(newBid)
    };
    fetchFromServer(`/games/${_gameID}/players/TEST/auctions/TEST/bid`, "POST", body);
}