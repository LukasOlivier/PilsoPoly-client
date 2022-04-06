// check if the currentile is buyable and upload the tile to the local storage
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
                                checkIfStreetIsAlreadyBought(currentTileName, playerName);
                            }
                        }
                    });
                }
            });
        });
}

// check if the street is already bought or not
function checkIfStreetIsAlreadyBought(currentTileName, playerName){
    const listOfAllBoughtStreets = loadFromStorage("playerProperties");
    let boolean = true;
    for (const player in listOfAllBoughtStreets) {
        if (player){
            listOfAllBoughtStreets[player].forEach(propertie => {
                if (propertie.name === currentTileName){
                    boolean = false;
                    document.querySelector(`#buy-propertie-popup`).classList.add("hidden");
                    if (player !== playerName){
                        playerNeedsToPayRent();
                    }
                }
            });
        }
    }
    if (boolean === true){
        chooseBuyOrAuction();
    }
}

// choose if you want to buy or if you want to auction
function chooseBuyOrAuction()
{
    seeIfStreetIsBuyable();
    document.querySelector(`#buy-propertie-popup .Buy`).addEventListener('click', buyPropertie);
}

// buy the propertie
function buyPropertie() {
    const currentTileName = loadFromStorage("currentTileName");
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTileName}`,'POST');
    updatePlayerProperties();
}


// update the playerpropertie dictionary in the local storage
function updatePlayerProperties(){
    fetchFromServer(`/games/${_gameID}`, 'GET')
        .then(players => {
            linkPlayersAndStreets(players.players);
        });
    document.querySelector(`#buy-propertie-popup`).classList.add("hidden");
}


function playerNeedsToPayRent(){
    console.log("pay rent functionality comes here");
}
