"use client";

import { useEffect, useRef } from "react";
import Core from "smooothy";
import Slide from "../slide";
import { data } from "../../data/slides";
import Canvas3d from "../../3d/canvas";

export default function Carousel() {
    const sliderWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sliderWrapperRef.current) return;

        const slider = new Core(sliderWrapperRef.current, {
            infinite: true,
            snap: true,
        });

        function animate() {
            slider.update();

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <>  
            {/* HTML DOM SLIDE */}
            <div ref={sliderWrapperRef} className="w-screen h-1/2 border-1 border-white flex flex-row overflow-hidden select-none">
                {data.map((slide, index) => 
                    <Slide key={index} title={slide.title} index={index} />
                )}
            </div>

            {/* WEBGL SLIDE */}
            <div className="relative w-full h-1/2">
                <Canvas3d />
            </div>
        </>
        
    );
}