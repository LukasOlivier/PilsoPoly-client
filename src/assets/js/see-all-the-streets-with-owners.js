"use strict";
const playerstreetsdict = [];
document.addEventListener('DOMContentLoaded',init);

function init()
{
   const sortregular = "";
   const streetnames = [];
   fetchFromServer('/games/dummy','GET').then(players => showPlayers(players.players));
   fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles, streetnames, sortregular));
   document.querySelector('form').addEventListener('input', searchstreet);
}

/*if there is input*/
function searchstreet(e)
{
    let streetnamessort = [];
    let sort = "";
    if (e.target.value)
    {
        sort = e.target.value.toLowerCase();
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
    else if (street.name.toLowerCase().includes(sort))
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
    let isbought = false;
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('h2').innerText = street.name;
    $template.querySelector('li').innerText= "positie:  " + street.position;
    $template.querySelector('li+li').innerText= "cost:  " + street.cost;
    $template.querySelector('li+li+li').innerText= "mortage:  " + street.mortgage;
    $template.querySelector('li+li+li+li').innerText= "rent:  " + street.rent;
    playerstreetsdict.forEach(player => {
        let playername = player[0];
        player.forEach(ownedstreet =>
        {
            if (ownedstreet === street.name)
            {
                isbought = true;
                $template.querySelector(`div p`).innerText = "player: " + playername;
            }
        });
    });
    if (isbought === false)
    {
        $template.querySelector(`div p`).innerText = "player: not bought yet";
    }
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}

/* put the players with their owning streets in to a dictionary.*/
function showPlayers(players)
{
    players.forEach(player =>
    {
        let playerstreets = [];
        playerstreets.push(player.name);
        playerstreets.push(player.properties.forEach(property => playerstreets.push(property.property)));
        playerstreetsdict.push(playerstreets);
    });
    console.log(playerstreetsdict);
}

