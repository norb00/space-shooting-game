import KeyInputHandler from "./key-input";
import { GAMESTATE } from "./constants";
import PlayerShip from "./player-ship";
import EnemyShip from "./enemy-ship";
import Rocket from "./rocket";
import GameScreen from "./game-screen";
import ScrollingSprite from './scrolling-sprite';
import Particle from "./particle";
import MenuScreen from "./menu-screen";
import SplashScreen from "./splash-screen";

const BACKGROUND_IMAGE = 'assets/space.png';
const BACKGROUND_SPEED = 0.3;

export default class Game {
  private playerShip: PlayerShip;
  private sprites: Array<any> = [];
  protected isMouselistenerAdded: boolean = false;
  public gameWidth: number;
  public gameHeight: number;
  public gameState: number;
  public gameObjects: Array<PlayerShip | Rocket | EnemyShip | Particle> = [];
  public resources: any = {};
  private screens: any = {};

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.SPLASH_SCREEN;
    this.gameObjects = [];

    this.resources['backgroundImage'] = new Image(this.gameWidth, this.gameHeight);
    this.resources['backgroundImage'].src = BACKGROUND_IMAGE;
    this.resources['backgroundImage'].position = {
      x: 0,
      y: 0
    };

    const bgSprite = new ScrollingSprite(this.resources['backgroundImage'], 0, 0, this.gameWidth, this.gameHeight, BACKGROUND_SPEED);
    const bgSprite2 = new ScrollingSprite(this.resources['backgroundImage'], -this.gameWidth, 0, this.gameWidth, this.gameHeight, BACKGROUND_SPEED);
    this.sprites = [bgSprite, bgSprite2];


    this.playerShip = new PlayerShip(this);

    this.gameObjects = [this.playerShip];

    new KeyInputHandler(this.playerShip, this);

    this.screens[GAMESTATE.SPLASH_SCREEN] = new SplashScreen({ width: this.gameWidth, height: this.gameHeight }, this);
    this.screens[GAMESTATE.MENU] = new MenuScreen({ width: this.gameWidth, height: this.gameHeight }, this);
    this.screens[GAMESTATE.GAMEOVER] = new GameScreen({ width: this.gameWidth, height: this.gameHeight });

    this.initNewEnemies();
  }

  addObject(object: PlayerShip | Rocket | EnemyShip | Particle) {
    this.gameObjects.push(object);
  }

  start() {
    if (this.gameState === GAMESTATE.RUNNING) return;
    this.gameState = GAMESTATE.RUNNING;
    this.playerShip.reset()
    this.gameObjects = [this.playerShip];
  }

  menu() {
    if (this.gameState === GAMESTATE.MENU) return;
    this.gameState = GAMESTATE.MENU;
    this.gameObjects = [this.playerShip];
  }

  update(deltaTime: number) {
    this.gameObjects.forEach((object: PlayerShip | Rocket | EnemyShip | Particle) => {
      object.update();
    });
    this.gameObjects = this.gameObjects.filter(object => !object.isDeleted);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.gameState === GAMESTATE.SPLASH_SCREEN) {
      this.screens[GAMESTATE.SPLASH_SCREEN].update();
      this.screens[GAMESTATE.SPLASH_SCREEN].draw(ctx);
    }

    if (this.gameState === GAMESTATE.MENU) {
      this.screens[GAMESTATE.MENU].draw(ctx);
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.screens[GAMESTATE.GAMEOVER].setContent('GAME OVER');
      this.screens[GAMESTATE.GAMEOVER].draw(ctx);
    }

    if (this.gameState === GAMESTATE.RUNNING) {
      this.sprites.forEach(sprite => {
        sprite.scroll();
        sprite.draw(ctx);
      });

      this.gameObjects.forEach((object) => object.draw(ctx));
    }
  }

  initNewEnemies() {
    setInterval(() => {
      if (this.gameState === GAMESTATE.RUNNING) {
        const enemy = new EnemyShip(this);
        this.gameObjects.push(enemy);
      }
    }, 2000);
  }

}
