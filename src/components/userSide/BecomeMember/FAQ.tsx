import box1 from "../../../assets/box.png"
import FaqQuestion from "./FaqQuestion"

const FAQ = () => {
    return (
        <div>
            <div className="flex flex-col lg:gap-12 gap-2 justify-center items-center relative lg:py-40 py-20">
                <h1 className="text-center bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10">
                    Frequently Asked Questions
                </h1>
                <img
                    src={box1}
                    alt="box1"
                    className="w-28 h-26 absolute left-156 top-30 opacity-80 lg:flex hidden"
                />
                <p className="text-[#221E33] lg:text-[14px] text-[10px] text-center">Everything you need to know about membership</p>
                <FaqQuestion role={"user"} />
            </div>
        </div>
    )
}

export default FAQ