// Carregamento do mapa GLTF

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { scene } from '../core/scene.js';
import { objetosColisao } from '../systems/collision.js';
import { addluzTeto, alternarLuzes } from '../core/lights.js';

const loader = new GLTFLoader();

export let limite = {};

export function carregarMapa() {

    loader.load('models/import/Gas_station/result.gltf', (gltf) => {

        const model = gltf.scene;
        model.scale.set(0.01, 0.01, 0.01);
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);

        model.traverse((obj) => {

            if (obj.isMesh) {

                obj.geometry.computeBoundingBox();
                obj.userData.boundingBox = obj.geometry.boundingBox.clone();

                if (obj.name.includes("Pillar") || obj.name.includes("Parede") || obj.name.includes("Boxs") ||
                    obj.name.includes("Cereal") || obj.name.includes("Frying") || obj.name.includes("Box_cookies") ||
                    obj.name.includes("Cookies") || obj.name.includes("Milk") || obj.name.includes("Canned_food") ||
                    obj.name.includes("Rice") || obj.name.includes("Flour") || obj.name.includes("Glass") ||
                    obj.name.includes("ICE")) {

                    objetosColisao.push(obj);
                }
            }
            if (obj.name.startsWith("Lamp")) {
                addluzTeto(obj.position.x, obj.position.z, false, obj.position.y - 5);
            }

            if (obj.name.includes("Fusible")) {
            }
        });

        // Limites do mapa
        const box = new THREE.Box3().setFromObject(model);

        const BoxHelper = new THREE.Box3Helper(box, 0xffff00);
        scene.add(BoxHelper);

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
