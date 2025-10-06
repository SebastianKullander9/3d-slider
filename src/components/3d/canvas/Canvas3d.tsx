import { Canvas } from "@react-three/fiber";
import Scene from "../scene";

export default function Canvas3d() {
    return (
        <div className="absolute inset-0">
            <Canvas

            >
                <Scene />
            </Canvas>
        </div>
    )
}