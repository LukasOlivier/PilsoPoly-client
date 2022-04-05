function seeIfStreetIsBuyable() {
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


//document.querySelector(`#buy-propertie-popup .Auction`).addEventListener('click', auctionPropertie); add this when auction comes to
function chooseBuyOrAuction()
{
    seeIfStreetIsBuyable();
    console.log(loadFromStorage("playerProperties"));
    console.log(loadFromStorage("tiles"));
    document.querySelector(`#buy-propertie-popup .Buy`).addEventListener('click', buyPropertie);
}

function buyPropertie() {
    const currentTileName = loadFromStorage("currentTileName");
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTileName}`,'POST');
    updatePlayerProperties();
}

function updatePlayerProperties(){
    fetchFromServer(`/games/${_gameID}`, 'GET')
        .then(players => {
            linkPlayersAndStreets(players.players);
            console.log("het werkt");
        });
    document.querySelector(`#buy-propertie-popup`).classList.add("hidden");
}


