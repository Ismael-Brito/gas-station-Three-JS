// Sistema de colisões

import * as THREE from 'three';

export const objetosColisao = [];

// Verifica colisão simulando nova posição
export function checarColisao(player, novaPos) {

    const boxPlayer = new THREE.Box3().setFromObject(player);
    boxPlayer.translate(novaPos.clone().sub(player.position));

    for (const obj of objetosColisao) {

        const box = obj.userData.boundingBox.clone();
        box.applyMatrix4(obj.matrixWorld);

        if (boxPlayer.intersectsBox(box)) {
            return true;
        }
    }

    return false;
}
