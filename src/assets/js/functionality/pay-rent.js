"use strict";

function collectDebt(property, player, debtorName) {
    saveToStorage("debtor",player);
    fetchFromServer(`/games/${loadFromStorage("gameId")}/players/${player}/properties/${property}/visitors/${debtorName}/rent`, 'DELETE');
    saveToStorage("rent", `${name}${property}${player}`);
    addActionDescriptionToActivity(`You received money because ${player} is on tile: ${property}`);
}
