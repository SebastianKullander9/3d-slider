import { ModelLoader, ShaderPlane } from "../models";
import { data } from "../../data/slides";

export default function Scene() {
    return (
        <>
            <group>
                {data.map((slide, index) => (
                    <>
                        <ShaderPlane 
                            index={index}
                            color={slide.color}
                        />
                        <ModelLoader 
                            modelFileName={slide.modelUrl} 
                            scale={slide.scale} 
                            rotation={slide.rotation} 
                            position={slide.position}
                            index={index}
                        />
                    </>
                ))}
                
            </group>
        </>
    )
}