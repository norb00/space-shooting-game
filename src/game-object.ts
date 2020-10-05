import { IPosition, ISpeed } from "./interfaces";
import Game from './game';

export default class GameObject {
  protected game: Game
  protected image: HTMLImageElement | undefined;
  protected angle: number = 0;
  public width: number;
  public height: number;
  public position: IPosition = {x: 0, y: 0};
  public speed: ISpeed = {x: 0, y: 0};
  public isDeleted: boolean = false;
  public type: number = 0;
  public color: string = '#0ff';

  constructor(width: number, height: number, position: IPosition, speed: ISpeed, game: Game) {
    this.width = width;
    this.height = height;
    this.game = game;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed.x = speed.x;
    this.speed.y = speed.y;
  }

  loadImage(image: string) {
    this.image = new Image(this.width, this.height);
    this.image.src = image;
  }

  speedUpdate(): void {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.setAngle();
  }

  setAngle(): void {
    if (this.speed.x > 0 && this.speed.y > 0) {
      this.angle = 135 * Math.PI / 180;
    }
    if (this.speed.x > 0 && this.speed.y === 0) {
      this.angle = 90 * Math.PI / 180;
    }
    if (this.speed.x > 0 && this.speed.y < 0) {
      this.angle = 45 * Math.PI / 180;
    }

    if (this.speed.x === 0 && this.speed.y > 0) {
      this.angle = 180 * Math.PI / 180;
    }
    if (this.speed.x === 0 && this.speed.y < 0) {
      this.angle = 0 * Math.PI / 180;
    }

    if (this.speed.x < 0 && this.speed.y > 0) {
      this.angle = 225 * Math.PI / 180;
    }
    if (this.speed.x < 0 && this.speed.y === 0) {
      this.angle = 270 * Math.PI / 180;
    }
    if (this.speed.x < 0 && this.speed.y < 0) {
      this.angle = 315 * Math.PI / 180;
    }
  }
}
