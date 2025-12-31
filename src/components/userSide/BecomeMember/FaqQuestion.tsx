import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const faqs = [
    {
        q: "What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?",
        a: "A Wild Trip is a longer adventure (5–12 days) with multiple activities, destinations, and cultural experiences. A Wild Weekend is a short escape (2–4 days), usually Friday to Sunday, designed for quick adventure and fun.",
    },
    {
        q: "What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?",
        a: "A Wild Trip is a longer adventure (5–12 days)...",
    },
    {
        q: "What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?",
        a: "A Wild Trip is a longer adventure (5–12 days)...",
    },
    {
        q: "What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?",
        a: "A Wild Trip is a longer adventure (5–12 days)...",
    },
    {
        q: "What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?",
        a: "A Wild Trip is a longer adventure (5–12 days)...",
    },

];

const FaqQuestion = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col gap-8 px-5 py-4">

            {faqs.map((faq, index) => (
                <div key={index} className="flex flex-col">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center items-start md:gap-40 gap-6 bg-[#F0F5FD] px-5 py-4 rounded-tl-[20px] rounded-tr-[20px]">
                        <h1 className="text-[#221E33] font-bold text-[12px] lg:text-[16px]">{faq.q}</h1>

                        <div className="bg-white shadow-sm px-4 py-4 rounded-full">
                            {
                                openIndex === index ? (
                                    <ImCross
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={() => toggle(index)}
                                    />
                                ) : (
                                    <FaPlus
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={() => toggle(index)}
                                    />
                                )
                            }
                        </div>
                    </div>

                    {openIndex === index && (
                        <div className="bg-white shadow-sm px-5 py-8 rounded-bl-[20px] rounded-br-[20px] transition duration-300">
                            <p className="md:w-[700px]">{faq.a}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* <div className="flex flex-col">
                <div className="flex justify-between items-center gap-40 bg-[#F0F5FD] px-5 py-4 rounded-tl-[20px] rounded-tr-[20px]">
                    <h1 className="text-[#221E33] font-bold">What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?</h1>
                    <div className="bg-white shadow-sm px-4 py-4 rounded-full">
                        {
                            isOpen ?
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <ImCross size={20} className="cursor-pointer" />
                                </div>
                                :
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <FaPlus size={20} className="cursor-pointer" />
                                </div>
                        }
                    </div>
                </div>
                {
                    isOpen ?
                        <div className="bg-white shadow-sm px-5 py-8 rounded-bl-[20px] rounded-br-[20px] transition transition-discrete delay-200 duration-500">
                            <p>A Wild Trip is a longer adventure (5–12 days) with multiple activities, destinations, and cultural <br /> experiences. A Wild Weekend is a short escape (2–4 days), usually Friday to Sunday, designed for <br /> quick adventure and fun.</p>
                        </div>
                        : ''
                }
            </div>

            <div className="flex flex-col">
                <div className="flex justify-between items-center gap-40 bg-[#F0F5FD] px-5 py-4 rounded-tl-[20px] rounded-tr-[20px]">
                    <h1 className="text-[#221E33] font-bold">What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?</h1>
                    <div className="bg-white shadow-sm px-4 py-4 rounded-full">
                        {
                            isOpen ?
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <ImCross size={20} className="cursor-pointer" />
                                </div>
                                :
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <FaPlus size={20} className="cursor-pointer" />
                                </div>
                        }
                    </div>
                </div>
                {
                    isOpen ?
                        <div className="bg-white shadow-sm px-5 py-8 rounded-bl-[20px] rounded-br-[20px] transition transition-discrete delay-200 duration-500">
                            <p>A Wild Trip is a longer adventure (5–12 days) with multiple activities, destinations, and cultural <br /> experiences. A Wild Weekend is a short escape (2–4 days), usually Friday to Sunday, designed for <br /> quick adventure and fun.</p>
                        </div>
                        : ''
                }
            </div>

            <div className="flex flex-col">
                <div className="flex justify-between items-center gap-40 bg-[#F0F5FD] px-5 py-4 rounded-tl-[20px] rounded-tr-[20px]">
                    <h1 className="text-[#221E33] font-bold">What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?</h1>
                    <div className="bg-white shadow-sm px-4 py-4 rounded-full">
                        {
                            isOpen ?
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <ImCross size={20} className="cursor-pointer" />
                                </div>
                                :
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <FaPlus size={20} className="cursor-pointer" />
                                </div>
                        }
                    </div>
                </div>
                {
                    isOpen ?
                        <div className="bg-white shadow-sm px-5 py-8 rounded-bl-[20px] rounded-br-[20px] transition transition-discrete delay-200 duration-500">
                            <p>A Wild Trip is a longer adventure (5–12 days) with multiple activities, destinations, and cultural <br /> experiences. A Wild Weekend is a short escape (2–4 days), usually Friday to Sunday, designed for <br /> quick adventure and fun.</p>
                        </div>
                        : ''
                }
            </div>

            <div className="flex flex-col">
                <div className="flex justify-between items-center gap-40 bg-[#F0F5FD] px-5 py-4 rounded-tl-[20px] rounded-tr-[20px]">
                    <h1 className="text-[#221E33] font-bold">What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?</h1>
                    <div className="bg-white shadow-sm px-4 py-4 rounded-full">
                        {
                            isOpen ?
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <ImCross size={20} className="cursor-pointer" />
                                </div>
                                :
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <FaPlus size={20} className="cursor-pointer" />
                                </div>
                        }
                    </div>
                </div>
                {
                    isOpen ?
                        <div className="bg-white shadow-sm px-5 py-8 rounded-bl-[20px] rounded-br-[20px] transition transition-discrete delay-200 duration-500">
                            <p>A Wild Trip is a longer adventure (5–12 days) with multiple activities, destinations, and cultural <br /> experiences. A Wild Weekend is a short escape (2–4 days), usually Friday to Sunday, designed for <br /> quick adventure and fun.</p>
                        </div>
                        : ''
                }
            </div>

            <div className="flex flex-col">
                <div className="flex justify-between items-center gap-40 bg-[#F0F5FD] px-5 py-4 rounded-tl-[20px] rounded-tr-[20px]">
                    <h1 className="text-[#221E33] font-bold">What is the difference between a Wild Trip (WT) and a Wild Weekend (WW)?</h1>
                    <div className="bg-white shadow-sm px-4 py-4 rounded-full">
                        {
                            isOpen ?
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <ImCross size={20} className="cursor-pointer" />
                                </div>
                                :
                                <div onClick={() => setIsOpen(prev => !prev)}>
                                    <FaPlus size={20} className="cursor-pointer" />
                                </div>
                        }
                    </div>
                </div>
                {
                    isOpen ?
                        <div className="bg-white shadow-sm px-5 py-8 rounded-bl-[20px] rounded-br-[20px] transition transition-discrete delay-200 duration-500">
                            <p>A Wild Trip is a longer adventure (5–12 days) with multiple activities, destinations, and cultural <br /> experiences. A Wild Weekend is a short escape (2–4 days), usually Friday to Sunday, designed for <br /> quick adventure and fun.</p>
                        </div>
                        : ''
                }
            </div> */}

        </div>
    )
}

export default FaqQuestion