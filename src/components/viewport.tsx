"use client";

import { FunctionComponent, useEffect, useRef } from "react";
import styles from "./viewport.module.css";

export interface IViewportRenderer {
    render(container: Element): Promise<void>;

    resize(container: Element): void;

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

        renderer.resize(container);

        const resizeEventListener = () => {
            renderer.resize(container);
        };

        window.addEventListener("resize", resizeEventListener);

        renderer.render(container);

        return () => {
            window.removeEventListener("resize", resizeEventListener);

            renderer.dispose();
        };
    }, [renderer, containerRef]);

    return <div ref={containerRef} className={styles.container} />;
};

export default Viewport;
