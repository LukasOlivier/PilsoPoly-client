"use strict";

function auctionProperty() {
    const auctionDuration = 30;
    const playerName = loadFromStorage("name");
    const currentTile = _lastMoveInfo.tileName;
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
    checkIfCanBid(auctionInfo.lastBidder);
    document.querySelector("#property-name").innerHTML = `${auctionInfo.property}`;
    document.querySelector("#last-bidder").innerHTML = `last bidder: ${auctionInfo.lastBidder}`;
    document.querySelector("#highest-bid").innerHTML = `highest bid: ${auctionInfo.highestBid}`;
    document.querySelector("#duration").innerHTML = `duration: ${auctionInfo.duration}`;
}

function checkIfCanBid(last_bidder) {
    console.log(last_bidder);
    const $buttons = document.querySelectorAll("#auction-property-popup button");
    console.log(last_bidder, loadFromStorage("name"));
    if ( last_bidder === loadFromStorage("name") ) {
        $buttons.forEach(button => {
            console.log($buttons);
            button.disabled = true;
        });
    } else {
        console.log($buttons);
        $buttons.forEach(button => {
            button.disabled = false;
        });
    }
}

function showAuctionPopup() {
    const $dialog = document.querySelector("#auction-property-popup");
    if ( !$dialog.open ) {
        $dialog.showModal();
    }
}

function hideAuctionPopup() {
    const $dialog = document.querySelector("#auction-property-popup");
    if ( $dialog.open ) {
        $dialog.close();
    }
}

function addOne() {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + 1;
    const body = {
      bidder: loadFromStorage("name"),
        amount: newBid
    };
    placeBidOnAuction(body)
}

function addTen() {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + 10;
    const body = {
        bidder: loadFromStorage("name"),
        amount: parseInt(newBid)
    };
    placeBidOnAuction(body)
}

function addHunderd() {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + 100;
    const body = {
        bidder: loadFromStorage("name"),
        amount: parseInt(newBid)
    };
    placeBidOnAuction(body)
}

function placeBidOnAuction(body) {
    fetchFromServer(`/games/${_gameID}/players/TEST/auctions/TEST/bid`, "POST", body);
}