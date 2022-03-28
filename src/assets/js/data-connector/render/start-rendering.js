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
        console.log(id);
    });

}
function renderCreate(){
    console.log("Now in renderCreate function");
}
function renderRules(){
    console.log("Now in renderRules function");
}
