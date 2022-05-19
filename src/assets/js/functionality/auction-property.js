"use strict";

function auctionProperty() {
    const playerName = loadFromStorage("name");
    const currentTile = _currentMoveInfo.tileName;
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTile}`, 'DELETE');
    makeBuyPopupHidden();
}

function renderAuctionPopup(gameInfo) {
    const auctionInfo = gameInfo.auction;
    isYourTurnToBid(auctionInfo.lastBidder);
    // const playerBalance = findPlayerBalance(gameInfo.players);
    // canBidHigher(playerBalance, auctionInfo.highestBid);
    document.querySelector("#property-name").innerHTML = `${auctionInfo.property}`;
    document.querySelector("#last-bidder").innerHTML = `last bidder: ${auctionInfo.lastBidder}`;
    document.querySelector("#highest-bid").innerHTML = `highest bid: ${auctionInfo.highestBid}`;
    document.querySelector("#duration").innerHTML = `duration: ${auctionInfo.duration}`;
}

function isYourTurnToBid(lastBidder) {
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

// function canBidHigher(playerBalance, highestBid) {
//     const $add1Btn = document.querySelector("#add-1");
//     const $add10Btn = document.querySelector("#add-10");
//     const $add100Btn = document.querySelector("#add-100");
//     if ( playerBalance + 1 < highestBid ) {
//         $add1Btn.disabled = true;
//     } else {
//         $add1Btn.disabled = false;
//     }
//     if ( playerBalance + 10 < highestBid ) {
//         $add10Btn.disabled = true;
//     } else {
//         $add10Btn.disabled = false;
//     }
//     if ( playerBalance + 100 < highestBid ) {
//         $add100Btn.disabled = true;
//     } else {
//         $add100Btn.disabled = false;
//     }
// }

function findPlayerBalance(players) {
    const currentPlayer = loadFromStorage("name");
    players.forEach(player => {
        if ( player.name === currentPlayer ) {
            return player.money;
        }
    });
    return null;
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
    fetchFromServer(`/games/${_gameID}/bank/auctions/property/bid`, "POST", body);
}
