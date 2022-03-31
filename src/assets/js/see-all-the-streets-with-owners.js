"use strict";

/*global variable because i saw no way of adding him into the functions*/
const _playersBoughtProperties = {};

/*load the dom in and then start function init*/
document.addEventListener('DOMContentLoaded', init);

/*fetch the streets and the players. if player puts input into the form go to function search*/
function init() {
   const sortregular = "";
   const streetnames = [];

   _token = {token : loadFromStorage("token")};
   _gameID = loadFromStorage("gameId");

   fetchFromServer(`/games/${_gameID}`,'GET')
       .then(players => {
           console.log(players);
           showPlayers(players.players);
       });
   fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnames, sortregular));
   document.querySelector('form').addEventListener('input', searchStreet);
}

/*if there is input, catch it => put it to lower case and go to the runstreets function*/
function searchStreet(e) {
    const streetnamessort = [];
    if (e.target.value) {
        fetchFromServer('/tiles','GET')
            .then(tiles => runStreets(tiles, streetnamessort, e.target.value.toLowerCase()));
    }
    else {
        fetchFromServer('/tiles','GET')
            .then(tiles => runStreets(tiles, streetnamessort, ""));
    }
}


/*filter on go, community, chance, Jail,Tax, Parking and carts that do not have the given letters in it*/
function runStreets(tiles, streetNames, sort) {
    tiles.forEach(street =>{
    if (street.name.includes("Go")) {
        console.log(null);}
    else if (street.name.includes("Community")) {
        console.log(null);}
    else if (street.name.includes("Chance")) {
        console.log(null);}
    else if (street.name.includes("Jail")) {
        console.log(null);}
    else if (street.name.includes("Tax")) {
        console.log(null);}
    else if (street.name.includes("Parking")) {
        console.log(null);}
    else if (street.name.toLowerCase().includes(sort)) {
        streetNames.push(street);
    }
    });
    document.querySelector('.templatediv').innerHTML = "";
    streetNames.forEach(street => renderStreets(street));
}


/* fill in the template with the api results*/
function renderStreets(street) {
    let isBought = false;
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('h2').classList.add(street.color);
    $template.querySelector('h2').innerText = street.name;
    $template.querySelector('li').innerText= "positie:  " + street.position;
    $template.querySelector('li+li').innerText= "cost:  " + street.cost;
    $template.querySelector('li+li+li').innerText= "mortage:  " + street.mortgage;
    $template.querySelector('li+li+li+li').innerText= "rent:  " + street.rent;
    for (const [key, value] of Object.entries(_playersBoughtProperties)) {
        const playername = key;
        value.forEach(propertie => {
            if (propertie === street.name) {
                isBought = true;
                $template.querySelector(`div p`).innerText = "player: " + playername;}});
    }
    if (isBought === false) {
        $template.querySelector(`div p`).innerText = "player: not bought yet";}
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}

/* put the players with their owning streets in to a dictionary. the name as a key value and the street as a list*/
function showPlayers(players) {
    console.log(players);
    players.forEach(player => {
        const nameplayer = player.name;
        const playerStreets = [];
        playerStreets.push(player.properties.forEach(property => playerStreets.push(property.property)));
        _playersBoughtProperties[nameplayer] = playerStreets;
    });
}

