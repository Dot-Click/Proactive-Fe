import included1 from "../../../assets/included1.png"
// import included2 from "../../../assets/included2.png"
// import included3 from "../../../assets/included3.png"
// import included4 from "../../../assets/included4.png"
// import included5 from "../../../assets/included5.png"

const Includeditem = ({ trip }: { trip: any }) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;
    
    // Handle both camelCase and snake_case field names from database
    const IncludedItem = data?.included || data?.Included || [];
    const NotIncludedItem = data?.notIncluded || data?.not_included || data?.NotIncluded || [];
    
    return (
        <>

            <div className=" bg-[#F9F9F9]">
                <div className="w-full h-6 bg-[url('/zigzag.png')] bg-repeat-x bg-top"></div>

                <div className="flex flex-col px-4 sm:px-16 py-6">

                    <h4 className="font-bold text-[#000000] text-lg">What's Included</h4>
                    {/* included */}
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 py-4">
                        {IncludedItem && Array.isArray(IncludedItem) && IncludedItem.length > 0 ? (
                            IncludedItem.map((item: any, index: number) => (
                                <div key={index} className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                                    <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                        <img 
                                            src={item?.img || included1} 
                                            alt={item?.title || "included item"} 
                                            className="w-10 h-8"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = included1;
                                            }}
                                        />
                                        <h4 className="font-semibold">{item?.title}</h4>
                                        <span className="text-[#606066] text-[11px] text-center">
                                            {item?.description || "Boutique camp accommodation with cozy shared spaces."}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No items available</p>
                        )}

                        {/* <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included2} alt="included2" className="w-10 h-8" />
                                <h4 className="font-semibold">Daily Breakfasts</h4>
                                <span className="text-[#606066] text-[11px] text-center">Fresh and healthy breakfasts <br /> included throughout the trip</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included3} alt="included3" className="w-10 h-8" />
                                <h4 className="font-semibold">Airport Transfers</h4>
                                <span className="text-[#606066] text-[11px] text-center">Arrival & departure transfers for a smooth start & end.</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included4} alt="included4" className="w-10 h-8" />
                                <h4 className="font-semibold">Trip Coordinator</h4>
                                <span className="text-[#606066] text-[11px] text-center">Professional English-speaking coordinator for full guidance.</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included5} alt="included5" className="w-10 h-8" />
                                <h4 className="font-semibold">Sagrada Familia Tour</h4>
                                <span className="text-[#606066] text-[11px] text-center">Skip-the-line entry with guided experience.</span>
                            </div>
                        </div> */}

                    </div>

                    <h4 className="font-bold text-[#B80505] text-lg">Not Included</h4>
                    {/* Not included */}
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 py-4">
                        {NotIncludedItem && Array.isArray(NotIncludedItem) && NotIncludedItem.length > 0 ? (
                            NotIncludedItem.map((item: any, index: number) => (
                                <div key={index} className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                                    <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                        <img 
                                            src={item?.img || included1} 
                                            alt={item?.title || "not included item"} 
                                            className="w-10 h-8"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = included1;
                                            }}
                                        />
                                        <h4 className="font-semibold">{item?.title}</h4>
                                        <span className="text-[#606066] text-[11px] text-center">
                                            {item?.description || "Flights to/from Barcelona not covered."}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No items available</p>
                        )}
                        {/* <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included2} alt="included2" className="w-10 h-8" />
                                <h4 className="font-semibold">Travel Insurance</h4>
                                <span className="text-[#606066] text-[11px] text-center">Personal insurance must be <br /> arranged separately.</span>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#C1C1C1] rounded-[15px] px-2 py-4">
                            <div className="flex flex-col gap-4 py-4 justify-center items-center">
                                <img src={included3} alt="included3" className="w-10 h-8" />
                                <h4 className="font-semibold">Shopping & Souvenirs</h4>
                                <span className="text-[#606066] text-[11px] text-center">Personal purchases not included.</span>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="w-full h-6 bg-[url('/zigzagbottom.png')] "></div>
            </div>
        </>
    )
}

export default Includeditem