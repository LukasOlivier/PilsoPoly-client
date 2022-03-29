"use strict";

document.addEventListener('DOMContentLoaded',init);

function init()
{
    /*console.log(testConnection());*/
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('h2').innerText = "streetname";
    document.querySelector('.templatediv').insertAdjacentHTML("beforeend", $template.outerHTML);
}
