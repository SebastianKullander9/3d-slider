import { useRef } from "react";
import {  useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useSlidePosition from "../../hooks/useSlidePosition";
import vertexShader from "../../../shaders/custom.vert.glsl?raw";
import fragmentShader from "../../../shaders/custom.frag.glsl?raw";

interface ShaderPlaneProps {
    index: number;
    color: [string, string];
}

export default function ShaderPlane({ index, color }: ShaderPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const position = useSlidePosition(index, [0, 0, 0]);
    
    const uniforms = useRef({
        uTime: { value: 0 },
        uSeed: { value: index * 500},
        uColor1: { value: new THREE.Color(color[0]) },
        uColor2: { value: new THREE.Color(color[1]) },
    });
    
    {/* centralize useFrame for better performance (into hook maybe?) */}
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });
    
    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[5, 7, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}