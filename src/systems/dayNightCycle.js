// Sistema de ciclo dia/noite

import * as THREE from 'three';
import { scene } from '../core/scene.js';
import { luz, luzAmbiente } from '../core/lights.js';

export function atualizarTurno(t) {

    // Cores do céu
    const corDia = new THREE.Color(0x87ceeb);
    const corNoite = new THREE.Color(0x0d1b2a);

    // Interpolação do céu
    const corAtual = corDia.clone().lerp(corNoite, t);
    scene.background = corAtual;

    // Neblina exponencial
    scene.fog = new THREE.FogExp2(corAtual, 0.0005);

    // Cor do sol
    const corSolManha = new THREE.Color(0xfff0a0);
    const corSolNoite = new THREE.Color(0x000000);
    luz.color = corSolManha.clone().lerp(corSolNoite, t);

    // Intensidades
    luz.intensity = 0.8 * (1 - t);
    luzAmbiente.intensity = 0.3 * t + 0.1;

    // Movimento do sol
    const angulo = Math.PI * 2 * t;
    luz.position.set(Math.cos(angulo) * 10, Math.sin(angulo) * 10, 0);
    luz.target.position.set(0, 0, 0);
}
