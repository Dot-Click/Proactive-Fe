// import importantMask from "../../../../assets/importantmask.png"
// import importantlayer from "../../../../assets/importantlayer.png"
// import ImpactCard from "./ImpactCard";
// const ImpactNumber = () => {
//     return (
//         <div className="relative mb-5">
//             <img
//                 src={importantMask}
//                 alt="importantMask"
//                 className="lg:h-120 lg:w-full h-100" 
//             />
//             <div
//                 className="absolute inset-0 lg:top-0 lg:h-120 lg:w-full h-100 opacity-90"
//                 style={{
//                     background: "linear-gradient(135deg, #0a4d47 0%, #058B78 25%, #0d9488 50%, #14b8a6 75%, #2dd4bf 100%)",
//                 }}
//                 aria-hidden
//             />
//             <div className="absolute inset-0 lg:top-0 top-8">
//                 <img src={importantlayer} alt="importantlayer" className="opacity-80" />
//             </div>
//             <div className="flex flex-col lg:gap-6 absolute inset-0 lg:top-8 top-2 lg:py-8">
//                 <h1 className="text-center lg:text-5xl bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE]/96  text-transparent bg-clip-text font-extrabold">Our Impact in Numbers</h1>
//                 <p className="text-[8px] lg:text-lg font-semibold text-[#FFFFFF] text-center">Choose your path to adventure. Whether you're looking for a quick escape or an extended journey, <br className="lg:block hidden"/>
//                     we have the perfect experience waiting for you.</p>
//             </div>
//             <div className="flex flex-col gap-6 absolute inset-0 justify-center items-center lg:top-20 top-10">
//                 <ImpactCard/>
//             </div>
//         </div>
//     );
// };

// export default ImpactNumber

import importantMask from "../../../../assets/importantmask.png";
import importantlayer from "../../../../assets/importantlayer.png";
import ImpactCard from "./ImpactCard";
import { useTranslation } from "react-i18next";

const IMPACT_BACKGROUND_URL =
  "https://as1.ftcdn.net/jpg/03/50/68/30/1000_F_350683074_SSaXPN4XBvmwEKWRG4aU18Kl7kwkOdrg.jpg";

const ImpactNumber = () => {
    const { t } = useTranslation();
    return (
      <div className="relative mb-5">
        <img
          src={importantMask}
          alt="importantMask"
          className="lg:h-120 lg:w-full h-100"
        />
        <div className="absolute inset-0 lg:top-0">
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${IMPACT_BACKGROUND_URL})` }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B7262]/75 via-[#0A4D47]/65 to-[#013932]/80 pointer-events-none" />
          </div>
        </div>
        <div className="absolute inset-0 lg:top-0 top-8">
          <img
            src={importantlayer}
            alt="importantlayer"
            className="opacity-80"
          />
        </div>
        <div className="flex flex-col lg:gap-6 absolute inset-0 lg:top-8 top-2 lg:py-8">
          <h1 className="text-center lg:text-5xl bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE]/96  text-transparent bg-clip-text font-extrabold">
            {t("home.impactNumbers")}
          </h1>
          <p
            className="text-[8px] lg:text-lg font-semibold text-[#FFFFFF] text-center"
            dangerouslySetInnerHTML={{
              __html: t("home.adventureOpportunitiesSubtitle").replace(
                /\n/g,
                '<br className="lg:block hidden" />',
              ),
            }}
          />
        </div>
        <div className="flex flex-col gap-6 absolute inset-0 justify-center items-center lg:top-20 top-10">
          <ImpactCard />
        </div>
      </div>
    );
};

export default ImpactNumber