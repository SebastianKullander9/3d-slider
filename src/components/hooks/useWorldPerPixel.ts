import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useSlideStore from "../store/sliderStore";

export default function useWorldPerPixel() {
    const { setWorldPerPixel } = useSlideStore();
    const { viewport, size } = useThree();

    useEffect(() => {
        const worldPerPixel = viewport.width / size.width;
        setWorldPerPixel(worldPerPixel);
    }, [viewport.width, size.width, setWorldPerPixel]);
}