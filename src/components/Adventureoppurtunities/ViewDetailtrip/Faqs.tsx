import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import zigzagbottom from "../../../assets/zigzagbottom.png"
import { UsegetallFaqs } from "@/hooks/getallFaqs";
import { LoaderIcon } from "lucide-react";

const Faqs = () => {
    const { data, isLoading, isError } = UsegetallFaqs();

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-20">
                <LoaderIcon className="animate-spin text-[#221E33]" size={40} />
            </div>
        );
    }

    if (isError) {
        return <div className="px-16 py-10 text-red-500">Error loading FAQs. Please try again later.</div>;
    }

    const faqs = data?.faqs || [];

    return (
        <>
            <div className="px-4 sm:px-16 py-6">
                <h2 className="text-[#221E33] font-bold text-2xl mb-2">FAQs – Frequently Asked Questions</h2>
                {faqs.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq: any, index: number) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#E5E7EB]">
                                <AccordionTrigger className="text-[#221E33] font-medium text-base hover:no-underline py-4">
                                    {index + 1}. {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#332A2A] text-sm leading-relaxed pb-6 text-justify">
                                    {faq.answers}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-[#666373] italic">No frequently asked questions available at the moment.</p>
                )}
            </div>
            <img src={zigzagbottom} alt="zigzagbottom" className="py-4 w-full" />
        </>
    );
};

export default Faqs;
