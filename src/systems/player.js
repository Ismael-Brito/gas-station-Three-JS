// Sistema do jogador

import * as THREE from 'three';
import { scene } from '../core/scene.js';
import { checarColisao } from './collision.js';
import { limite } from '../loaders/mapLoader.js';
import { carregarPlayer } from '../loaders/playerLoader.js';

export const player = new THREE.Group();
scene.add(player);

let yaw = 0;
export const direction = new THREE.Vector3();

let playerModel = null;

carregarPlayer((model) => {
    playerModel = model;
    player.add(playerModel);
    player.position.set(0, 0, 0);
});

export function moverPlayer(delta, keys) {

    const moveSpeed = 300;
    direction.set(0, 0, 0);

    const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw)).normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    if (keys['w']) direction.add(forward);
    if (keys['s']) direction.sub(forward);
    if (keys['a']) direction.sub(right);
    if (keys['d']) direction.add(right);

    if (direction.length() > 0) {

        direction.normalize().multiplyScalar(moveSpeed * delta);
        const novaPos = player.position.clone().add(direction);

        if (!checarColisao(player, novaPos)) {
            player.position.copy(novaPos);
        }

        if (limite.minX !== undefined) {
            player.position.x = Math.max(limite.minX, Math.min(limite.maxX, player.position.x));
            player.position.z = Math.max(limite.minZ, Math.min(limite.maxZ, player.position.z));
        }
    }
}
