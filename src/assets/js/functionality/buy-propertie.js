function seeIfStreetIsBuyable()
{
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            res.players.forEach(function (player) {
                if (player.name === playerName) {
                    currentTileName = player.currentTile;
                    saveToStorage("currentTileName", currentTileName);
                    const tiles = loadFromStorage("tiles");
                    tiles.forEach(street => {
                        if (street.name === currentTileName){
                            if (street.type === "utility" || street.type === "railroad" || street.type === "street"){
                                document.querySelector(`#buy-propertie-popup`).classList.remove("hidden");
                            }
                        }
                    });
                }
            });
        });
}



function chooseBuyOrAuction()
{
    seeIfStreetIsBuyable();
    document.querySelector(`#buy-propertie-popup .Buy`).addEventListener('click', buyPropertie);
    document.querySelector(`#buy-propertie-popup .Auction`).addEventListener('click', auctionPropertie);
}

function buyPropertie() {
    const currentTileName = loadFromStorage("currentTileName");
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTileName}`,'POST');
    fetchFromServer(`/games/${_gameID}`, 'GET')
        .then(players => {
            linkPlayersAndStreets(players.players);
        });
}

function auctionPropertie() {}
