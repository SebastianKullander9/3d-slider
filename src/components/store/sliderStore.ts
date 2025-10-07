import { create } from "zustand";

interface SlideStore {
    slideWidth: number;
    slideHeight: number;
    worldPerPixel: number;
    scrollOffset: number;

    setSlideWidth: (width: number) => void;
    setSlideHeight: (height: number) => void;
    setWorldPerPixel: (worldPerPixel: number) => void;
    setScrollOffset: (offset: number) => void;

    setSlideSize: (width: number, height: number) => void;
}

const useSlideStore = create<SlideStore>((set) => ({
    slideWidth: 0,
    slideHeight: 0,
    worldPerPixel: 0,
    scrollOffset: 0,

    setSlideWidth: (width) => set({ slideWidth: width }),
    setSlideHeight: (height) => set({ slideHeight: height }),
    setWorldPerPixel: (worldPerPixel) => set({ worldPerPixel: worldPerPixel}),
    setScrollOffset: (offset) => set({ scrollOffset: offset }),


    setSlideSize: (width, height) => set({ slideWidth: width, slideHeight: height }),
}));

export default useSlideStore;