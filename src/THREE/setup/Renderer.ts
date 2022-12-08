import { WebGLRenderer } from 'three';
import Experience from '../Experience';

export default class Renderer {
  // Setup
  #experience = new Experience();
  #canvas = this.#experience.canvas;
  #scene = this.#experience.scene;
  #sizes = this.#experience.sizes;
  #camera = this.#experience.camera;

  #instance!: WebGLRenderer;

  constructor() {
    this.#setInstance();
  }

  #setInstance() {
    this.#instance = new WebGLRenderer({
      canvas: this.#canvas,
    });
    this.#instance.setSize(this.#sizes.width, this.#sizes.height);
    this.#instance.setPixelRatio(this.#sizes.pixelRatio);
    this.#instance.render(this.#scene, this.#camera.instance);
  }

  resize() {
    this.#instance.setSize(this.#sizes.width, this.#sizes.height);
    this.#instance.setPixelRatio(this.#sizes.pixelRatio);
  }

  update() {
    this.#instance.render(this.#scene, this.#camera.instance);
  }
}
