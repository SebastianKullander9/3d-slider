import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useSlideStore from "../store/sliderStore";

const PLANE_WORLD_WIDTH = 5;

export default function useWorldPerPixel() {
    const { setWorldPerPixel, setPlaneWidthPixels  } = useSlideStore();
    const { viewport, size } = useThree();

    useEffect(() => {
        const worldPerPixel = viewport.width / size.width;
        setWorldPerPixel(worldPerPixel);

        const planePixelWidth = PLANE_WORLD_WIDTH / worldPerPixel;
        setPlaneWidthPixels(planePixelWidth);

    }, [viewport.width, size.width, setWorldPerPixel]);
}