
const Travelpreference = () => {
    return (
        <div>
            <div className="bg-[#FAFAFA] rounded-tl-[20px] rounded-tr-[20px] border border-[#D9D9D9]">
                <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-4 py-6">
                    Travel Preferences
                </h1>
            </div>

            <div className="bg-[#FAFAFA] border border-[#D9D9D9] px-7 py-6 rounded-bl-[20px] rounded-br-[20px]">
                <div className="grid grid-cols-2">

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Dietary Restriction</span>
                            <span className="text-[#666373] text-[14px]">none</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Nationality</span>
                            <span className="text-[#666373] text-[14px]">American</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Travelpreference