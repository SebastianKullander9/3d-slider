interface SlideProps {
    title: string;
    index: number;
}

export default function Slide({ title, index }: SlideProps) {
    return (
        <div className="w-1/3 h-full border-1 border-white flex-none text-white site-p-text">
            <div className="w-full h-full flex flex-col justify-between site-x-padding site-y-padding">
                <div className="flex flex-row justify-between">
                    <p>0{index}</p>
                    <p>--</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>{title}</p>
                    <p>--</p>
                </div>
            </div>
        </div>
    )
}