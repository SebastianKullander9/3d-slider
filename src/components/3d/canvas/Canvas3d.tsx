import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "../scene";
import useWorldPerPixel from "../../hooks/useWorldPerPixel";
import { data } from "../../data/slides";
import { useGLTF } from "@react-three/drei";

data.forEach((slide) => {
    useGLTF.preload(`/models/${slide.modelUrl}`);
});

function WorldPerPixelUpdater() {
    useWorldPerPixel();
    return null;
}

export default function Canvas3d() {
    return (
        <div className="absolute inset-0">
            <Canvas
                orthographic
                camera={{
                    position: [0, 0, 10],
                    zoom: 50,
                    near: 0.1,
                    far: 1000,
                }}
            >
                <WorldPerPixelUpdater />
                <Environment preset="dawn"/>
                <Scene />
            </Canvas>
        </div>
    )
}