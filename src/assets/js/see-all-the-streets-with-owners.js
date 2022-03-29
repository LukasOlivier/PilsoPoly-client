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
    console.log(street.name);
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('h2').innerText = street.name;
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}