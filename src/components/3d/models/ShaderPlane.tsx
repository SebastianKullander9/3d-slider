import { useRef } from 'react';
import {  useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShaderPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    
    const uniforms = useRef({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#ff006e") },
        uColor2: { value: new THREE.Color("#8338ec") },
    });
    
    {/* centralize useFrame for better performance (into hook maybe?) */}
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[4, 4, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                {/* import/get shaders */}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}