function collectDebt(property , player, debtorName){
    if (`${debtorName}${property}${player}` !== loadFromStorage("rent")){
        fetchFromServer(`/games/${_gameID}/players/${player}/properties/${property}/visitors/${debtorName}/rent`, 'DELETE');
        saveToStorage("rent", `${name}${property}${player}`);
        addActionDescriptionToActivity(`You received money because ${player} is on tile: ${property}`);
    }
}


















