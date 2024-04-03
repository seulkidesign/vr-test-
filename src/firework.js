import * as THREE from 'three';

class Firework{
 constructor({x, y}){
 
  const count = 1000 + Math.round(Math.random() * 5000);

  //particle의 속도 
  const velocity = 10 + Math.random() * 10;

  const particlesGeometry = new THREE.BufferGeometry();

  this.particles = [];
 
  for(let i = 0; i < count; i++) {
    const particle = new THREE.Vector3(x, y, 0);

    //particle들이 똑같이 퍼져나가므로 정사각형으로 퍼짐
    // particle.deltaX = THREE.MathUtils.randFloatSpread(velocity);
    // particle.deltaY = THREE.MathUtils.randFloatSpread(velocity);
    // particle.deltaZ = THREE.MathUtils.randFloatSpread(velocity);
    
    //particle들이 원으로 퍼져나가는 수학적인 코드 
    particle.theta = Math.random() * Math.PI * 2;
    particle.phi = Math.random() * Math.PI * 2;

    particle.deltaX = velocity * Math.sin(particle.theta) * Math.cos(particle.phi);
    particle.deltaY = velocity * Math.sin(particle.theta) * Math.sin(particle.phi);
    particle.deltaZ = velocity * Math.cos(particle.theta);

    this.particles.push(particle);
  }

  particlesGeometry.setFromPoints(this.particles);

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load('./assets/textures/particle.png')

  const particlesMaterial = new THREE.PointsMaterial({
    size:5,
    alphaMap: texture,
    transparent: true,
    depthWrite:false,
    //new.THREE.color => 0~1사이의 값을 반환함 
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    blending: THREE.AdditiveBlending,//color를 up 
  });

  const points = new THREE.Points(particlesGeometry, particlesMaterial)

  this.points = points

 }

 update() {
  const position = this.points.geometry.attributes.position;

  for(let i=0; i < this.particles.length; i++){
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);

    position.setX(i, x + this.particles[i].deltaX);
    position.setY(i, y + this.particles[i].deltaY);
    position.setZ(i, z + this.particles[i].deltaZ);
  }

  position.needsUpdate = true;
 }
}

export default Firework; 