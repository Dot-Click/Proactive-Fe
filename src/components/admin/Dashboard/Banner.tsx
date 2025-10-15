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
        <div className="relative w-full h-70 md:min-w-[480px] rounded-[20px] overflow-hidden mt-3">

            <div
                className="absolute inset-0 bg-center"
                style={{ backgroundImage: `url(${changeBanner || BannerImg})` }}
            ></div>

            <div className="absolute inset-0 opacity-80 bg-radial-[at_40%_40%] from-[#0DAC87] to-[#054637]/100"></div>

            <div className="relative z-10 flex items-center justify-center h-full">
                <input type="file" name="banner" id="bannerimg" className="hidden"  onChange={HandleFileUpload}/>
                <label htmlFor="bannerimg" className="text-white flex items-center gap-2 cursor-pointer absolute top-4 right-2 bg-[#FFFFFF4A]/60 py-4 px-5 rounded-full font-quickSand">
                    <img src={bannericon} alt="bannericon" className="h-4" />
                    Change Banner
                </label>
            </div>
        </div>

    )
}

export default Banner