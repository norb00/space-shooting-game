import Game from "./game";

let canvas = <HTMLCanvasElement>document.querySelector("#game-canvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime: number = 0;
function gameLoop(timestamp: number) {
  // console.log("gameLoop", timestamp);
  let deltaTime: number = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
