import Testimonial from "./Testimonial"
import box1 from "../../../../assets/box.png"

const OurMerchant = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:gap-10 lg:mt-30 mt-20">
      <div className="relative flex flex-col lg:gap-8 gap-4 px-4 text-center">
        <h1 className="z-10 bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold lg:text-4xl">What Our Merchants Says</h1>
        <img
          src={box1}
          alt="box1"
          className="w-30 h-28 absolute bottom-6 right-92 opacity-50 lg:flex hiddenz-5"
        />
      <p className="text-[#221E33] ">Our Testimonials</p>
      </div>
      <div className="mb-20">
        <Testimonial />
      </div>
    </div>
  )
}

export default OurMerchant