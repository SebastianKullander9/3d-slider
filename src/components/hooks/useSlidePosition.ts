import { useMemo } from "react";
import useSlideStore from "../store/sliderStore";
import { data } from "../data/slides";

function wrap(value: number, min: number, max: number) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

export default function useSlidePosition(index: number, basePosition: [number, number, number]) {
    const slideWidth = useSlideStore(state => state.slideWidth);
    const worldPerPixel = useSlideStore(state => state.worldPerPixel);
    const scrollOffset = useSlideStore(state => state.scrollOffset);
    const totalSlides = data.length;
    const [x, y, z] = basePosition;

    return useMemo<[number, number, number]>(() => {
        const slideWorldWidth = slideWidth * worldPerPixel;
        const totalWorldWidth = totalSlides * slideWorldWidth;
        const halfCount = totalSlides / 2;

        const wrappedScroll = wrap(scrollOffset, -halfCount, halfCount);

        let newX = (index - Math.floor(totalSlides / 2)) * slideWorldWidth;
        newX -= wrappedScroll * slideWorldWidth;
        newX = wrap(newX, -totalWorldWidth / 2, totalWorldWidth / 2);

        return [-newX, y, z];
    }, [x, y, z, index, slideWidth, worldPerPixel, scrollOffset]);
}