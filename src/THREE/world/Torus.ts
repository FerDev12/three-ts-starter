import { Mesh, MeshNormalMaterial, TorusGeometry } from 'three';
import Experience from '../Experience';

export default class Torus {
  #experience = new Experience();
  #scene = this.#experience.scene;
  #time = this.#experience.time;

  geometry = new TorusGeometry(1, 0.5, 32, 32);
  material = new MeshNormalMaterial({ wireframe: true });
  mesh!: Mesh;

  constructor() {
    this.#setInstance();
  }

  #setInstance() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.#scene.add(this.mesh);
  }

  update() {
    this.mesh.rotation.y = this.#time.elapsedTime * 0.3;
  }
}
