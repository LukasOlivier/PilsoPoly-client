// choose if you want to buy or if you want to auction
function chooseBuyOrAuction()
{
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
    refreshPage();
}

// refresh the page so that the bought tiles automatically update
function refreshPage(){
    makeBuyPoppupHidden();
    location.reload();
}

// make the div where you can push the button buy display none
function makeBuyPoppupHidden(){
    document.querySelector(`#buy-propertie-popup`).classList.add("hidden");
}

// make the div where you can push the button buy pop up
function makeBuyPoppupNotHidden(){
    document.querySelector(`#buy-propertie-popup`).classList.remove("hidden");
}




