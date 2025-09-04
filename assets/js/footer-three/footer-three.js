import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import setRaycaster from "./setRaycaster.js";

// Renderer
const canvas = document.getElementById("canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();
scene.background = null;

// Camera
const aspect = canvas.clientWidth / canvas.clientHeight;
const frustumSize = 3.25;
const camera = new THREE.OrthographicCamera(
  (-frustumSize * aspect) / 2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  -frustumSize / 2,
  0.1,
  1000
);
camera.position.set(3, 2, 4);
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#fff", 2);
directionalLight.position.set(1, 0, 2);
scene.add(directionalLight);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = Math.PI / 2.5;
controls.maxPolarAngle = Math.PI / 2.5;
controls.enableZoom = false;

// Mesh
const gltfLoader = new GLTFLoader();
let mixer;
const modelPath = canvas.dataset.model;
gltfLoader.load(modelPath, (glb) => {
  const character = glb.scene;

  // actions
  mixer = new THREE.AnimationMixer(character);

  glb.scene.traverse((child) => {
    if (child.isMesh) {
      child.userData.actions = glb.animations.map((clip) =>
        mixer.clipAction(clip)
      );

      child.userData.actions[0].reset().play();
      child.userData.actions[0].timeScale = 0.5;
    }
  });
  scene.add(glb.scene);
  camera.lookAt(character.position);
});

// rayCaster
setRaycaster({
  eventObject: canvas,
  scene,
  camera,
  onClick: function (mesh) {
    if (mesh) {
      const action0 = mesh.userData.actions[0];
      const action1 = mesh.userData.actions[1];

      action0.fadeOut(0.5);
      action1.setLoop(THREE.LoopOnce, 1);
      action1.reset().fadeIn(0.5).play();
      action1.clampWhenFinished = true;
      action1.fadeIn(0.5).play();

      mixer.addEventListener("finished", function onFinish(e) {
        if (e.action === action1) {
          action1.fadeOut(0.5);
          action0.reset().fadeIn(0.5).play();
          mixer.removeEventListener("finished", onFinish);
        }
      });
    }
  },
});

window.addEventListener("resize", setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
}

function setSize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const aspect = width / height;

  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
}
