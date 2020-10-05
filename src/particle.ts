import { randomIntFromInterval } from "./utils";
import { OBJECT_TYPE } from "./constants";
import Game from "./game";
import GameObject from "./game-object"
import { IPosition, ISize, ISpeed } from "./interfaces";

const PARTICLE_SPEED: readonly<ISpeed> = { x: 1, y: 1 };
const PARTICLE_SIZE: readonly<ISize> = { width: 2, height: 2 };

export default class Particle extends GameObject {
  
  constructor(game: Game, position: IPosition) {
    const particleSpeed: ISpeed = {
      x: PARTICLE_SPEED.x * randomIntFromInterval(-10, 10),
      y: PARTICLE_SPEED.y * randomIntFromInterval(-10, 10)
    };
    super(PARTICLE_SIZE.width, PARTICLE_SIZE.height, position, particleSpeed, game);
    this.type = OBJECT_TYPE.PARTICLE;
    this.color = '#fffaff';
  }

  update() { 
    this.speedUpdate();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}