import EnemyShip from "./enemy-ship";
import Game from "./game";
import Particle from "./particle";
import Rocket from "./rocket";
import Ship from "./ship";

export function detectCollision(object: Ship | Rocket | EnemyShip, object2: Ship | Rocket | EnemyShip): boolean {
  let bottomOfObject = object.position.y + object.height;
  let topOfObject = object.position.y;
  let leftOfObject = object.position.x;
  let rightOfObject = object.position.x + object.width;

  let topOfObject2 = object2.position.y;
  let leftSideOfObject2 = object2.position.x;
  let rightSideOfObject2 = object2.position.x + object2.width;
  let bottomOfObject2 = object2.position.y + object2.height;

  if (
    bottomOfObject >= topOfObject2 &&
    topOfObject <= bottomOfObject2 &&
    leftOfObject >= leftSideOfObject2 &&
    rightOfObject <= rightSideOfObject2
  ) {
    return true;
  } else {
    return false;
  }
}

export function outsideOfGame(object: Ship | Rocket | EnemyShip | Particle, gameObject: Game): boolean {
  let bottomOfObject = object.position.y + object.height;
  let topOfObject = object.position.y;
  let leftOfObject = object.position.x;
  let rightOfObject = object.position.x + object.width;

  if (
    topOfObject >= gameObject.gameHeight ||
    bottomOfObject <= 0 ||
    leftOfObject >= gameObject.gameWidth ||
    rightOfObject <= 0
  ) {
    return true;
  } else {
    return false;
  }

}

export function randomIntFromInterval(min: number, max: number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function debounce(func: Function, wait: number) {
  let timeout: any;

  return function executedFunction(...args) {

    const later = () => {
      timeout = null;
      
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export function plusOrMinus(): number { 
  return Math.random() < 0.5 ? -1 : 1;
}