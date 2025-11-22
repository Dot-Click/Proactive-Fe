import box1 from "../../../assets/box.png"
import joinproactive from "../../../assets/joinProactive.png"
const JoinProactive = () => {
    return (
        <div className="">
            <div className="flex flex-col lg:gap-12 gap-2 justify-center items-center relative lg:py-10 py-20">
                <h1 className="text-center bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10">
                    Why Join Proactive?
                </h1>
                <img
                    src={box1}
                    alt="box1"
                    className="w-26 h-26 absolute left-105 top-0 opacity-80 lg:flex hidden"
                />
                <p className="text-[#221E33] font-bold lg:text-[14px] text-[10px] text-center">Unlock a world of exclusive travel opportunities and connect with like-minded adventurers</p>
                    <div
                        className="lg:flex hidden absolute top-100 left-280 -translate-y-1/2 -translate-x-1/3 
                        w-60 h-80 
                        bg-[radial-gradient(circle_at_50%_50%,#76F0D4,rgba(250,250,250,0.05))] 
                        rounded-full blur-3xl opacity-70">
                    </div>
                    <img src={joinproactive} alt="joinproactive" className="lg:h-220 h-120 relative z-10" />
            </div>
        </div>
    )
}

export default JoinProactive