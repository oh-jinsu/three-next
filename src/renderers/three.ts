import * as THREE from "three";
import { ISceneBuilder } from ".";
import { IViewportRenderer } from "@/components/viewport";

export class ThreeRenderer implements IViewportRenderer {
    private scene?: THREE.Scene;

    private renderer?: THREE.WebGLRenderer;

    protected sceneBuilder: ISceneBuilder;

    constructor(sceneBuilder: ISceneBuilder) {
        this.sceneBuilder = sceneBuilder;
    }

    protected getRenderer(): THREE.WebGLRenderer {
        if (this.renderer) {
            return this.renderer;
        }

        this.renderer = new THREE.WebGLRenderer();

        return this.renderer;
    }

    async render(container: Element) {
        this.scene = new THREE.Scene();

        await this.sceneBuilder.build(this.scene);

        container.appendChild(this.getRenderer().domElement);

        this.animate();
    }

    protected animate() {
        if (!this.scene) {
            return;
        }

        requestAnimationFrame(this.animate.bind(this));

        this.sceneBuilder.update(this.scene);

        this.getRenderer().render(this.scene, this.sceneBuilder.camera);
    }

    resize(container: Element) {
        const { clientWidth: width, clientHeight: height } = container;

        const camera = this.sceneBuilder.camera;

        if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = width / height;

            camera.updateProjectionMatrix();
        }

        this.getRenderer().setSize(width, height);
    }

    dispose() {
        this.getRenderer().domElement.remove();
    }
}
