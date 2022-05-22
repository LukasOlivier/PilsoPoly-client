"use strict";

function collectDebt(property, player, debtorName) {
    fetchFromServer(`/games/${loadFromStorage("gameId")}/players/${player}/properties/${property}/visitors/${debtorName}/rent`, 'DELETE');
    addActionDescriptionToActivity(`You received money because ${player} is on tile: ${property}`);
}
