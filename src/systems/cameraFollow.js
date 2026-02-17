import * as THREE from 'three';
import { camera } from '../core/camera.js';
import { player, direction } from './player.js';

const cameraOffset = new THREE.Vector3();
const smoothSpeed = 0.1;

let currentRotation = 0;
let currentHeight = 0;
let pitch = 0.2;

export function atualizarCamera() {
    const distancia = 3;  // Distância da câmera atrás do jogador
    const altura = 2;      // Altura da câmera em relação ao jogador

    // Queremos que a câmera fique atrás do jogador, com base na rotação Y dele
    const rotY = player.rotation.y;

    // Alvo onde a câmera deve estar (posição desejada)
    const targetPosition = new THREE.Vector3(
        player.position.x - Math.sin(rotY) * distancia,
        player.position.y + Math.sin(pitch)  + altura,
        player.position.z - Math.cos(rotY) * distancia
    );

    // Suaviza o movimento da câmera usando lerp (interpolação linear)
    camera.position.lerp(targetPosition, smoothSpeed);

    // A câmera olha para o jogador, mas um pouco acima para melhor visualização
    const lookAtPosition = player.position.clone();
    lookAtPosition.y += 50; // Ajuste a altura que a câmera olha

    player.lookAt(player.position.clone().add(direction));
    camera.lookAt(player.position.x, player.position.y + 2, player.position.z);
    // camera.lookAt(lookAtPosition);
}
