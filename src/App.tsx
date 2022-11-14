import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;

  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;

  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

function App() {
  useEffect(() => {
    const canvas: any = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const scene = new THREE.Scene();

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvasDom = renderer.domElement;
      camera.aspect = canvasDom.clientWidth / canvasDom.clientHeight;
      camera.updateProjectionMatrix();
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    renderer.render(scene, camera);
  }, []);

  return <canvas id="c" />;
}

export default App;
