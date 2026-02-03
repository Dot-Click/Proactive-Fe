import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import zigzagbottom from "../../../assets/zigzagbottom.png"

const Faqs = () => {
    const faqs = [
        {
            question: "Who can join a Wild Trip?",
            answer: "Wild Trips are open to anyone with an adventurous spirit and a positive attitude. You don’t need prior travel experience—just a willingness to explore, connect with others, and enjoy group travel."
        },
        {
            question: "Do I need a visa to join a Wild Trip?",
            answer: "Visa requirements depend on your nationality and the destination country. It is the traveler’s responsibility to check and meet the entry requirements before departure. We recommend reviewing official government sources well in advance."
        },
        {
            question: "What is the age range of participants?",
            answer: "There is no strict age limit, but most participants are young adults who enjoy active, social, and cultural experiences. What matters most is mindset, not age."
        },
        {
            question: "What is included in a Wild Trip?",
            answer: "Each Wild Trip includes accommodation, planned activities, group coordination, and local experiences as described in the trip details. Flights and personal expenses are usually not included unless specified otherwise."
        },
        {
            question: "Will there be a coordinator during the trip?",
            answer: "Yes, every Wild Trip is led by an experienced coordinator who manages logistics, supports the group, and ensures the experience runs smoothly from start to finish."
        }
    ];

    return (
        <>
            <div className="px-4 sm:px-16 py-6">
                <h2 className="text-[#221E33] font-bold text-2xl mb-2">FAQs – Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#E5E7EB]">
                            <AccordionTrigger className="text-[#221E33] font-medium text-base hover:no-underline py-4">
                                {index + 1}. {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-[#332A2A] text-sm leading-relaxed pb-6 text-justify">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <img src={zigzagbottom} alt="zigzagbottom" className="py-4 w-full" />
        </>
    );
};

export default Faqs;
