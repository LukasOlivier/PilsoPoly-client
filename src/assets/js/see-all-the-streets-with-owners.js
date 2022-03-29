"use strict";

document.addEventListener('DOMContentLoaded',init);

function init()
{
   const streets = fetchFromServer('/tiles','GET').then(tiles => runStreets(tiles)).catch(errorHandler)
}



function runStreets(tiles)
{
    tiles.forEach(street => render_streets(street));
}

function render_streets(street)
{
    if (street.name.includes("Go"))
    {
        return;
    }
    if (street.name.includes("Community"))
    {
        return;
    }
    if (street.name.includes("Chance"))
    {
        return;
    }
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('h2').innerText = street.name;
    $template.querySelector('li').innerText= "positie:  " + street.position;
    $template.querySelector('li+li').innerText= "cost:  " + street.cost;
    $template.querySelector('li+li+li').innerText= "mortage:  " + street.mortage;
    $template.querySelector('li+li+li+li').innerText= "rent:  " + street.rent;
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}