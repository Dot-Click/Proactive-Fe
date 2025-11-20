import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import AboutCarousel1 from "../../../../assets/AboutCarousel1.png"
import AboutCarousel2 from "../../../../assets/AboutCarousel2.png"
import AboutCarousel3 from "../../../../assets/AboutCarousel3.png"
import AboutCarousel4 from "../../../../assets/AboutCarousel4.png"
import { useState } from "react";
const Carousel = () => {
const [index, Setindex] = useState(0)

const prev = () => {
Setindex(index - 1)
}

const next = () => {
Setindex(index + 1)
}
  return (
    <div className="flex items-center justify-center lg:gap-12 gap-6">
        <IoIosArrowBack className="h-4 lg:h-12 cursor-pointer" size={30} onClick={prev}/>
        <div className="flex lg:gap-12 gap-6" style={{}}>
        <img src={AboutCarousel1} alt="AboutCarousel1" className="lg:h-20 h-10"/>
        <img src={AboutCarousel2} alt="AboutCarousel2" className="lg:h-20 h-10"/>
        <img src={AboutCarousel3} alt="AboutCarousel3" className="lg:h-20 h-10"/>
        <img src={AboutCarousel4} alt="AboutCarousel4" className="lg:h-20 h-10 object-cover"/>
        </div>
        <IoIosArrowForward className="h-4 lg:h-12 cursor-pointer" size={30} onClick={next}/>
    </div>
  )
}

export default Carousel