"use client";

import { FunctionComponent, useEffect, useRef } from "react";
import styles from "./viewport.module.css";

export interface IViewportRenderer {
    animate(container: Element): void;

    resize(): void;

    dispose(): void;
}

type Props = {
    renderer: IViewportRenderer;
};

const Viewport: FunctionComponent<Props> = ({ renderer }) => {
    const containerRef = useRef<HTMLDivElement>({} as any);

    useEffect(() => {
        const { current: container } = containerRef;

        if (!container) {
            return;
        }

        const resize = renderer.resize.bind(renderer);

        window.addEventListener("resize", resize);

        renderer.animate(container);

        return () => {
            window.removeEventListener("resize", resize);

            renderer.dispose();
        };
    }, [renderer, containerRef]);

    return <div ref={containerRef} className={styles.container} />;
};

export default Viewport;
