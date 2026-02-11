import { Link } from "react-router-dom";
import { useState } from "react";
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
import { useTranslation } from "react-i18next";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  twitter: "https://twitter.com/",
  linkedin: "https://www.linkedin.com/",
};

const FOOTER_BACKGROUND_URL =
  "https://t3.ftcdn.net/jpg/11/28/67/04/360_F_1128670497_hbu3iERhsFLRZgY9fQ2K9dOWO8o9Wjcx.jpg";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { data: contactInfo, isLoading: contactLoading } = useContactInfo();
  const subscribeMutation = useSubscribeNewsletter();
  const address = contactInfo?.contactAddress ?? "123 Adventure Street, Brussels, Belgium 1000";
  const phone = contactInfo?.contactPhone ?? "+32 2 123 4567";
  const emailContact = contactInfo?.contactEmail ?? "hello@proactivefuture.com";
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
      className="flex flex-col lg:justify-center relative w-full min-w-full overflow-hidden"
      style={{ backgroundColor: "#101828" }}
    >
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${FOOTER_BACKGROUND_URL})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#101828]/88" />
      {/* parent */}
      <div className="relative z-10 max-w-5xl mx-auto lg:py-20 px-4 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-8 relative z-10 text-white">
          <img src={FooterLogo} alt="FooterLogo" className="w-40" />
          <span className="leading-relaxed text-[13px] font-medium text-nowrap" dangerouslySetInnerHTML={{ __html: t('footer.tagline').replace(/\n/g, '<br />') }} />
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
          <span className="text-[#0DAC87] text-xl font-bold">{t('footer.quickLinks')}</span>
          <div className="flex flex-col gap-4 lg:mt-12 mt-4 text-white">
            <Link
              to="/about"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              {t('navbar.aboutUs')}
            </Link>
            <Link
              to="/what-we-do"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              {t('footer.whoWeAre')}
            </Link>
            <Link
              to="/travel-coordinator"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              {t('navbar.coordinators')}
            </Link>
            <Link
              to="/advantages"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              {t('footer.memberBenefits')}
            </Link>
            <Link
              to="/contact"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              {t('navbar.contact')}
            </Link>
            <Link
              to="/faq"
              className="font-medium hover:text-[#0DAC87] cursor-pointer transition-all duration-300 ease-in"
            >
              {t('navbar.faq')}
            </Link>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">{t('footer.contactInfo')}</span>
          <div className="lg:mt-12 mt-4 flex flex-col gap-6">
            <div className="flex gap-4">
              <FaLocationDot className="mt-1 shrink-0" size={20} color="#0DAC87" />
              <span className="text-white text-[14px]">
                {contactLoading ? t('common.loading') : address}
              </span>
            </div>
            <div className="flex gap-4">
              <FaPhoneAlt size={20} color="#0DAC87" className="shrink-0" />
              <span className="text-white text-[14px]">
                {contactLoading ? t('common.loading') : phone}
              </span>
            </div>
            <div className="flex gap-4">
              <HiOutlineMail size={20} color="#0DAC87" className="shrink-0" />
              <a
                href={`mailto:${emailContact}`}
                className="text-white text-[14px] hover:text-[#0DAC87] transition-colors"
              >
                {contactLoading ? t('common.loading') : emailContact}
              </a>
            </div>
          </div>
        </div>

        <div>
          <span className="text-[#0DAC87] text-xl font-bold">{t('footer.stayUpdated')}</span>
          <div className="lg:mt-11 mt-4 flex flex-col gap-6">
            <span className="text-[12px] text-white font-medium">
              {t('footer.newsletterText')}
            </span>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                required
                disabled={subscribeMutation.isPending}
                className="border border-[#364153] rounded-full py-6 px-4 placeholder:text-[#FFFFFF52] lg:w-70"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="hover:scale-105 transition-all duration-300 rounded-full lg:w-70 py-6 bg-[#0DAC87] hover:bg-[#109e7d] cursor-pointer text-white font-bold disabled:opacity-70"
              >
                {subscribeMutation.isPending ? t('footer.subscribing') : t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:px-20">
        <Separator className="border-[#364153] bg-[#364153] mx-auto px-4" />
        <div className="text-[#FFFFFF] flex flex-col lg:flex-row lg:justify-between items-center lg:mt-6 py-4">
          <span className="text-[12px]">
            {t('footer.copyright')}
          </span>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-[12px] hover:text-[#0DAC87] transition-colors"
            >
              {t('footer.privacyPolicy')}
            </Link>
            <Link
              to="/terms"
              className="text-[12px] hover:text-[#0DAC87] transition-colors"
            >
              {t('footer.termsOfServices')}
            </Link>
            <Link
              to="/cookie-policy"
              className="text-[12px] hover:text-[#0DAC87] transition-colors"
            >
              {t('footer.cookiePolicy')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
