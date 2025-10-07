"use client";

import { useEffect, useRef } from "react";
import Core from "smooothy";
import Slide from "../slide";
import { data } from "../../data/slides";
import Canvas3d from "../../3d/canvas";
import useSlideStore from "../../store/sliderStore";

export default function Carousel() {
    const sliderWrapperRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const { setSlideSize, setScrollOffset } = useSlideStore();

    useEffect(() => {
        const resize = () => {
            if (!slideRef.current) return;

            setSlideSize(slideRef.current.offsetWidth, slideRef.current.offsetHeight )
        }

        window.addEventListener("resize", resize);

        resize();

        return () => window.removeEventListener("resize", resize);
    }, [setSlideSize]);

    useEffect(() => {
        if (!sliderWrapperRef.current) return;

        const slider = new Core(sliderWrapperRef.current, {
            infinite: true,
            snap: true,
        });

        function animate() {
            slider.update();
            
            setScrollOffset(slider.current);
            console.log(slider.current);

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="h-full flex items-center">  
            {/* HTML DOM SLIDE */}
            <div ref={sliderWrapperRef} className="absolute w-screen h-1/2 flex flex-row overflow-hidden select-none cursor-grab z-[9999]">
                {data.map((slide, index) => 
                    <Slide key={index} ref={slideRef} title={slide.title} index={index} />
                )}
            </div>

            {/* WEBGL SLIDE */}
            <div className="absolute w-full h-1/2 pointer-events-none">
                <Canvas3d />
            </div>
        </div>
        
    );
}