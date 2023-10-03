PilsoPoly is a project I made for school. It is a fully functional, beer themed Monopoly game
in the browser

This is the client that shows the UI of the game and communicates with the [Java Server](https://github.com/LukasOlivier/PilsoPoly-server)


## By [Sibren Eeckhout](), [Niels Soete](https://github.com/EeneeS) [Robin Monsere](https://github.com/robinmonsere) and Myself

## Known Bugs

| Bug behaviour                                                                                                                   | How to reproduce                                                            | Why it hasn't been fixed                                |
|---------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------|
| 2x Go in turn when drawing "Go to start" card                                                                                   | Land on a community or chance tile and draw a "Go To Start" card.           | Minor issue, no consequences for gameplay. Only visual. |
| When a chance / community chest - card redirects you to another tile, the description of the last tile is added twice in "Turn" | Get redirected to another tile by drawing a chance / community chest - card | No consequences for gameplay. Lack of time.             |
| When landing on the "Go to jail" tile, only the second move (in jail) is added                                                  | Land on "Go to jail" tile.                                                  | No consequences for gameplay. Lack of time.             |
| You can still mortgage tiles with houses on the tile.                                                                           | Buy a tile, buy a house on the tile, then mortgage the tile.                | Lack of time.                                           |
| You can still buy/sell houses on mortgaged tiles.                                                                               | Mortgage your tile and then buy/sell houses                                 | Lack of time.                                           |
### token scheme
```Prefix``` + ```_``` + ```unique identifier``` + ```-``` + ```playerName```

ex. ```PilsoPoly_1-Lukas```
