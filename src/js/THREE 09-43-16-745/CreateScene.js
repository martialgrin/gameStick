import PARAMS from "../PARAMS";
import * as THREE from "three";

const CreateScene = () => {
  const camera = new THREE.OrthographicCamera(
    PARAMS.scene.cam.left,
    PARAMS.scene.cam.right,
    PARAMS.scene.cam.top,
    PARAMS.scene.cam.bottom,
    PARAMS.scene.cam.near,
    PARAMS.scene.cam.far
  );
  const canvas = PARAMS.canvas.obj;
  const renderer = new THREE.WebGLRenderer({ canvas });
  let webcam = PARAMS.video.obj;
  const videoTexture = new THREE.VideoTexture(webcam);
  let plane = new THREE.PlaneGeometry(2, 2);
  const scene = new THREE.Scene();

  const material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
  });

  const setup = () => {
    renderer.setSize(PARAMS.canvas.width, PARAMS.canvas.height);
    scene.add(new THREE.Mesh(plane, videoTexture));
    draw();
  };

  const draw = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  };
  setup();
};

export default CreateScene;
