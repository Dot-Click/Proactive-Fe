import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import proactivefavicon from "../../../assets/sidebaricon/favicon.png"
import trip from "../../../assets/trip1.png"
import { FaLocationDot } from "react-icons/fa6"
import calender from "../../../assets/calenderblack.png"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const PaymentSchema = z.object({
    CardNumber: z.string().min(14, 'Card Number must be at least 14 digits').max(19, 'Card Number cannot exceed 19 digits'),
    CardHolder: z.string().min(2, 'Card Holder Name is required'),
    Date: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid expiry date format (MM/YY)'),
    CVV: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVV'),
});

const PayNow = () => {
    type PaymentSchemaType = z.infer<typeof PaymentSchema>
    const form = useForm<PaymentSchemaType>({
        resolver: zodResolver(PaymentSchema) as any,
        defaultValues: {
            CardNumber: "",
            CardHolder: "",
            Date: "",
            CVV: "",
        },
    });

    const onSubmit = (val: z.infer<typeof PaymentSchema>) => {
        console.log(val);
        form.reset()
    };

    return (
        <DialogContent className="sm:max-w-[600px] bg-[#FAFAFA] overflow-y-auto max-h-[90vh]">
            <DialogHeader>
                <DialogTitle className="flex justify-center py-4">
                    <img src={proactivefavicon} alt="proactivefavicon" className="h-15" />
                </DialogTitle>
                <div className="bg-[#FFFFFF] rounded-[15px] px-4 py-4 mt-12 flex lg:flex-row flex-col gap-3 items-center">
                    <img src={trip} alt="trip" className="h-20 w-22 rounded-[10px]" />
                    <div className="flex flex-col gap-2">
                        <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl">Wild Weekend Barcelona</h4>
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-1">
                                <FaLocationDot size={14} color="#332A2A" />
                                <span className="text-[#332A2A] font-medium text-[10px]">Barcelona, Spain</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={calender} alt="calender" className=" text-[#332A2A]" color="#332A2A" />
                                <span className="text-[#332A2A] font-medium text-[10px]"> 05 to 08 August</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <h4 className="bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl">€950.00</h4>
                    </div>
                </div>
                <div className="px-2 py-5">
                    <div>
                        <span className="text-[#000000] font-bold text-lg">Payment Info</span>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mt-6 grid grid-cols-1 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="CardNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-medium">
                                                    Card Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="xxxxx xxxxx xxxx"
                                                        {...field}
                                                        className="bg-[#FFFFFF] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="CardHolder"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-medium">
                                                    Card Holder Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="bg-[#FFFFFF] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <FormField
                                        control={form.control}
                                        name="Date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Date
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="MM/YYYY"
                                                        {...field}
                                                        className="bg-[#FFFFFF] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="CVV"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-medium">
                                                    CVV
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0000"
                                                        {...field}
                                                        className="bg-[#FFFFFF] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mt-24 mb-6 px-12">
                                    <Button className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 w-full rounded-full py-6 cursor-pointer font-semibold transition-all delay-150 duration-200 ease-in">
                                        Pay Now
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                </div>
            </DialogHeader>
        </DialogContent>
    )
}

export default PayNow