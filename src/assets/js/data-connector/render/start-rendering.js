"use strict";




function initStartScreen() {
    const $startInterface = document.querySelector("#start-interface");

    document.querySelector("#join").addEventListener("click", function (){
        $startInterface.classList.toggle("hidden");
        renderJoin();
    });
    document.querySelector("#create").addEventListener("click",function (){
        $startInterface.classList.toggle("hidden");
        renderCreate();
    });
    document.querySelector("#rules").addEventListener("click", function (){
        $startInterface.classList.toggle("hidden");
        renderRules();
    });
    document.querySelector("#icon-picker").addEventListener("click", function (){
        document.querySelector("#join-interface").classList.toggle("hidden");
        renderIconPicker();
    });
}

function renderJoin(){
    console.log("Now in renderJoin function");
    // back button
    const $joinInterface = document.querySelector("#join-interface");
    $joinInterface.classList.toggle("hidden");
    $joinInterface.querySelector("#back-button").addEventListener("click", function (){
       $joinInterface.classList.add("hidden");
       document.querySelector("#start-interface").classList.remove("hidden");
    });
    // join button
    $joinInterface.querySelector("#join-button").addEventListener("click", function (){
        const id = $joinInterface.querySelector("#ID").value;
        const name = {
            playerName: $joinInterface.querySelector("#name").value
        };
        console.log(id);
        console.log(name);
        fetchFromServer(`/games/${id}/players`,'POST', name)
            .then(response => console.log(response.token))
            // this token is your security token.
            .catch(errorHandler);
    });

}

function renderIconPicker(){
    document.querySelector("#icon-interface").classList.toggle("hidden");
    // gives all icons an click event listener
    document.querySelectorAll('img').forEach(item => {
        item.addEventListener('click', event => {
            const icon = event.target.id;
            // this is the currently selected icon.
            document.querySelector("#player-options button").innerHTML = `<img src="assets/media/${icon}.png" alt="${icon}" id="${icon}">`;
            document.querySelector("#icon-interface").classList.add("hidden");
            document.querySelector("#join-interface").classList.remove("hidden");

        });
    });
}
function renderCreate(){
    console.log("Now in renderCreate function");
}
function renderRules(){
    console.log("Now in renderRules function");
}
