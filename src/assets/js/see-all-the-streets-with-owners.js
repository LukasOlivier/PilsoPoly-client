"use strict";

/*global variable because i saw no way of adding him into the functions*/
const _playersBoughtProperties = {};

/*load the dom in and then start function init*/
document.addEventListener('DOMContentLoaded',init);

/*fetch the streets and the players. if player puts input into the form go to function search*/
function init() {
   const sortregular = "";
   const streetnames = [];
   fetchFromServer(`/games/${loadFromStorage("gameId")}`,'GET').then(players => showPlayers(players.players));
   fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnames, sortregular));
   document.querySelector('form').addEventListener('input', searchstreet);
}

/*if there is input, catch it => put it to lower case and go to the runstreets function*/
function searchstreet(e) {
    const streetnamessort = [];
    let sort = "";
    if (e.target.value)
    {
        sort = e.target.value.toLowerCase();
        fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnamessort, sort));
    }
    else
    {fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnamessort, sort));}
}


/*filter on go, community, chance, Jail,Tax, Parking and carts that do not have the given letters in it*/
function runStreets(tiles, streetnames, sort) {
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
        streetnames.push(street);
    }
    });
    document.querySelector('.templatediv').innerHTML = "";
    streetnames.forEach(street => renderStreets(street));
}


/* fill in the template with the api results*/
function renderStreets(street) {
    let isbought = false;
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
                isbought = true;
                $template.querySelector(`div p`).innerText = "player: " + playername;}});
    }
    if (isbought === false) {
        $template.querySelector(`div p`).innerText = "player: not bought yet";}
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}

/* put the players with their owning streets in to a dictionary. the name as a key value and the street as a list*/
function showPlayers(players) {
    players.forEach(player => {
        const nameplayer = player.name;
        const playerstreets = [];
        playerstreets.push(player.properties.forEach(property => playerstreets.push(property.property)));
        _playersBoughtProperties[nameplayer] = playerstreets;
    });
}

