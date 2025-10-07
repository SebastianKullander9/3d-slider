import * as THREE from "three";
import { useMemo, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import useSlidePosition from "../../hooks/useSlidePosition";

interface ModelLoaderProps {
    modelFileName: string;
    scale: number;
    rotation: [number, number, number];
    position: [number, number, number];
    index: number;
    modelsRef: React.RefObject<THREE.Group[]>;
}

export default function ModelLoader({ modelFileName, scale, rotation, position, index, modelsRef }: ModelLoaderProps) {
    const { scene } = useGLTF(`/models/${modelFileName}`);
    const groupRef = useRef<THREE.Group>(null);
    const adjustedPosition = useSlidePosition(index, position);

    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        if (groupRef.current) {
            modelsRef.current[index] = groupRef.current;
        }
    }, [modelsRef, index]);

    return (
        <group ref={groupRef} position={adjustedPosition} rotation={rotation} scale={scale}>
            <primitive object={clonedScene} />
        </group>
    );
}
