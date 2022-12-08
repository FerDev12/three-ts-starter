import { Clock } from 'three';
import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter {
  clock = new Clock();
  elapsedTime!: number;

  constructor() {
    super();

    // Setup;
    this.#tick();
  }

  #tick() {
    this.elapsedTime = this.clock.getElapsedTime();

    // Emit tick event to Experience
    this.trigger('tick');

    window.requestAnimationFrame(() => this.#tick());
  }
}
