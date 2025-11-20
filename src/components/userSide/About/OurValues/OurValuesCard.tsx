import CountUp from 'react-countup';
import ourvalues1 from "../../../../assets/Ourvalues1.png"
import ourvalues2 from "../../../../assets/Ourvalues2.png"
import ourvalues3 from "../../../../assets/Ourvalues3.png"
import ourvalues4 from "../../../../assets/Ourvalues4.png"

const OurValuesCard = () => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-4 lg:mt-30 mt-6">
            <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-2 py-2 rounded-[20px] bg-linear-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
                <div className="flex flex-col items-center lg:gap-10 gap-2">
                    <img src={ourvalues1} alt="ourvalues1" className="" />
                    <div className="flex flex-col lg:gap-2 justify-center items-center">
                        <h4 className="text-[#FFFFFF] font-bold lg:text-4xl"><CountUp start={0} end={2500} delay={0} separator="">
                            {({ countUpRef }) => (
                                <div>
                                    <span ref={countUpRef} />
                                    <span>+</span>
                                </div>
                            )}
                        </CountUp>
                        </h4>
                        <p className="text-[#FFFFFF] text-[12px] lg:text-[16px]">Adventures Completed</p>
                    </div>
                </div>
            </div>

            <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-2 py-2 rounded-[20px] bg-linear-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
                <div className="flex flex-col items-center lg:gap-10 gap-2">
                    <img src={ourvalues2} alt="ourvalues2" className="" />
                    <div className="flex flex-col lg:gap-2 justify-center items-center">
                        <h4 className="text-[#FFFFFF] font-bold lg:text-4xl"><CountUp start={0} end={150000} delay={0} separator="">
                            {({ countUpRef }) => (
                                <div>
                                    <span ref={countUpRef} />
                                    <span>+</span>
                                </div>
                            )}
                        </CountUp>
                        </h4>
                        <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Happy Travelers</p>
                    </div>
                </div>
            </div>

            <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-3 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
                <div className="flex flex-col items-center lg:gap-10 gap-2">
                    <img src={ourvalues3} alt="ourvalues3" className="" />
                    <div className="flex flex-col lg:gap-2 justify-center items-center">
                        <h4 className="text-[#FFFFFF] font-bold lg:text-4xl "><CountUp start={0} end={50} delay={0} separator="">
                            {({ countUpRef }) => (
                                <div>
                                    <span ref={countUpRef} />
                                    <span>+</span>
                                </div>
                            )}
                        </CountUp>
                        </h4>
                        <p className="text-[#FFFFFF] text-sm lg:text-[16px] ">Countries Visited</p>
                    </div>
                </div>
            </div>

            <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-3 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
                <div className="flex flex-col items-center lg:gap-10 gap-2">
                    <img src={ourvalues4} alt="ourvalues4" className="" />
                    <div className="flex flex-col lg:gap-2 justify-center items-center">
                        <h4 className="text-[#FFFFFF] font-bold lg:text-4xl">897/5</h4>
                        <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Average Rating</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurValuesCard