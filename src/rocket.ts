import { OBJECT_TYPE } from "./constants";
import { outsideOfGame, detectCollision } from "./utils";
import GameObject from "./game-object";
import { IPosition, ISpeed } from "./interfaces";
import Game from "./game";

const ROCKET_SPEED: readonly<ISpeed> = { x: 4, y: 4 };
export default class Rocket extends GameObject {

  constructor(game: Game, position: IPosition, speed: ISpeed) {
    let rocketSpeed = { x: 0, y: 0 };
    if (speed.x === 0 && speed.y === 0) {
      rocketSpeed.x = ROCKET_SPEED.x;
      rocketSpeed.y = 0;
    } else {
      rocketSpeed = {
       x: speed.x > 0 ? ROCKET_SPEED.x : speed.x < 0 ? -ROCKET_SPEED.x : 0,
       y: speed.y > 0 ? ROCKET_SPEED.y : speed.y < 0 ? -ROCKET_SPEED.y : 0
     }
    }

    super(10, 10, position, rocketSpeed, game);
    this.type = OBJECT_TYPE.ROCKET;
    this.color = '#f00';
    this.loadImage('assets/rocket.png');
  }

  update() {
    this.speedUpdate();
    if (outsideOfGame(this, this.game)){
      this.isDeleted = true;
    } else {
      const enemies = this.game.gameObjects.filter((object: any) => object.type === OBJECT_TYPE.ENEMY_SHIP);
      if (enemies) {
        enemies.forEach((enemy: any) => {
          if (detectCollision(this, enemy)) {
            enemy.exploded = true;
            this.isDeleted = true;
          }
        });
      }
    }
  }
 
   draw(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.save();
      ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2); 
      ctx.rotate(this.angle);
      ctx.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2)); 
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      ctx.restore();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
}