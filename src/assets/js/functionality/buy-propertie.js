
function chooseBuyOrAuction()
{
    document.querySelector(`#buy-propertie-popup .Buy`).addEventListener('click', buyPropertie);
    document.querySelector(`#-propertie-popup .Auction`).addEventListener('click', auctionPropertie);
}

function buyPropertie() {
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            res.players.forEach(function (player) {
                if (player.name === playerName) {
                    currentTileName = player.currentTile;
                    console.log(currentTileName);
                    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTileName}`,'POST');
                }
            });
        });
}

function auctionPropertie() {
    console.log("auctoin");
}