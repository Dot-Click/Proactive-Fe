import Play from "../../../../assets/play2.png"
import momentscard1 from "../../../../assets/momentscard1.png"
import momentscard2 from "../../../../assets/momentscard2.png"
import momentscard3 from "../../../../assets/momentscard3.png"

const FollowCard = () => {
    return (
        <div className="grid lg:grid-cols-3 mb-8 ">
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard1}
                    alt="momentscard1"
                    className="h-120 w-90"
                />
                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard2}
                    alt="momentscard2"
                    className="h-120 w-90"
                />

                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard3}
                    alt="momentscard3"
                    className="h-120 w-90"
                />
                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard1}
                    alt="momentscard1"
                    className="h-120 w-90"
                />
                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard2}
                    alt="momentscard2"
                    className="h-120 w-90"
                />
                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
            </div>
            <div className="relative rounded-[14px] overflow-hidden">
                <img
                    src={momentscard3}
                    alt="momentscard3"
                    className="h-120 w-90"
                />
                <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                    <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default FollowCard