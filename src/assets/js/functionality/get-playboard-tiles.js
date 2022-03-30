let _tiles = null;

function getTiles() {
    fetchFromServer("/tiles", "GET")
        .then(tiles => {
            _tiles = tiles;
            renderCards();
        });
}