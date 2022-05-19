"use strict";

function auctionProperty() {
    const playerName = loadFromStorage("name");
    const currentTile = _currentMoveInfo.tileName;
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTile}`, 'DELETE');
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

function checkIfCanBid(lastBidder) {
    const $buttons = document.querySelectorAll("#auction-property-popup button");
    if (lastBidder === loadFromStorage("name")) {
        $buttons.forEach(button => {
            button.disabled = true;
            document.querySelector("#last-bidder-message").classList.remove("hidden");
        });
    } else {
        $buttons.forEach(button => {
            button.disabled = false;
            document.querySelector("#last-bidder-message").classList.add("hidden");
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

function addAmount(amount) {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + amount;
    const body = {
        bidder: loadFromStorage("name"),
        amount: newBid
    };
    placeBidOnAuction(body)
}

function placeBidOnAuction(body) {
    fetchFromServer(`/games/${_gameID}/players/TEST/auctions/TEST/bid`, "POST", body);
}
