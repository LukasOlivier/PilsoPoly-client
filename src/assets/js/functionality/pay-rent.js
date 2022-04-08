function checkIfPlayerNeedsToPayRent(gameInfo){
    const discriptionOfLastMove = gameInfo.turns.slice(-1)[0].moves;
    if (discriptionOfLastMove[discriptionOfLastMove.length - 1].description === 'should pay rent'){
        makeListOfAllStreetsThatTheLocalPlayerOwnes(gameInfo);
    };
}

function makeListOfAllStreetsThatTheLocalPlayerOwnes(gameInfo){
    const listOfSelfOuningStreets = [];
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        if (player.name === loadFromStorage("name")){
            player.properties.forEach(property => {
                listOfSelfOuningStreets.push(property.property);
            });
        };
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
    fetchFromServer(`/games/${_gameID}/players/${name}/properties/${property}/visitors/${player}/rent`, 'DELETE');
}





















