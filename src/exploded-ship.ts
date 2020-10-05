import { randomIntFromInterval } from "./utils";
import Game from "./game";
import { IPosition } from "./interfaces";
import Particle from './particle';

export default class ExplodedShip {
  private position: IPosition;
  private numberOfParticles: number

  constructor(game: Game, position: IPosition) {
    this.position = position;
    this.numberOfParticles = randomIntFromInterval(10, 20);

    for (let i = 0; i < this.numberOfParticles; i++) {
      const particle = new Particle(game, this.position);
      game.addObject(particle);
    }
  }
}