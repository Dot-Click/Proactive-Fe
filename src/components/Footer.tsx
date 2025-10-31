import footer from "../assets/footer.png"
import FooterLogo from "../assets/FooterLogo.png"
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="relative min-h-[90vh] w-screen  bg-cover bg-center" style={{ backgroundImage: `url(${footer})` }}>
      <div className="bg-[#101828]/90 absolute inset-0" />
      {/* parent */}
      <div className="relative z-10 max-w-5xl mx-auto lg:py-20 px-4 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="flex flex-col gap-8 relative z-10 text-white">
          <img src={FooterLogo} alt="FooterLogo" className="w-40" />
          <span className="leading-relaxed text-[13px] font-medium text-nowrap">Creating unforgettable adventures <br /> and connecting travelers worldwide. <br /> Your journey to extraordinary <br /> experiences starts here.</span>
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

        <div className="lg:ml-8">
          <span className="text-[#0DAC87] text-xl font-bold">Quick Links</span>
          <div className="flex flex-col gap-4 lg:mt-12 mt-4 text-white">
            <span className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in">About Us</span>
            <span className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in">Who We Are</span>
            <span className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in">Coordinators</span>
            <span className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in">Member Benefits</span>
            <span className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in">Contact</span>
            <span className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in">FAQ</span>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">Contact Info</span>
          <div className="lg:mt-12 mt-4 flex flex-col gap-6">
            <div className="flex gap-4">
              <FaLocationDot className="mt-1" size={20} color="#0DAC87" />
              <span className="text-white text-[14px]">123 Adventure Street <br />
                Brussels, Belgium 1000</span>
            </div>
            <div className="flex gap-4">
              <FaPhoneAlt size={20} color="#0DAC87" />
              <span className="text-white text-[14px]">+32 2 123 4567</span>
            </div>
            <div className="flex gap-4">
              <HiOutlineMail size={20} color="#0DAC87" />
              <span className="text-white text-[14px]">hello@proactivefuture.com</span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">Stay Updated</span>
          <div className="lg:mt-11 mt-4 flex flex-col gap-6">
            <span className="text-[12px] text-white font-medium">Subscribe to our newsletter for the latest adventures and exclusive offers.</span>
            <Input
              className="border border-[#364153] rounded-full py-6 px-4 placeholder:text-[#FFFFFF52] lg:w-70"
              placeholder="Your Email Address"
            />
            <Button className="hover:scale-105 transition-all duration-300 rounded-full lg:w-70 py-6 bg-[#0DAC87] hover:bg-[#109e7d] cursor-pointer text-white font-bold">
              Subscribe
            </Button>
          </div>
        </div>

      </div>

      <div className="relative z-10 lg:px-20">
        <Separator className="border-[#364153] bg-[#364153] mx-auto px-4" />
        <div className="text-[#FFFFFF] flex flex-col lg:flex-row lg:justify-between items-center lg:mt-6 py-4">
          <span className="text-[12px]">© 2025 Proactive Future. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="text-[12px]">Privacy Policy</span>
            <span className="text-[12px]">Terms of Services</span>
            <span className="text-[12px]">Cookie Policy</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer