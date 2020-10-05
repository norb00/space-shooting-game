import { debounce } from './utils';
import Game from './game';
import PlayerShip from './player-ship';

export default class KeyInputHandler {
  constructor(ship: PlayerShip, game: Game) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      // console.log('keydown', ship.speed, event.code);
      switch (event.code) {
        case 'ArrowLeft':
          ship.moveLeft();
          break;

        case 'ArrowUp':
          ship.moveUp();
          break;

        case 'ArrowRight':
          ship.moveRight();
          break;

        case 'ArrowDown':
          ship.moveDown();
          break;

        case 'Space':
          ship.shoot();
          break;

        case 'KeyS':
          game.start();
          break;

        case 'KeyM':
          game.menu();
          break;
  
      }
    });

    document.addEventListener('keyup', debounce((event: KeyboardEvent) => {
      // console.log('keyup', ship.speed, event.code);
      switch (event.code) {
        case 'ArrowLeft':
          // if (ship.speed.x < 0) 
          ship.stop();
          break;

        case 'ArrowUp':
          // if (ship.speed.y < 0) 
          ship.stop();
          break;

        case 'ArrowRight':
          // if (ship.speed.x > 0) 
          ship.stop();
          break;

        case 'ArrowDown':
          // if (ship.speed.y > 0) 
          ship.stop();
          break;
      }
    }, 50));
  }
}
