function addEventListeners(){
    _$interfaces.startInterface.querySelector("#join").addEventListener("click", renderJoin);
    _$interfaces.startInterface.querySelector("#create").addEventListener("click", renderCreate);
    _$interfaces.startInterface.querySelector("#rules").addEventListener("click", renderRules);
    _$interfaces.joinInterface.querySelector(".join-button").addEventListener("click", fetchAllGames);
    _$interfaces.joinInterface.querySelector("#show-all-games").addEventListener("click", fetchNonStartedGames);
    document.querySelectorAll('.back-button').forEach(item => {
        item.addEventListener('click', backToMainMenu);
    });
    document.addEventListener('click', function (e) {
        if (e.target !== _$interfaces.seeAllGamesInterface) {
            _$interfaces.seeAllGamesInterface.classList.add("hidden");
            _$interfaces.joinInterface.classList.remove("reduce-opacity");
        }
    });
}
