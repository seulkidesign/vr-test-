import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Firework from './firework';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

window.addEventListener('load', function () {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.body.appendChild(VRButton.createButton(renderer))

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  );

  camera.position.z = 8000;

 const fireworks = [];

 fireworks.update = function () {
  for (let i = 0; i < this.length; i++){
    const firework = fireworks[i];

    firework.update();
  }
 };

  new OrbitControls(camera, renderer.domElement);

  const firework = new Firework({ x:0, y:0});

  scene.add(firework.points)

  fireworks.push(firework);

  /*
  const geometry = new THREE.BufferGeometry();

  const count = 10000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i ++){
    positions[i * 3] = THREE.MathUtils.randFloatSpread(30)
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(30);
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(30);
    //Math.random() => 0~1사이의 값 //Math.random() -0.5 => -0.5~0.5 사이의 값  // => THREE.MathUtils.randFloatSpread() 이것을 요약한 three.js코드 
   
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
    
 
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    color: 0xccaaff,
    size: 0.5,
    vertexColors: true,
    //sizeAttenuation: false,
    //wireframe: true,
  });

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load('./assets/textures/particle.png')

  material.alphaMap = texture;
  material.transparent = true;
  material.depthWrite = false; // particle의 겹치는 depth를 없애줌 //같은 계층 

  const points = new THREE.Points(geometry, material);

  scene.add(points);
*/
  render();

  function render() {
    fireworks.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
    renderer.xr.enabled = true
  }

  window.addEventListener('resize', handleResize);

  function handleMouseDown() {
    const firework = new Firework({
      x: THREE.MathUtils.randFloatSpread(8000),
      y: THREE.MathUtils.randFloatSpread(8000),
    });
    
   renderer.setAnimationLoop( function () {

	renderer.render( scene, camera );

} );
  scene.add(firework.points);
  fireworks.push(firework);

  }


  window.addEventListener('mousedown', handleMouseDown);
}