import SurfaceCamps from "../../../assets/Surfacecamp.png"

const SurfaceCamp = () => {
    return (
        <div className="px-4 sm:px-16 py-4">
            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg text-center">WW - Surface Camp Asturias</h4>
            <div className="flex justify-center items-center py-6">
                <img src={SurfaceCamps} alt="SurfaceCamps" className="lg:h-250"/>
            </div>
        </div>
    )
}

export default SurfaceCamp