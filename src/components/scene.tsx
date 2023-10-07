"use client";

import { ThreeRenderer } from "@/renderers/three";
import { SceneBuilder } from "@/scene/builder";
import Viewport from "./viewport";

const Scene = () => {
    const sceneBuilder = new SceneBuilder();

    const renderer = new ThreeRenderer(sceneBuilder);

    return <Viewport renderer={renderer} />;
};

export default Scene;
