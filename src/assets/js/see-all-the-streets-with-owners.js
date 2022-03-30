"use strict";

document.addEventListener('DOMContentLoaded',init);

function init()
{
   let sortregular = "";
   let streetnames = [];
   fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnames, sortregular));
   fetchFromServer('/games/dummy','GET').then(players => showPlayers(players.players));
   document.querySelector('form').addEventListener('input', searchstreet);
}

/*if there is input*/
function searchstreet(e)
{
    let streetnamessort = [];
    let sort = "";
    if (e.target.value)
    {
        sort = e.target.value;
        console.log(sort);
        fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnamessort, sort));
    }
    else
    {fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnamessort, sort));}
}


/*filter on go, community, chance and carts that do not have the given letters in it*/
function runStreets(tiles, streetnames, sort)
{
    tiles.forEach(street =>{
    if (street.name.includes("Go"))
    {}
    else if (street.name.includes("Community"))
    {}
    else if (street.name.includes("Chance"))
    {}
    else if (street.name.includes(sort))
    {
        streetnames.push(street);
    }
    });
    document.querySelector('.templatediv').innerHTML = "";
    streetnames.forEach(street => render_streets(street));
}


/* fill in the template with the api results*/
function render_streets(street)
{
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('h2').innerText = street.name;
    $template.querySelector('li').innerText= "positie:  " + street.position;
    $template.querySelector('li+li').innerText= "cost:  " + street.cost;
    $template.querySelector('li+li+li').innerText= "mortage:  " + street.mortgage;
    $template.querySelector('li+li+li+li').innerText= "rent:  " + street.rent;
    $template.querySelector(`div p`).innerText = "player:";
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function showPlayers(players)
{
    let playerstreetsdict = [];
    players.forEach(player =>
    {
        let playerstreets = [];
        playerstreets.push(player.name);
        playerstreets.push(player.properties.forEach(property => playerstreets.push(property.property)));
        playerstreetsdict.push(playerstreets);
    });
    console.log(playerstreetsdict)
}