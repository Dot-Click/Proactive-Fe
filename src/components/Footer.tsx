import footer from "../assets/footer.png"
import FooterLogo from "../assets/FooterLogo.png"
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="relative min-h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${footer})` }}>
      <div className="bg-[#101828]/90 absolute inset-0" />
      {/* parent */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="flex flex-col gap-8 relative z-10 text-white">
          <img src={FooterLogo} alt="FooterLogo" className="w-40" />
          <span>Creating unforgettable adventures <br /> and connecting travelers worldwide. <br /> Your journey to extraordinary <br /> experiences starts here.</span>
          <div className="flex gap-4 text-xl">
            <div className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full">
              <FaFacebookF color="#0DAC87" />
            </div>
            <div className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full">
              <RiInstagramFill color="#0DAC87" />
            </div>
            <div className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full">
              <BsTwitterX color="#0DAC87" />
            </div>
            <div className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full">
              <FaLinkedinIn color="#0DAC87" />
            </div>
          </div>
        </div>

        <div className="ml-4">
          <span className="text-[#0DAC87] text-xl font-bold">Quick Links</span>
          <div className="flex flex-col gap-4 mt-12 text-white">
            <span className="font-semibold">About Us</span>
            <span className="font-semibold">Who We Are</span>
            <span className="font-semibold">Coordinators</span>
            <span className="font-semibold">Member Benefits</span>
            <span className="font-semibold">Contact</span>
            <span className="font-semibold">FAQ</span>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">Contact Info</span>
          <div className="mt-12">
          <div className="flex gap-2">
            <FaLocationDot className="mt-1" size={20} color="#0DAC87"/>
            <span className="text-white">123 Adventure Street
              Brussels, Belgium 1000</span>
          </div>
          <div>
            <FaPhoneAlt />
          </div>
          <div>
            <HiOutlineMail />
          </div>
          </div>
        </div>
        <div>
          <span className="text-[#0DAC87] text-xl font-bold">Stay Updated</span>
        </div>
      </div>


    </div>
  )
}

export default Footer