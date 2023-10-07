export interface ISceneBuilder {
    camera: THREE.Camera;

    build(scene: THREE.Scene): Promise<void>;

    update(scene: THREE.Scene): void;
}
