// Configuração das luzes do cenário

import * as THREE from 'three';
import { scene } from './scene.js';

let cor = 0xffffff;
const luzPosto = [];

// Luz ambiente fraca
export const luzAmbiente = new THREE.AmbientLight(cor, 0.1);
// scene.add(luzAmbiente);

// Luz direcional (sol)
export const luz = new THREE.DirectionalLight(cor, 1);
luz.position.set(0, 10, 0);
luz.target.position.set(-5, 0, 0);

// scene.add(luz);
// scene.add(luz.target);

// Helper visual da luz
export const helper = new THREE.DirectionalLightHelper(luz);
// scene.add(helper);

// Atualiza helper
export function updateLight() {
    luz.target.updateMatrixWorld();
    helper.update();
}

// Luzes do posto
export function addluzTeto(z, y, sombra = false, alt = 650) {
    const luz1 = new THREE.SpotLight(0xffcc66, 30000, 3000, Math.PI, 0.5, 2);
    luz1.position.set(z, alt, y);
    luz1.target.position.set(0, 0, 0);

    if (sombra) {
        luz1.castShadow = true;
        luz1.shadow.mapSize.set(1024, 1024);
        luz1.shadow.camera.near = 500;
        luz1.shadow.camera.far = 4000;
        luz1.shadow.camera.fov = 30;
    }
    scene.add(luz1);
    scene.add(luz1.target);
    luzPosto.push({ luz1 });
}

let luzesLigadas = true;
export function alternarLuzes() {
    luzesLigadas = !luzesLigadas;
    luzPosto.forEach(({ luz1 }) => luz1.visible = luzesLigadas);
}

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "l") alternarLuzes();
});
