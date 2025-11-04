import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import day1 from "../../../assets/day1.png"
import day2 from "../../../assets/day2.png"
import day3 from "../../../assets/day3.png"
import day4 from "../../../assets/day4.png"
import map from "../../../assets/map.png"

const Daybyday = () => {
    return (
        <>
        <div className="px-4 sm:px-16 py-6">
            <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-lg">Day by Day Itinerary</span>
            <div className="flex lg:flex-row flex-col justify-between gap-8">
                {/* accordion */}
                <div className="py-8 mb-2 w-full">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full flex flex-col gap-4"
                        // defaultValue="item-1"
                    >
                        <AccordionItem value="item-1" className="bg-[#FFFFFF] border border-[#E9E9E9] rounded-[15px] px-6 shadow-xl/4">
                            <AccordionTrigger className="flex items-center">
                                <div className="flex items-center gap-4">
                                    <img src={day1} alt="day1" className="w-20 h-20 rounded-[15px]" />
                                    <div className="flex flex-col">
                                        <span>
                                            Day 1
                                        </span>
                                        <span>Arrival in Marrakech</span>
                                    </div>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                                <p>
                                    Key features include advanced processing capabilities, and an
                                    intuitive user interface designed for both beginners and experts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="bg-[#FFFFFF] border border-[#E9E9E9] rounded-[15px] px-6 shadow-xl/4">
                            <AccordionTrigger className="flex items-center">
                                <div className="flex items-center gap-4">
                                    <img src={day2} alt="day2" className="w-20 h-20 rounded-[15px]" />
                                    <div className="flex flex-col">
                                        <span>
                                            Day 2
                                        </span>
                                        <span>Journey to the Desert</span>
                                    </div>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                                <p>
                                    Key features include advanced processing capabilities, and an
                                    intuitive user interface designed for both beginners and experts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="bg-[#FFFFFF] border border-[#E9E9E9] rounded-[15px] px-6 shadow-xl/4">
                            <AccordionTrigger className="flex items-center">
                                <div className="flex items-center gap-4">
                                    <img src={day3} alt="day3" className="w-20 h-20 rounded-[15px]" />
                                    <div className="flex flex-col">
                                        <span>
                                            Day 3
                                        </span>
                                        <span>Sagrada Familia Tour</span>
                                    </div>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                                <p>
                                    Key features include advanced processing capabilities, and an
                                    intuitive user interface designed for both beginners and experts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="bg-[#FFFFFF] border border-[#E9E9E9] rounded-[15px] px-6 shadow-xl/4">
                            <AccordionTrigger className="flex items-center">
                                <div className="flex items-center gap-4">
                                    <img src={day4} alt="day4" className="w-20 h-20 rounded-[15px]" />
                                    <div className="flex flex-col">
                                        <span>
                                            Day 4
                                        </span>
                                        <span>Farewell Barcelona</span>
                                    </div>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                                <p>
                                    Key features include advanced processing capabilities, and an
                                    intuitive user interface designed for both beginners and experts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* map */}
                <div>
                    <img src={map} alt="map"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Daybyday