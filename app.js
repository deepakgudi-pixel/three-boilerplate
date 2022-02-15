import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const geometry = new THREE.TorusGeometry(3, 1, 100, 100);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  //we are saying the viewport has changed and resize based on vieport
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

camera.position.z = 8;

//Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

//controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

//Animate
const clock = new THREE.Clock();

function frame() {
	controls.update();

  // Render
  renderer.render(scene, camera);


  // Call Render again on the next frame
  window.requestAnimationFrame(frame);
}

frame();
