import { SHIP_MAX_SPEED, OBJECT_TYPE, GAMESTATE } from "./constants";
import Rocket from "./rocket";
import Ship from "./ship";
import Game from './game';

const START_POSITION = { x: 100, y: 100};
export default class PlayerShip extends Ship {
  constructor(game: Game) {
    super(game, { width: 40, height: 40 }, START_POSITION, SHIP_MAX_SPEED);
    this.type = OBJECT_TYPE.PLAYER_SHIP;
    this.limitedToGameArea = true;
    this.color = '#00f';
    this.loadImage('assets/player-ship.png');
    this.angle = 90 * Math.PI / 180;
  }

  shoot() {
    const rocketSpeed = (this.speed.x === 0 && this.speed.y === 0) && (this.lastSpeed.x !== 0 || this.lastSpeed.y !== 0) ? this.lastSpeed : this.speed;
    const rocketPosition = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    const rocket = new Rocket(this.game, rocketPosition, rocketSpeed);
    this.game.addObject(rocket);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.exploded) {
      if (this.explosion[this.explosionFrame]) {
        const frame = this.explosion[this.explosionFrame];
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        const dims = frame.dims;
        tempCanvas.width = dims.width;
        tempCanvas.height = dims.height;
        const frameImageData = tempCtx.createImageData(dims.width, dims.height);

        frameImageData.data.set(frame.patch);
        tempCtx.putImageData(frameImageData, 0, 0);

        ctx.drawImage(tempCanvas, this.position.x, this.position.y, this.width, this.height)

        this.explosionFrame++;
      } else {
        this.game.gameState = GAMESTATE.MENU;
      }
    } else {
        this._draw(ctx);
      }
  }
}