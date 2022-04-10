function checkIfPlayerNeedsToPayRent(gameInfo){
    if (gameInfo.turns.length !== 0){
        const discriptionOfLastMove = gameInfo.turns.slice(-1)[0].moves;
        if (discriptionOfLastMove[discriptionOfLastMove.length - 1].description === 'should pay rent'){
            makeListOfAllStreetsThatTheLocalPlayerOwnes(gameInfo);
        }
    }
    else {
        saveToStorage("rent", ``);
    }
}

function makeListOfAllStreetsThatTheLocalPlayerOwnes(gameInfo){
    const listOfSelfOuningStreets = [];
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        if (player.name === loadFromStorage("name")){
            player.properties.forEach(property => {
                listOfSelfOuningStreets.push(property.property);
            });
        }
    });
    checkNamePlayerBoughtStreet(gameInfo, listOfSelfOuningStreets);
}

function checkNamePlayerBoughtStreet(gameInfo, listOfSelfOuningStreets){
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        if (player.name !== loadFromStorage("name")){
            listOfSelfOuningStreets.forEach(property => {
                if (player.currentTile === property){
                    collectDebt(property , player.name, loadFromStorage("name"));
                }
            });
        }
    });
}

function collectDebt(property , player, name){
    if (`${name}${property}${player}` !== loadFromStorage("rent")){
        fetchFromServer(`/games/${_gameID}/players/${name}/properties/${property}/visitors/${player}/rent`, 'DELETE');
        saveToStorage("rent", `${name}${property}${player}`);
    }
}

function removeHiddenClassToPayRentDiv(){
    document.querySelector(`#pay-rent`).classList.remove("hidden");
    setTimeout(addHiddenClassToPayRentDiv, 5000);
}

function addHiddenClassToPayRentDiv(){
    document.querySelector(`#pay-rent`).classList.add("hidden");
}


















