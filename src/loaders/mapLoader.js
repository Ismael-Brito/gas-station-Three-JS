// Carregamento do mapa GLTF

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { scene } from '../core/scene.js';
import { objetosColisao } from '../systems/collision.js';

const loader = new GLTFLoader();

export let limite = {};

export function carregarMapa() {

    loader.load('models/import/Gas_station/result.gltf', (gltf) => {

        const model = gltf.scene;
        scene.add(model);

        model.traverse((obj) => {

            if (obj.isMesh) {

                obj.geometry.computeBoundingBox();
                obj.userData.boundingBox = obj.geometry.boundingBox.clone();

                if (obj.name.includes("Pillar") ||
                    obj.name.includes("Parede") ||
                    obj.name.includes("bomb")) {

                    objetosColisao.push(obj);
                }
            }
        });

        // Limites do mapa
        const box = new THREE.Box3().setFromObject(model);
        const min = box.min;
        const max = box.max;

        limite = {
            minX: min.x,
            maxX: max.x,
            minZ: min.z,
            maxZ: max.z
        };

    });
}
