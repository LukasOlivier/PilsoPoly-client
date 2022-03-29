'use strict';

function joinGame(){
    const $joinInterface = document.querySelector("#join-interface");
    const id = $joinInterface.querySelector("#ID").value;
    const name = {
        playerName: $joinInterface.querySelector("#name").value
    };
    // these checks dont see errors from the server
    // we can change this when we make our own api server.


    if (checkExistingGames(id, name)) {
       return;
    }
    if (checkName(name)) {
        return;
    }
    console.log("Fetching from server");
    fetchFromServer(`/games/${id}/players`,'POST', name)
        .then(response => console.log(response.token))
        // this token is your security token.
       .catch(errorHandler);
}
function checkName(name){
    try {
        if (name.playerName === "") {
            throw "Your player name cant be empty!";
        }
    }
    catch (err) {
        errorHandling(err);
    }
}

function checkExistingGames(id, name){
    document.querySelector(".errormessages p").innerText = "";
    fetchFromServer(`/games?prefix=${id}`)
        .then(response => {
            if (response.length === 0) {
                throw "there is no game with this code";
            }
            else if (response.length > 1) {
                throw "Is your code correct";
            }
            else if (response[0].started === true) {
                throw "Game already started!";
            }
            response[0].players.forEach(player => {
                if (player.name === name.playerName) {
                    throw "The name is already in use.";
                }
            });
        })
        .catch(errorHandler);
}
function errorHandling(errormessage) {
    document.querySelector(".errormessages p").innerText = errormessage;
}
