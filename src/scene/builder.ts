import { ISceneBuilder } from "@/renderers";
import * as THREE from "three";

export class SceneBuilder implements ISceneBuilder {
    readonly camera: THREE.PerspectiveCamera;

    private cube!: THREE.Mesh;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);

        this.camera.position.z = 3;
    }

    async build(scene: THREE.Scene) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshPhysicalMaterial({
            color: 0x00ff00,
        });

        this.cube = new THREE.Mesh(geometry, material);

        scene.add(this.cube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

        scene.add(ambientLight);

        const light = new THREE.PointLight(0xffffff, 100);

        light.position.y = 10;

        scene.add(light);
    }

    update() {
        this.cube.rotation.x += 0.01;

        this.cube.rotation.y += 0.01;
    }
}
