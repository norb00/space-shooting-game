import { parseGIF, decompressFrames } from 'gifuct-js';
import Game from './game';
import GameObject from "./game-object";
import { IPosition, ISpeed, ISize } from './interfaces';

export default class Ship extends GameObject {
  private maxSpeed: ISpeed;
  protected lastSpeed: ISpeed;
  public limitedToGameArea: boolean = false;
  public exploded: boolean = false;
  protected explosion: any;
  protected explosionFrame: number | undefined;

  constructor(game: Game, size: ISize, position: IPosition, maxSpeed: ISpeed) {
    super(size.width, size.height, position, {x: 0, y: 0}, game);
    this.maxSpeed = maxSpeed;
    this.lastSpeed = maxSpeed;
    
    fetch('assets/explosion.gif')
      .then(resp => resp.arrayBuffer())
      .then(buff => parseGIF(buff))
      .then(gif => {
        this.explosion = decompressFrames(gif, true);
        this.explosionFrame = 0;
      });
  }

  moveLeft() {
    if (this.position.x <= 0 && this.limitedToGameArea) {
      this.speed.x = 0;
    } else {
      this.speed.x = -this.maxSpeed.x;
    }
  }
  
  moveRight() {
    if (this.position.x + this.width >= this.game.gameWidth && this.limitedToGameArea) {
      this.speed.x = 0;
    } else {
      this.speed.x = this.maxSpeed.x;
    };
  }
  
  moveUp() {
    if (this.position.y <= 0 && this.limitedToGameArea) {
      this.speed.y = 0;
    } else {
      this.speed.y = -this.maxSpeed.y;
    }
  }
  
  moveDown() {
    if (this.position.y + this.height >= this.game.gameHeight && this.limitedToGameArea) {
      this.speed.y = 0;
    } else {
      this.speed.y = this.maxSpeed.y;
    }
  }
  
  stop() {
    this.lastSpeed = {...this.speed};
    this.speed.x = 0;
    this.speed.y = 0; 
    return;
  }

  update() {
    this.speedUpdate();
  }

  _draw(ctx: CanvasRenderingContext2D) {
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
