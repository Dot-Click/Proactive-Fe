import Pastadventure1 from "../../assets/pastadventure1.png"
import Pastadventure2 from "../../assets/pastadventure2.png"
import Pastadventure3 from "../../assets/pastadventure3.png"
import Pastadventure4 from "../../assets/pastadventure4.png"
import Pastadventure5 from "../../assets/pastadventure5.png"
import Pastadventure6 from "../../assets/pastadventure6.png"
import Pastadventure7 from "../../assets/pastadventure7.png"
import Pastadventure8 from "../../assets/pastadventure8.png"
import calenderwhite from "../../assets/calenderwhite.png"
import { Button } from "../ui/button"
import { useState } from "react"
const Pastadventures = () => {
    const [loadmore, setLoadmore] = useState(false)
    return (
        <div className="bg-[#FAFAFA] px-4 sm:px-16 py-8">
            <div className="flex flex-col gap-2 justify-center items-center">
                <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-4xl">Past Adventures</h4>
                <span className="text-[#221E33] text-sm text-center">Explore our completed adventures and see the amazing experiences we've created</span>
            </div>
            <div className="grid lg:grid-cols-4 gap-4 py-12">
                <div className="relative flex justify-center">
                    <img src={Pastadventure1} alt="Pastadventure1" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Cayoning Barcelona</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">05 October 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure2} alt="Pastadventure2" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#DFF2FF] hover:bg-[#ace4d6] cursor-pointer text-[#3B607A] font-semibold rounded-[10px] px-5">Wild Trip</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Iceland Northern Lights</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">15 November 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure3} alt="Pastadventure3" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#FFDFC4] hover:bg-[#f0d1b7] cursor-pointer text-[#622E15] font-semibold rounded-[10px] px-5">Erasmus+</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Berlin Youth Exchange</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">5 octubre de 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure4} alt="Pastadventure4" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Portuguese Coast Adventure</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">08 August 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure5} alt="Pastadventure5" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Romanian Carpathians Trek</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">05 October 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure6} alt="Pastadventure6" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#FFDFC4] hover:bg-[#f0d1b7] cursor-pointer text-[#622E15] font-semibold rounded-[10px] px-5">Erasmus+</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">French Culture Immersion</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">15 November 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure7} alt="Pastadventure7" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#DFF2FF] hover:bg-[#ace4d6] cursor-pointer text-[#3B607A] font-semibold rounded-[10px] px-5">Wild Trip</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Swiss Alpine Weekend</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">5 octubre de 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <img src={Pastadventure8} alt="Pastadventure8" className="w-100 h-100 rounded-[14px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                    <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                        <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                        <div className="flex flex-col items-center gap-1">
                            <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Greek Islands Expedition</h4>
                            <div className="flex items-center gap-3">
                                <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                <span className="text-[#FFFFFF] text-sm">5 octubre de 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loadmore ?
                        <>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure1} alt="Pastadventure1" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Cayoning Barcelona</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">05 October 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure2} alt="Pastadventure2" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#DFF2FF] hover:bg-[#ace4d6] cursor-pointer text-[#3B607A] font-semibold rounded-[10px] px-5">Wild Trip</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Iceland Northern Lights</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">15 November 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure3} alt="Pastadventure3" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#FFDFC4] hover:bg-[#f0d1b7] cursor-pointer text-[#622E15] font-semibold rounded-[10px] px-5">Erasmus+</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Berlin Youth Exchange</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">5 octubre de 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure4} alt="Pastadventure4" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Portuguese Coast Adventure</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">08 August 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure5} alt="Pastadventure5" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Romanian Carpathians Trek</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">05 October 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure6} alt="Pastadventure6" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#FFDFC4] hover:bg-[#f0d1b7] cursor-pointer text-[#622E15] font-semibold rounded-[10px] px-5">Erasmus+</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">French Culture Immersion</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">15 November 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure7} alt="Pastadventure7" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#DFF2FF] hover:bg-[#ace4d6] cursor-pointer text-[#3B607A] font-semibold rounded-[10px] px-5">Wild Trip</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Swiss Alpine Weekend</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">5 octubre de 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center">
                                <img src={Pastadventure8} alt="Pastadventure8" className="w-100 h-100 rounded-[14px]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/5 to-[#000000]/70 mix-blend-multiply rounded-[14px]"></div>

                                <div className="flex flex-col items-center justify-between absolute top-0 py-6 h-100">
                                    <Button className="bg-[#C4FFF0] hover:bg-[#bcf5e7] cursor-pointer text-[#156250] font-semibold rounded-[10px]">Wild Weekend</Button>
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-[#FFFFFF] font-bold text-lg tracking-wider">Greek Islands Expedition</h4>
                                        <div className="flex items-center gap-3">
                                            <img src={calenderwhite} alt="calenderwhite" className="w-5" />
                                            <span className="text-[#FFFFFF] text-sm">5 octubre de 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : ""
                }
            </div>
            {
                loadmore ?
                    <div className="flex justify-center items-center py-6">
                        <Button className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer rounded-full px-10 py-6">No More Adventures Available</Button>
                    </div>
                    :
                    <div className="flex justify-center items-center py-6">
                        <Button onClick={() => setLoadmore(true)} className="bg-[#0DAC87] hover:bg-[#0ca07d] cursor-pointer rounded-full px-10 py-6">Load More Adventures</Button>
                    </div>
            }
        </div>
    )
}

export default Pastadventures