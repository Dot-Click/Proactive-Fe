import { useState } from "react";
import BannerImg from "@/assets/sidebaricon/bannerImg.png"
import bannericon from "@/assets/sidebaricon/bannericon.png"

const Banner = () => {
const [changeBanner, setChangeBanner] = useState('');

const HandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setChangeBanner(file ? URL.createObjectURL(file) : '');
};

    return (
        <div className="relative w-full h-70 md:min-w-[480px] rounded-[20px] overflow-hidden lg:mt-4 mt-4">

            <div
                className="absolute inset-0 bg-center"
                style={{ backgroundImage: `url(${changeBanner || BannerImg})` }}
            ></div>

            <div className="absolute inset-0 bg-[#0DAC87]/100 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,rgba(13,172,135,0.15)_0%,rgba(5,70,55,0.35)_40%,rgba(0,0,0,0.6)_100%)]"></div>

            <div className="relative z-10 flex items-center justify-center h-full">
                <input type="file" name="banner" id="bannerimg" className="hidden"  onChange={HandleFileUpload}/>
                <label htmlFor="bannerimg" className="text-white flex items-center gap-2 cursor-pointer absolute top-4 right-2 bg-[#111827]/60 backdrop-blur-sm border border-white/10 py-3 px-4 rounded-full font-quickSand shadow-md">
                    <img src={bannericon} alt="bannericon" className="h-4" />
                    Change Banner
                </label>
            </div>
        </div>

    )
}

export default Banner