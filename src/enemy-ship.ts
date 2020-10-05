import { detectCollision, outsideOfGame, randomIntFromInterval, plusOrMinus } from "./utils";
import { OBJECT_TYPE } from "./constants";
import ExplodedShip from './exploded-ship';
import Game from "./game";
import Ship from "./ship";

export default class EnemyShip extends Ship {

  constructor(game: Game) {
    const startingPositionY: number = randomIntFromInterval(0, 600); 
    super(game, { width: 30, height: 30}, { x: 700, y: startingPositionY }, { x: -1, y: 0});
    this.speed = { x: -1, y: 0};
    this.type = OBJECT_TYPE.ENEMY_SHIP;
    this.color = '#0f0';
    this.loadImage('assets/alien-ship2.png');
    setInterval(() => {
      this.randomWay();
    }, 700);
  }

  randomWay() {
    this.speed.x = plusOrMinus();
    this.speed.y = plusOrMinus();
  }

  update() {
    // this.randomWay();
    this.speedUpdate();
    if (outsideOfGame(this, this.game)){
      this.isDeleted = true;
    } else {
      const playerShip = this.game.gameObjects.find((object: any) => object.type === OBJECT_TYPE.PLAYER_SHIP);
      if (playerShip && detectCollision(this, playerShip)){
        playerShip.exploded = true;
      }
    }

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
        new ExplodedShip(this.game, this.position);
        this.isDeleted = true;
      }
      return;
    } else {
      this._draw(ctx);
    }
  }

}