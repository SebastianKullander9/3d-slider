import useSlideStore from "../../store/sliderStore";

interface SlideProps {
    title: string;
    index: number;
    ref: React.Ref<HTMLDivElement | null>;
}

export default function Slide({ title, index, ref }: SlideProps) {
    const planeWidthPixels = useSlideStore(state => state.planeWidthPixels);

    return (
        <div ref={ref} className="w-full lg:w-1/3 h-full flex-none text-white site-p-text">
            <div 
                className="h-full flex flex-col justify-between site-y-padding site-x-padding"
                style={{ 
                    width: `${planeWidthPixels + 100}px`,
                    margin: '0 auto'
                }}
            >
                <div className="flex flex-row justify-between">
                    <p>0{index}</p>
                    <p>--</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>{title}</p>
                    <p>28&#36;</p>
                </div>
            </div>
        </div>
    )
}