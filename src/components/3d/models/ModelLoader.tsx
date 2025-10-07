import { useGLTF } from "@react-three/drei";
import useSlidePosition from "../../hooks/useSlidePosition";

interface ModelLoaderProps {
    modelFileName: string;
    scale: number;
    rotation: [number, number, number];
    position: [number, number, number];
    index: number;
}

export default function ModelLoader({ modelFileName, scale, rotation, position, index }: ModelLoaderProps) {
    const { scene } = useGLTF(`/models/${modelFileName}`);
    const adjustedPosition = useSlidePosition(index, position);

    return (
        <primitive object={scene} scale={scale} rotation={rotation} position={adjustedPosition} />
    );
}
