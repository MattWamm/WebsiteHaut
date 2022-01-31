import * as THREE from "./node_modules/three/build/three.module.js"
import * as haut from './haut/haut.js'
var curScene
export var camera
var renderer
var clock
var cubes = []
export var keyboard = {}
var currentUpdate;
init()
animate()

function init () {
  clock = new THREE.Clock();
  clock.start();
  haut.Init();
  haut.LoadScene('testingScene/scene.json', 'start');
  curScene = haut.GetScene('start');
  //create camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(0, 0.02, 0);
  camera.position.z = 1;
  var light = new THREE.DirectionalLight(0xffffff, 0);
  var ambient = new THREE.AmbientLight(0x808080);
  curScene.add(ambient);
  curScene.add(light);
  curScene.background = 0x000000;
  haut.instances.set("sun", light);

  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
}

function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate () {
  var deltaTime = clock.getDelta();
  renderer.render(curScene, camera);
  if(typeof currentUpdate == "function")
  {
    currentUpdate(deltaTime);
  }
  requestAnimationFrame(animate);
}
function keyDown (event) {
  keyboard[event.keyCode] = true
}
function keyUp (event) {
  keyboard[event.keyCode] = false
}

export function SetUpdate(func)
{
  currentUpdate = func;
}