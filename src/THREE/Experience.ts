import { Scene } from 'three';
import Camera from './setup/Camera';
import Renderer from './setup/Renderer';
import Debug from './utils/Debug';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import World from './world/World';

let instance: Experience | null = null;

export default class Experience {
  canvas!: HTMLCanvasElement;
  scene!: Scene;
  sizes!: Sizes;
  debug!: Debug;
  time!: Time;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;

  constructor(canvas?: HTMLCanvasElement) {
    if (instance) return instance;
    instance = this;

    if (!canvas) return;

    this.canvas = canvas;
  }

  #resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  #update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  play() {
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();
    this.camera = new Camera();
    this.world = new World();
    this.renderer = new Renderer();

    this.sizes.on('resize', () => this.#resize());
    this.time.on('tick', () => this.#update());
  }
}
