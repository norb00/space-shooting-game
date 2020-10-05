import { ISize } from "./interfaces";
import GameScreen from "./game-screen";
import MouseInputHandler from "./mouse-input";
import Game from "./game";
import { GAMESTATE } from "./constants";

export default class MenuScreen extends GameScreen {
  public game: Game;
  constructor(size: ISize, game: Game) {
    super(size);
    this.game = game;

    const buttons = [
      {
        width: 300,
        height: 50,
        x: (size.width - 300) / 2,
        y: 150 + (size.height - 220) / 4,
        content: 'GAME1',
        lineWidth: 2,
        fillStyle: '#f3f3f3',
        strokeStyle: '#242424',
        font: 'Arial',
        action: () => {
          this.game.gameState = GAMESTATE.RUNNING;
        }
      },
      {
        width: 300,
        height: 50,
        x: (size.width - 300) / 2,
        y: 150 + (size.height - 220) / 4 * 2,
        content: 'GAME2',
        lineWidth: 2,
        fillStyle: '#f3f3f3',
        strokeStyle: '#242424',
        font: 'Arial',
        action: () => {
          this.game.gameState = GAMESTATE.RUNNING;
        }
      },
      {
        width: 300,
        height: 50,
        x: (size.width - 300) / 2,
        y: 150 + (size.height - 220) / 4 * 3,
        content: 'GAME3',
        lineWidth: 2,
        fillStyle: '#f3f3f3',
        strokeStyle: '#242424',
        font: 'Arial',
        action: () => {
          this.game.gameState = GAMESTATE.RUNNING;
        }
      },
      {
        width: 300,
        height: 50,
        x: (size.width - 300) / 2,
        y: 150 + (size.height - 220) / 4 * 4,
        content: 'EXIT',
        lineWidth: 2,
        fillStyle: '#f3f3f3',
        strokeStyle: '#242424',
        font: 'Arial',
        action: () => {
          window.location.href = 'https://www.playngo.com/';
        }
      }
    ];

    if (!this.game.isMouselistenerAdded) {
      new MouseInputHandler(buttons);
      this.game.isMouselistenerAdded = true;
    }

    const logo = new Image();
    logo.src = 'assets/millennium-falcon.png';
    const logoImage = {
      image: logo,
      size: {
        width: 100,
        height: 100
      }
    }
    this.addImages(logoImage);

    buttons.forEach(button => {
      this.addMenuButton(button);
    })
  }
}