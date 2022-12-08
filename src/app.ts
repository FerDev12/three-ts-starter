import WebGL from './THREE/utils/WebGL';
import Experience from './THREE/Experience';

const canvas =
  (document.querySelector('.three') as HTMLCanvasElement) ??
  (() => {
    const c = document.createElement('canvas');
    document.body.appendChild(c);
    return c;
  })();

const experience = new Experience(canvas);

if (WebGL.isWebGLAvailable()) {
  experience.play();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  console.error(warning);
}
