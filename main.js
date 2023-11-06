import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45, // a field of view, vertical distance 
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
camera.position.set(10, 0, 100); // setting the xyz position
camera.lookAt(10, 0, 100);

// set the size of our renderer to assume the height and width of the window
renderer.setSize(window.innerWidth, window.innerHeight);

//appending the canvas it creates to the dom
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight)

// the values after the color denotes the intensity

const directionalLight = new THREE.DirectionalLight('white', 2);
scene.add(directionalLight);

const light = new THREE.PointLight( 0xff0000, 1, 10 );
scene.add( light );

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.autoRotate = true

const GridHelper = new THREE.GridHelper(100, 100, "pink");
scene.add(GridHelper);

const AxesHelper = new THREE.AxesHelper(100, "green")
scene.add(AxesHelper)


new RGBELoader().load('/small_empty_room_3_4k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture; // we make the background our texture
  scene.environment = texture; 
});

const geometry = new THREE.SphereGeometry(10, 50, 50);
const material =  new THREE.MeshStandardMaterial({
        color: 'lime' || 0xffffff || '#ffffff',
        metalness: 0.5,
        roughness:0
      })

const ring = new THREE.Mesh( geometry, material);
ring.position.y = 30
ring.position.x = 10
ring.position.z = 30
scene.add(ring) 

const loader = new GLTFLoader();
loader.load('/super_human.glb', (glb)=>{
    const model = glb.scene;
    model.scale.set(0.5, 0.5, 0.5) //reducing the size of the model by half
    scene.add(model)
})

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// this handles our scene, when the screen are resized
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});