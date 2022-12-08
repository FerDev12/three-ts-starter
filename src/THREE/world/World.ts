import Torus from './Torus';

export default class World {
  #torus = new Torus();

  update() {
    if (this.#torus) this.#torus.update();
  }
}
