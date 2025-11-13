import importantMask from "../../../assets/importantmask.png"
const ImpactNumber = () => {
    return (
        <div className="relative overflow-hidden rounded-xl bg-clip-content">
            <img
                src={importantMask}
                alt="importantMask"
                className="w-full h-full object-cover bg-clip-content"
            />
            <div className="absolute inset-0 bg-[#0DAC87]/50 bg-clip-content "></div>

        </div>
    );
};

export default ImpactNumber