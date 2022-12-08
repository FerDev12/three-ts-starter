import GUI from 'lil-gui';
import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from '../Experience';

export default class Camera {
  #experience = new Experience();
  #scene = this.#experience.scene;
  #sizes = this.#experience.sizes;
  #canvas = this.#experience.canvas;
  #debug = this.#experience.debug;
  #debugFolder?: GUI;

  fov = 75;
  aspect!: number;
  near = 0.01;
  far = 100;
  instance!: PerspectiveCamera;

  controls?: OrbitControls;

  constructor(enableControls = true) {
    // Setup
    this.aspect = this.#sizes.width / this.#sizes.height;

    // Debug
    if (this.#debug.active) {
      this.#debugFolder = this.#debug.gui?.addFolder('Camera');
    }

    this.#setInstance();
    this.#setOrbitControls(enableControls);
  }

  #setInstance() {
    this.instance = new PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );

    this.instance.position.set(0, 0, 3);
    this.#scene.add(this.instance);

    // Debug
    const position = {
      print: () => console.log(this.instance.getWorldPosition(new Vector3())),
    };
    if (this.#debugFolder) {
      this.#debugFolder.add(position, 'print');
    }
  }

  #setOrbitControls(enableControls: boolean) {
    if (enableControls) {
      this.controls = new OrbitControls(this.instance, this.#canvas);
      this.controls.enableDamping = true;
    }
  }

  resize() {
    this.aspect = this.#sizes.width / this.#sizes.height;
    this.instance.aspect = this.aspect;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls?.update();
  }
}
