import box1 from "../../../assets/box.png"
import journey2 from "../../../assets/Ourjourney2.png"

const Ourjourney = () => {
    return (
        <div className="relative">
            <div className="flex flex-col justify-center items-center lg:py-20 py-10 px-8">
                <div className="flex flex-col justify-center items-center gap-6 py-10">
                    <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10">
                        Our Journey
                    </h1>
                    <img
                        src={box1}
                        alt="box1"
                        className="w-26 h-26 absolute top-18 left-158  opacity-80 lg:flex hidden"
                    />
                    <p>From a small idea to a Europe-wide community</p>
                </div>
                <img src={journey2} alt="journey2" className="w-220"/>
            </div>
        </div>
    )
}

export default Ourjourney