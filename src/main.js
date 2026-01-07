import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

/* GUI */
const gui = new GUI();

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;
/* LIGHT */
let light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

let lightDirectional = new THREE.DirectionalLight(0xffffff, 1);
lightDirectional.position.set(10, 10, 10);
scene.add(lightDirectional);

let lightHelper = new THREE.DirectionalLightHelper(lightDirectional);
scene.add(lightHelper);

let loader = new THREE.TextureLoader();
const texture = loader.load("./Texture/metal_0084_height_1k.png");
const metalMap = loader.load("./Texture/metal.jpg");

/* GEOMETRY + MATERIAL */
const geometry = new THREE.BoxGeometry(5, 5, 20, 16, 1);
const material = new THREE.MeshStandardMaterial({
  color: "#0066ff",
  wireframe: true,
  side: THREE.DoubleSide,
  map: metalMap,
});

const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

/* RENDERER */
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/* RESIZE */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ======================
// 🔥 lil-gui CONNECTION
// ======================

/* Rotation controls */
const rotationFolder = gui.addFolder("Rotation");
rotationFolder.add(cylinder.rotation, "x", 0, Math.PI * 2, 0.01);
rotationFolder.add(cylinder.rotation, "y", 0, Math.PI * 2, 0.01);
rotationFolder.add(cylinder.rotation, "z", 0, Math.PI * 2, 0.01);

/* Material controls */
const materialFolder = gui.addFolder("Material");
materialFolder.addColor(material, "color");
materialFolder.add(material, "wireframe");
materialFolder.add(material, "map");
materialFolder.add(material, "metalness");
materialFolder.add(material, "roughness");
materialFolder.add(material, "normalMap");
materialFolder.add(material, "normalScale");
materialFolder.add(material, "displacementMap");
materialFolder.add(material, "displacementScale");
materialFolder.add(material, "displacementBias");
materialFolder.add(material, "aoMap");
materialFolder.add(material, "aoMapIntensity");
materialFolder.add(material, "envMap");
materialFolder.add(material, "envMapIntensity");
materialFolder.add(material, "envMapMode");
materialFolder.add(material, "envMapColor");
materialFolder.add(material, "envMapBlur");
materialFolder.add(material, "envMapBlur");
materialFolder.add(material, "envMapBlur");
materialFolder.add(material, "envMapBlur");

/* Visibility */
gui.add(cylinder, "visible").name("Show Cylinder");

/* Size controls (recreate geometry safely) */
const sizeParams = {
  radius: 5,
  height: 20,
};

const updateGeometry = () => {
  cylinder.geometry.dispose();
  cylinder.geometry = new THREE.CylinderGeometry(
    sizeParams.radius,
    sizeParams.radius,
    sizeParams.height,
    16,
    1,
    true
  );
};

const sizeFolder = gui.addFolder("Size");
sizeFolder.add(sizeParams, "radius", 1, 10).onChange(updateGeometry);
sizeFolder.add(sizeParams, "height", 5, 40).onChange(updateGeometry);

/* ANIMATION LOOP */
function animate() {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
