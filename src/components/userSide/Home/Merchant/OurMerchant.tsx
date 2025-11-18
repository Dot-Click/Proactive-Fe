import Testimonial from "./Testimonial"

const OurMerchant = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:gap-10 lg:mt-30 mt-20">
        <h1 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold lg:text-4xl">What Our Merchants Says</h1>
        <p className="text-[#221E33] ">Our Testimonials</p>
        <div className="mb-20">
            <Testimonial/>
        </div>
    </div>
  )
}

export default OurMerchant