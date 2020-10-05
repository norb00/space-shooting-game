import { ISpeed } from './interfaces';

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  SPLASH_SCREEN: 4
};

export const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
};

export const OBJECT_TYPE = {
  PLAYER_SHIP: 0,
  ENEMY_SHIP: 1,
  ROCKET: 2,
  PARTICLE: 3,
  PARTICLES: 4
};

export const SHIP_MAX_SPEED: readonly<ISpeed> = { x: 2, y: 2 };
