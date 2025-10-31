import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import logo from "../../../assets/sidebaricon/favicon.png"
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PaymentSuccess from "../../../assets/SuccessPayment.png"

const PaymentSchema = z.object({
    CardNumber: z.string().min(14, 'Card Number must be at least 14 digits').max(19, 'Card Number cannot exceed 19 digits'),
    CardHolder: z.string().min(2, 'Card Holder Name is required'),
    Date: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid expiry date format (MM/YY)'),
    CVV: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVV'),
});


const PaymentModal = () => {
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
    const [showhide, setShowHide] = useState(true)

    const onSubmit = (val: z.infer<typeof PaymentSchema>) => {
    console.log(val);
    setShowHide(false)
    form.reset()
};

    return (
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] border-[10px] bg-[#FAFAFA] border-[#ECFBF6] rounded-[20px] overflow-y-auto">
            {
                showhide ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex justify-center mt-10 font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                <img src={logo} alt="logo" className="h-14" />
                            </DialogTitle>
                            <div className="bg-white px-6 py-6 rounded-[20px] mt-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#242E2F] font-medium">Membership Fee</span>
                                    <div className="flex flex-col">
                                        <span className="text-[#000000] font-bold text-4xl">€50.00</span>
                                        <span className="text-[#000000] font-medium">/ 365 days</span>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                        <div className="mt-10">
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
                                                            className="bg-[#FAFAFE] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
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
                                                            className="bg-[#FAFAFE] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
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
                                                            className="bg-[#FAFAFE] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
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
                                                            className="bg-[#FAFAFE] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
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
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex justify-center mt-10 font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                <img src={logo} alt="logo" className="h-14" />
                            </DialogTitle>
                            <div className="text-center mt-8">
                                <span className="text-[#1F1B2C] font-bold text-2xl">Payment Successful!</span>
                            </div>
                        </DialogHeader>
                        <div className="mt-10 bg-[#FFFFFF] px-8 py-8 rounded-[20px]">
                            <div className="flex flex-col gap-8">
                                <div className="flex justify-between">
                                    <span className="text-[#221E33]">Membership ID</span>
                                    <span className="text-[#221E33] font-semibold">PA-123454</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#221E33]">Validity</span>
                                    <span className="text-[#221E33] font-semibold">Sept 30, 2025 - Sept 30, 2026</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#221E33]">Remaining Days</span>
                                    <span className="text-[#221E33] font-semibold">365 Days</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#221E33]">Discount  Available</span>
                                    <span className="text-[#221E33] font-semibold">Yes</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Alert variant="destructive" className="bg-[#F1FEF7] border border-[#00A63E] py-4 rounded-[20px]">
                                <AlertDescription className="flex items-center gap-4 px-4">
                                    <img src={PaymentSuccess} alt="PaymentSuccess" className="h-8" />
                                    <p className="text-[#00A63E] font-semibold text-nowrap text-[16px]">You’re saving on every wild weekend and Wild Trip booking!</p>
                                </AlertDescription>
                            </Alert>
                        </div>
                        <div className="mt-8 mb-6 px-12">
                            <DialogClose asChild onClick={()=> setShowHide(true)}>
                            <Button className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 w-full rounded-full py-6 cursor-pointer font-semibold transition-all delay-150 duration-200 ease-in">
                                Go to Dashboard
                            </Button>
                            </DialogClose>
                        </div>
                    </>
                )
            }
        </DialogContent>
    )
}

export default PaymentModal