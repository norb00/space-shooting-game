import { ISize } from "./interfaces";
import GameScreen from "./game-screen";
import Game from "./game";
import { GAMESTATE } from "./constants";

export default class SplashScreen extends GameScreen {
  public game: Game;
  private image: any;
  private angle: number = 10;
  constructor(size: ISize, game: Game) {
    super(size);
    this.game = game;
    this.image = new Image(300, 300);
    this.image.src = 'assets/millennium-falcon.png';

    setTimeout(() => {
        this.game.gameState = GAMESTATE.MENU;
    }, 2000);
  }

  update() {
    this.angle += 4;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.game.gameWidth, this.game.gameHeight);
    ctx.save();
    ctx.translate(this.game.gameWidth / 2, this.game.gameHeight / 2); 
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.translate(-(this.game.gameWidth / 2), -(this.game.gameHeight / 2)); 
    ctx.drawImage(this.image, this.game.gameWidth / 2 - 150, this.game.gameHeight / 2 -150, 300, 300);
    ctx.restore();
  }
}