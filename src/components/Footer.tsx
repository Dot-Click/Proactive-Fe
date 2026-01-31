import { Link } from "react-router-dom";
import { useState } from "react";
import footer from "../assets/footer.png";
import FooterLogo from "../assets/FooterLogo.png";
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useContactInfo } from "@/hooks/getContactInfohook";
import { useSubscribeNewsletter } from "@/hooks/subscribeNewsletterhook";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  twitter: "https://twitter.com/",
  linkedin: "https://www.linkedin.com/",
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const { data: contactInfo, isLoading: contactLoading } = useContactInfo();
  const subscribeMutation = useSubscribeNewsletter();
  const address = contactInfo?.contactAddress ?? "123 Adventure Street, Brussels, Belgium 1000";
  const phone = contactInfo?.contactPhone ?? "+32 2 123 4567";
  const emailContact = contactInfo?.contactEmail ?? "hello@proactivefuture.com";
console.log(contactInfo);
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    subscribeMutation.mutate(trimmed, {
      onSuccess: () => setEmail(""),
    });
  };

  return (
    <div
      className="flex flex-col lg:justify-center relative w-full min-w-full bg-cover bg-center shrink-0"
      style={{ backgroundImage: `url(${footer})` }}
    >
      <div className="bg-[#101828]/90 absolute inset-0" />
      {/* parent */}
      <div className="relative z-10 max-w-5xl mx-auto lg:py-20 px-4 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-8 relative z-10 text-white">
          <img src={FooterLogo} alt="FooterLogo" className="w-40" />
          <span className="leading-relaxed text-[13px] font-medium text-nowrap">
            Creating unforgettable adventures <br /> and connecting travelers
            worldwide. <br /> Your journey to extraordinary <br /> experiences
            starts here.
          </span>
          <div className="flex gap-4 text-xl">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full"
              aria-label="Facebook"
            >
              <FaFacebookF color="#0DAC87" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full"
              aria-label="Instagram"
            >
              <RiInstagramFill color="#0DAC87" />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full"
              aria-label="Twitter"
            >
              <BsTwitterX color="#0DAC87" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0DAC87]/6 hover:bg-[#c5e4dc] transition-all delay-100 cursor-pointer px-3 py-3 rounded-full"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn color="#0DAC87" />
            </a>
          </div>
        </div>

        <div className="lg:ml-8">
          <span className="text-[#0DAC87] text-xl font-bold">Quick Links</span>
          <div className="flex flex-col gap-4 lg:mt-12 mt-4 text-white">
            <Link
              to="/about"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              About Us
            </Link>
            <Link
              to="/what-we-do"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              Who We Are
            </Link>
            <Link
              to="/travel-coordinator"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              Coordinators
            </Link>
            <Link
              to="/advantages"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              Member Benefits
            </Link>
            <Link
              to="/contact"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              FAQ
            </Link>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">Contact Info</span>
          <div className="lg:mt-12 mt-4 flex flex-col gap-6">
            <div className="flex gap-4">
              <FaLocationDot className="mt-1 shrink-0" size={20} color="#0DAC87" />
              <span className="text-white text-[14px]">
                {contactLoading ? "Loading..." : address}
              </span>
            </div>
            <div className="flex gap-4">
              <FaPhoneAlt size={20} color="#0DAC87" className="shrink-0" />
              <span className="text-white text-[14px]">
                {contactLoading ? "Loading..." : phone}
              </span>
            </div>
            <div className="flex gap-4">
              <HiOutlineMail size={20} color="#0DAC87" className="shrink-0" />
              <a
                href={`mailto:${emailContact}`}
                className="text-white text-[14px] hover:text-[#0DAC87] transition-colors"
              >
                {contactLoading ? "Loading..." : emailContact}
              </a>
            </div>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">Stay Updated</span>
          <div className="lg:mt-11 mt-4 flex flex-col gap-6">
            <span className="text-[12px] text-white font-medium">
              Subscribe to our newsletter for the latest adventures and exclusive
              offers.
            </span>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                disabled={subscribeMutation.isPending}
                className="border border-[#364153] rounded-full py-6 px-4 placeholder:text-[#FFFFFF52] lg:w-70"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="hover:scale-105 transition-all duration-300 rounded-full lg:w-70 py-6 bg-[#0DAC87] hover:bg-[#109e7d] cursor-pointer text-white font-bold disabled:opacity-70"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:px-20">
        <Separator className="border-[#364153] bg-[#364153] mx-auto px-4" />
        <div className="text-[#FFFFFF] flex flex-col lg:flex-row lg:justify-between items-center lg:mt-6 py-4">
          <span className="text-[12px]">
            © 2025 Proactive Future. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-[12px] hover:text-[#0DAC87] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[12px] hover:text-[#0DAC87] transition-colors"
            >
              Terms of Services
            </Link>
            <Link
              to="/cookie-policy"
              className="text-[12px] hover:text-[#0DAC87] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
