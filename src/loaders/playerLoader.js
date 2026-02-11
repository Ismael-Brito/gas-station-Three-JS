// Carregamento do player GLTF

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function carregarPlayer(onLoadCallback) {
    loader.load('models/gltf/Xbot.glb', (gltf) => {
        const model = gltf.scene;
        model.scale.set(100, 100, 100);  // ajuste a escala para testar
        if (onLoadCallback) onLoadCallback(model);
    }, undefined, (error) => {
        console.error('Erro ao carregar player:', error);
    });
}
