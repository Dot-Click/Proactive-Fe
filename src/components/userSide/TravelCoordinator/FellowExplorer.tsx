import FellowExplorerImg from "../../../assets/FellowExplorer.png"
import box2 from "../../../assets/box2.png"
import Fellowexplorer1 from "../../../assets/Fellowexplorer1.png"
import Fellowexplorer2 from "../../../assets/Fellowexplorer2.png"
import Fellowexplorer3 from "../../../assets/Fellowexplorer3.png"
import Fellowexplorer4 from "../../../assets/Fellowexplorer4.png"
const FellowExplorer = () => {
    return (
        <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center lg:py-0 md:py-12 lg:mb-0 mb-20 gap-12">
            <div className="relative">
                <img src={FellowExplorerImg} alt="FellowExplorerImg" className="lg:h-165 h-100" />
            </div>
            <div className="flex flex-col gap-8">
                <div className="relative">
                    <h1 className="text-center lg:text-start lg:mt-10 bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                                  font-bold lg:text-4xl relative z-10">
                        More than guides — they're <br /> fellow explorers
                    </h1>
                    <img
                        src={box2}
                        alt="box2"
                        className="w-30 h-30 absolute top-2 -left-8  opacity-80 lg:flex hidden"
                    />
                </div>

                <div className="flex justify-center flex-col gap-8 px-4">
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer1} alt="Fellowexplorer1" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">Passionate Travelers</h1>
                            <p className="text-center lg:text-start">Our coordinators have explored the world themselves and <br className="md:flex hidden" /> bring authentic experiences to every trip they lead.</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer2} alt="Fellowexplorer2" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">Passionate Travelers</h1>
                            <p className="text-center lg:text-start">Our coordinators have explored the world themselves and <br className="md:flex hidden" /> bring authentic experiences to every trip they lead.</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer3} alt="Fellowexplorer3" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">Passionate Travelers</h1>
                            <p className="text-center lg:text-start">Our coordinators have explored the world themselves and <br className="md:flex hidden" /> bring authentic experiences to every trip they lead.</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start items-center gap-4">
                        <img src={Fellowexplorer4} alt="Fellowexplorer4" className="h-6" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center lg:text-start">Passionate Travelers</h1>
                            <p className="text-center lg:text-start">Our coordinators have explored the world themselves and <br className="md:flex hidden" /> bring authentic experiences to every trip they lead.</p>
                        </div>
                    </div>
                    <div
                        className="lg:flex hidden absolute left-280 -translate-y-1/2 -translate-x-1/3 w-60 h-80 bg-[radial-gradient(circle_at_50%_50%,#76F0D4,rgba(250,250,250,0.05))] rounded-full blur-3xl opacity-30">
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FellowExplorer