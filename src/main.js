import { scene } from './core/scene.js';
import { camera } from './core/camera.js';
import { renderer } from './core/renderer.js';
import { updateLight } from './core/lights.js';
import { atualizarTurno } from './systems/dayNightCycle.js';
import { carregarMapa } from './loaders/mapLoader.js';
import { carregarPlayer } from './loaders/playerLoader.js';
import { moverPlayer } from './systems/player.js';
import { keys } from './systems/controls.js';
import { atualizarCamera } from './systems/cameraFollow.js';

import * as THREE from 'three';

carregarMapa();
carregarPlayer();

const clock = new THREE.Clock();
let tempo = 0;

function animate() {

    const delta = clock.getDelta();
    tempo += delta * 0.002;
    if (tempo > 1) tempo = 0;

    const turnoSuave = (Math.sin(tempo * Math.PI * 2 - Math.PI / 2) + 1) / 2;

    atualizarTurno(turnoSuave);
    updateLight();
    moverPlayer(delta, keys);
    atualizarCamera();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
