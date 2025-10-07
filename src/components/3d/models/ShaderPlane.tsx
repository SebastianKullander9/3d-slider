import { useRef, useEffect } from "react";
import * as THREE from "three";
import useSlidePosition from "../../hooks/useSlidePosition";
import vertexShader from "../../../shaders/custom.vert.glsl?raw";
import fragmentShader from "../../../shaders/custom.frag.glsl?raw";

interface ShaderPlaneProps {
    index: number;
    color: [string, string];
    materialsRef: React.RefObject<THREE.ShaderMaterial[]>;
}

const sharedPlaneGeometry = new THREE.PlaneGeometry(5, 7, 1, 1);

export default function ShaderPlane({ index, color, materialsRef }: ShaderPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const position = useSlidePosition(index, [0, 0, 0]);
    
    const uniforms = useRef({
        uTime: { value: 0 },
        uSeed: { value: index * 500},
        uColor1: { value: new THREE.Color(color[0]) },
        uColor2: { value: new THREE.Color(color[1]) },
    });

    useEffect(() => {
        if (materialRef.current) {
            materialsRef.current[index] = materialRef.current;
        }
    }, [materialsRef, index]);
    
    return (
        <mesh ref={meshRef} position={position} geometry={sharedPlaneGeometry}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
            />
        </mesh>
    );
}