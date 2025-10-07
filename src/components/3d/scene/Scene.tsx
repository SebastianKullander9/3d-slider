import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, Fragment } from "react";
import { ModelLoader, ShaderPlane } from "../models";
import { data } from "../../data/slides";

export default function Scene() {
    const shaderMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);
    const modelsRef = useRef<THREE.Group[]>([]);


    useFrame(({ clock }) => {
        const time = clock.elapsedTime;

        shaderMaterialsRef.current.forEach(material => {
            if (material) material.uniforms.uTime.value = time;
        });

        modelsRef.current.forEach((model, index) => {
            if (model) {
                // Bobbing: use sin wave with different phase per model
                model.position.y += Math.sin(time * 1.5 + index * 0.5) * 0.001;
                
                // Rotation: slow continuous rotation
                model.rotation.y = Math.sin(time * 0.3 + index * 0.2);
            }
        });
    });

    return (
        <>
            <group>
                {data.map((slide, index) => (
                    <Fragment key={index}>
                        <ShaderPlane 
                            index={index}
                            color={slide.color}
                            materialsRef={shaderMaterialsRef}

                        />
                        <ModelLoader
                            modelsRef={modelsRef}
                            modelFileName={slide.modelUrl} 
                            scale={slide.scale} 
                            rotation={slide.rotation} 
                            position={slide.position}
                            index={index}
                        />
                    </Fragment>
                ))}
                
            </group>
        </>
    )
}