# Space Shooting game

Bagi Norbert (bagi.norbert@gmail.com)
+36 20 595 0284

> Unfortunately I didn't have too much time to deep-dive into Pixi.js, so I used Canvas for drawing

Implemented features:
  - Splash screen for 2 seconds with rotating space ship logo
  - Menu screen with 4 button 
    - GAME1, GAME2, GAME3: Start the game
    - EXIT: navigate to [PlayNGo](https://www.playngo.com/)
  - Using the game:
    - move the ship with the keyboard Arrows (stop by release the arrow key)
    - fire a rocket by pressing SPACE (rocket will be shot to the moving direction, or if the ship stops, the last moved direction)
    - if a rocket hits an enemy ship, it will blow up and emitting random particles
    - if the player's ship crashes any enemy ship, it will explode and goes back to Menu screen.

### Installation and local run

Install the dependencies and devDependencies and start the server.

```sh
$ cd space-shooting-game
$ npm install
$ npm run start
```

Or check it online:
[DEMO](http://ottsevoltal.hu/space-shooting-game/)

### Used 3rd party library

(For the explosion animation I used animated GIF)

| Plugin | README |
| ------ | ------ |
| [gifuct-js](https://github.com/matt-way/gifuct-js) | Decode GIF frames to show animated GIF's on Canvas |

