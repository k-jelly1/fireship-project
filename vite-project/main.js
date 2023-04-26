import './style.css' 
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// scene, renderer, camera




const scene = new THREE.Scene(); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


// tell renderer which DOM element to use 
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})


renderer.setPixelRatio(window.devicePixelRatio)

// fullsize 
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)



// render == draw. so draw scene and camera in args
renderer.render(scene, camera)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// wrapping paper for a geometry 
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 }); 
// need light to light it up  

// MESH - combine geometry to material 
const torus = new THREE.Mesh(geometry, material); 

scene.add(torus)

// white color
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5) 
// set determines how far away light is from object
// further == more is covered

// add light to scene 
// scene.add(pointLight)


// for lighting across entire scene 

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)


// light Helper 
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper) 

// grid helper 

const gridHelper = new THREE.GridHelper(200, 50); 
scene.add(gridHelper)


const controls = new OrbitControls(camera, renderer.domElement)
// adds more animation based on dom events on the mouse and updated camera positions accordingly



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24) 
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  // generates a random number between -100 and 100 for each value in the array


  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)
// create an array of length = 200, add star to each value 

// adding background 
const spaceTexture = new THREE.TextureLoader().load('image.jpg')
scene.background = spaceTexture


// texture mapping - mapping 2D pixels to 3D geometry 
const triangleTexture = new THREE.TextureLoader().load('triange.jpg')

// const triangle = new THREE.Mesh(
//   new THREE.BoxGeometry(-1, 3, 1),
//   new THREE.MeshBasicMaterial({ map: triangleTexture})
// )

// scene.add(triangle)


// bubble 
const moonTexture = new THREE.TextureLoader().load('bubble.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: moonTexture,}
  )
)

scene.add(moon)



function animate() {
  // tells browser to render screen 
  requestAnimationFrame(animate); 

  torus.rotation.x += 0.01
  // // rotate by 0.01 for every animation frame
  torus.rotation.y += 0.005; 
  torus.rotation.z += 0.01

  // reflect control changes in UI
  controls.update(); 

  // render the scene whenever browser is rendered
  renderer.render(scene, camera); 



}


animate()
