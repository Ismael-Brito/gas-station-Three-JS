// Configuração das luzes do cenário

import * as THREE from 'three';
import { scene } from './scene.js';

// Luz ambiente fraca
export const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(luzAmbiente);

// Luz direcional (sol)
export const luz = new THREE.DirectionalLight(0xffffff, 1);
luz.position.set(0, 10, 0);
luz.target.position.set(-5, 0, 0);

scene.add(luz);
scene.add(luz.target);

// Helper visual da luz
export const helper = new THREE.DirectionalLightHelper(luz);
scene.add(helper);

// Atualiza helper
export function updateLight() {
    luz.target.updateMatrixWorld();
    helper.update();
}
