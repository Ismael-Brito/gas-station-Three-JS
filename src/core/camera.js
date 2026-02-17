// Configuração da câmera

import * as THREE from 'three';

// Câmera perspectiva
export const camera = new THREE.PerspectiveCamera(
    75, // campo de visão
    window.innerWidth / window.innerHeight, // proporção
    1, // plano próximo
    5000 // plano distante
);

// Posição inicial da câmera
camera.position.set(0, 10, 20);
