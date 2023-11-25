
import * as THREE from 'three';

let renderer, scene, camera;

let line;
const MAX_POINTS = 500;
let drawCount;

init();
animate();

function init() {

    const info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#fff';
    info.style.fontWeight = 'bold';
    info.style.backgroundColor = 'transparent';
    info.style.zIndex = '1';
    info.style.fontFamily = 'Monospace';
    info.innerHTML = 'three.js animated line using BufferGeometry';
    document.body.appendChild(info);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000);

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(MAX_POINTS * 3);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    drawCount = 2;
    geometry.setDrawRange(0, drawCount);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    line = new THREE.Line(geometry, material);
    scene.add(line);

    updatePositions()
}

function updatePositions() {
    const positions = line.geometry.attributes.position.array;

    let x, y, z, index;

    x = y = z = index = 0;

    for (let i = 0, l = MAX_POINTS; i < l; i++) {
        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;

        x += (Math.random() - 0.5) * 30;
        y += (Math.random() - 0.5) * 30;
        z += (Math.random() - 0.5) * 30;
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);

    drawCount = (drawCount + 1) % MAX_POINTS;

    line.geometry.setDrawRange(0, drawCount);

    if (drawCount === 0) {
        updatePositions();

        line.geometry.attributes.position.needUpdate = true;

        line.material.color.setHSL(Math.random(), 1, 0.5);
    }

    render();
}