
const Tabs = () => {
    return (
        <>
            <div className="px-4 sm:px-16 py-6">
                <div className="bg-[#FFFFFF] border border-[#D9D9D9] shadow-md rounded-full px-6 py-2 w-fit ">
                    <div className="flex gap-8 items-center cursor-pointer">
                        <div className="flex items-center gap-2 bg-[#000000] px-6 py-3 rounded-full ">
                            <span className="text-[#FFFFFF] font-semibold">All</span>
                            <div className="bg-[#FFFFFF] rounded-[3px] text-[#000000] px-[4px] h-5 font-semibold flex items-center justify-center">
                                3
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#000000] px-6 py-3 rounded-full ">
                            <span className="text-[#FFFFFF] font-semibold">Open</span>
                            <div className="bg-[#FFFFFF] rounded-[3px] text-[#000000] px-[4px] h-5 font-semibold flex items-center justify-center">
                                3
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#000000] px-6 py-3 rounded-full ">
                            <span className="text-[#FFFFFF] font-semibold">Coming Soon</span>
                            <div className="bg-[#FFFFFF] rounded-[3px] text-[#000000] px-[4px] h-5 font-semibold flex items-center justify-center">
                                3
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#000000] px-6 py-3 rounded-full ">
                            <span className="text-[#FFFFFF] font-semibold">Closed</span>
                            <div className="bg-[#FFFFFF] rounded-[3px] text-[#000000] px-[4px] h-5 font-semibold flex items-center justify-center">
                                3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-[#D9D9D9] mb-4 -mt-[4px]" />
        </>
    )
}

export default Tabs