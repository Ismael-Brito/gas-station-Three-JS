// Configuração do renderer

import * as THREE from 'three';

export const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

// Adiciona canvas ao body
document.body.appendChild(renderer.domElement);

// Atualiza tamanho ao redimensionar tela
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});
