import * as THREE from "three";
import { ISceneBuilder } from ".";
import { IViewportRenderer } from "@/components/viewport";

export class ThreeRenderer implements IViewportRenderer {
    protected scene = new THREE.Scene();

    protected renderer!: THREE.WebGLRenderer;

    private handle?: number;

    protected sceneBuilder: ISceneBuilder;

    constructor(sceneBuilder: ISceneBuilder) {
        this.sceneBuilder = sceneBuilder;
    }

    async animate(container: Element) {
        this.renderer = this.createRenderer();

        container.appendChild(this.renderer.domElement);

        this.resizeRenderer();

        await this.build();

        this.loop();
    }

    protected createRenderer() {
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(1, 1, 1));

        return renderer;
    }

    protected resizeRenderer() {
        const parent = this.renderer.domElement.parentElement;

        if (!parent) {
            return;
        }

        const { clientWidth, clientHeight } = parent;

        this.renderer.setSize(clientWidth, clientHeight);

        const camera = this.sceneBuilder.camera;

        if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = clientWidth / clientHeight;

            camera.updateProjectionMatrix();
        }
    }

    protected async build() {
        await this.sceneBuilder.build(this.scene);
    }

    protected loop() {
        this.handle = requestAnimationFrame(this.loop.bind(this));

        this.sceneBuilder.update(this.scene);

        this.render();
    }

    protected render() {
        this.renderer.render(this.scene, this.sceneBuilder.camera);
    }

    resize() {
        this.resizeRenderer();
    }

    dispose() {
        if (this.handle) {
            cancelAnimationFrame(this.handle);
        }

        this.renderer.domElement.remove();
    }
}
