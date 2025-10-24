import tripStats from "../../../assets/sidebaricon/tripStats.png"

const Tripcategories = () => {
  return (
    <div className="px-4 py-5 rounded-[25px] bg-white lg:mt-3 shadow-sm min-w-[280px] h-full">
      <h1 className="font-medium text-[16px]">Trip Categories</h1>
      <div className="flex justify-center items-center mt-5">
        <img src={tripStats} alt="tripStats" className="h-40" />
      </div>
      <div className="mt-4 flex md:justify-center justify-around gap-3 flex-nowrap mb-1">
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4 border border-[#0C038B] rounded-full bg-[#0C038B]/10" />
          <p className="text-[#666373] font-quickSand text-[12px] text-nowrap">Wild Trip</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4 border border-[#038B6B] rounded-full bg-[#038B6B]/10" />
          <p className="text-[#666373] font-quickSand text-[12px] text-nowrap">Wild Weekend</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4 border border-[#814500] rounded-full bg-[#814500]/10" />
          <p className="text-[#666373] font-quickSand text-[12px]">Other</p>
        </div>
      </div>
    </div>
  );
};

export default Tripcategories