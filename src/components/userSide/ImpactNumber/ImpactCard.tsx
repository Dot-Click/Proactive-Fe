import impact1 from "../../../assets/impact1.png"
import impact2 from "../../../assets/impact2.png"
import impact3 from "../../../assets/impact3.png"
import impact4 from "../../../assets/impact4.png"
import CountUp from 'react-countup';

const ImpactCard = () => {
  return (
    // <div className="grid lg:grid-cols-4 grid-cols-2 justify-center items-center lg:mt-30 gap-6">
    //   <div className="lg:w-60 lg:px-8 lg:py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
    //     <div className="flex flex-col items-center gap-8">
    //       <img src={impact1} alt="impact1" />
    //       <div className="flex flex-col gap-2 justify-center items-center">
    //         <h4 className="text-[#FFFFFF] font-bold text-4xl">2500+</h4>
    //         <p className="text-[#FFFFFF]">Adventures Completed</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-60 px-8 py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
    //     <div className="flex flex-col items-center gap-10">
    //       <img src={impact2} alt="impact2" />
    //       <div className="flex flex-col gap-2 justify-center items-center">
    //         <h4 className="text-[#FFFFFF] font-bold text-4xl">15000+</h4>
    //         <p className="text-[#FFFFFF]">Happy Travelers</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-60 px-8 py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
    //     <div className="flex flex-col items-center gap-13">
    //       <img src={impact3} alt="impact3" />
    //       <div className="flex flex-col gap-2 justify-center items-center">
    //         <h4 className="text-[#FFFFFF] font-bold text-4xl">50+</h4>
    //         <p className="text-[#FFFFFF]">Countries Visited</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-60 px-8 py-8 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
    //     <div className="flex flex-col items-center gap-10">
    //       <img src={impact4} alt="impact4" />
    //       <div className="flex flex-col gap-2 justify-center items-center">
    //         <h4 className="text-[#FFFFFF] font-bold text-4xl">897/5</h4>
    //         <p className="text-[#FFFFFF]">Average Rating</p>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-4 lg:mt-30 mt-6">
      <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-2 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
        <div className="flex flex-col items-center gap-10">
          <img src={impact1} alt="impact1" className="h-12" />
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

      <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-2 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
        <div className="flex flex-col items-center gap-10">
          <img src={impact2} alt="impact2" className="h-12" />
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
        <div className="flex flex-col items-center gap-10">
          <img src={impact3} alt="impact3" className="h-12 " />
          <div className="flex flex-col lg:gap-2 justify-center items-center">
            <h4 className="text-[#FFFFFF] font-bold lg:text-4xl"><CountUp start={0} end={50} delay={0} separator="">
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                  <span>+</span>
                </div>
              )}
            </CountUp>
            </h4>
            <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Countries Visited</p>
          </div>
        </div>
      </div>

      <div className="lg:w-[240px] mx-auto lg:px-8 lg:py-8 px-3 py-2 rounded-[20px] bg-gradient-to-b from-[#058B78] to-[#29C8B1] border border-[#FFFFFF]">
        <div className="flex flex-col items-center gap-10">
          <img src={impact4} alt="impact4" className="h-12" />
          <div className="flex flex-col lg:gap-2 justify-center items-center">
            <h4 className="text-[#FFFFFF] font-bold lg:text-4xl">897/5</h4>
            <p className="text-[#FFFFFF] text-sm lg:text-[16px]">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImpactCard