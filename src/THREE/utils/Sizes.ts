import EventEmmitter from './EventEmitter';

/**
 * Sets the initial canvas width and height.
 * If no parent element is passed in, it default to window.innderWidth and window.innerHeight
 */
export default class Sizes extends EventEmmitter {
  #parent?: HTMLElement;
  width: number;
  height: number;
  pixelRatio = Math.min(window.devicePixelRatio, 2);

  /**
   *
   * @param {HTMLCanvasElement | null} parent The parent element of the canvas. Defaults to null;
   */
  constructor(parent?: HTMLElement) {
    super();

    // Setup
    if (parent) {
      this.#parent = parent;
      this.width = parent.clientWidth;
      this.height = parent.clientHeight;
    } else {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    // Resize event
    this.#hanleResizeEvent();
  }

  /**
   * Triggered during instantiation. Handles resizing events
   */
  #hanleResizeEvent() {
    if (this.#parent) {
      this.#parent.addEventListener('resize', () => {
        this.width = this.#parent!.clientWidth;
        this.height = this.#parent!.clientHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        this.trigger('resize');
      });
      return;
    }

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      // Emit resize event
      this.trigger('resize');
    });
  }
}
