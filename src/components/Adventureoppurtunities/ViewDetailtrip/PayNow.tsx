import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import proactivefavicon from "../../../assets/sidebaricon/favicon.png"
import { FaLocationDot } from "react-icons/fa6"
import calender from "../../../assets/calenderblack.png"
import { useState } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UsePayment } from "@/hooks/UsePaymenthook"
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"

import { UsegetTripbyid } from "@/hooks/gettripbyidhook"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentSchema = z.object({
    CardHolder: z.string().min(2, 'Card Holder Name is required'),
});

type PaymentSchemaType = z.infer<typeof PaymentSchema>;

const CheckoutForm = ({ onSuccess, amount }: { onSuccess: (paymentMethodId: string) => void, amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const form = useForm<PaymentSchemaType>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: { CardHolder: '' },
    });
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (data: PaymentSchemaType) => {
        if (!stripe || !elements) return;

        const cardNumber = elements.getElement(CardNumberElement);
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);

        if (!cardNumber || !cardExpiry || !cardCvc) return;

        setCardError('');
        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber,
            billing_details: { 
                name: data.CardHolder 
            },
        });

        setProcessing(false);

        if (error) {
            setCardError(error.message || 'Payment failed');
            return;
        }

        if (paymentMethod?.id) {
            onSuccess(paymentMethod.id);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="CardHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#242E2F] font-medium">Card Holder Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="John Doe"
                                    className="bg-[#FAFAFE] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <FormLabel className="text-[#242E2F] font-medium block mb-2">Card Number</FormLabel>
                        <FormControl>
                            <CardNumberElement
                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full rounded-md h-14"
                                options={{
                                    placeholder: 'xxxx xxxx xxxx xxxx',
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#242E2F',
                                            '::placeholder': {
                                                color: '#BEBEBE',
                                            },
                                        },
                                    },
                                }}
                            />
                        </FormControl>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <FormLabel className="text-[#242E2F] font-medium block mb-2">Expiry Date</FormLabel>
                            <FormControl>
                                <CardExpiryElement
                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full rounded-md h-14"
                                    options={{
                                        placeholder: 'MM/YY',
                                    }}
                                />
                            </FormControl>
                        </div>

                        <div>
                            <FormLabel className="text-[#242E2F] font-medium block mb-2">CVV</FormLabel>
                            <FormControl>
                                <CardCvcElement
                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full rounded-md h-14"
                                    options={{
                                        placeholder: '123',
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>

                {cardError && (
                    <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-200">
                        {cardError}
                    </div>
                )}

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={!stripe || !elements || processing}
                        className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 cursor-pointer w-full rounded-full py-6 font-semibold transition-all"
                    >
                        {processing ? 'Processing...' : `Pay €${amount} Now`}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

interface PayNowProps {
    tripId: string | null;
}

const PayNow = ({ tripId }: PayNowProps) => {
    const { data: tripResponse, isLoading } = UsegetTripbyid(tripId || "");
    const { mutateAsync } = UsePayment();
    const trip = tripResponse?.trip?.[0] || tripResponse?.trip || tripResponse;

    const handlePaymentSuccess = async (paymentMethodId: string) => {
        try {
            await mutateAsync({
                payment_method_id: paymentMethodId,
                amount: trip?.price || 950,
                trip_id: tripId,
                currency: 'eur',
            });
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <DialogContent className="sm:max-w-[600px] bg-[#FAFAFA] overflow-y-auto max-h-[90vh]">
            <DialogHeader>
                <DialogTitle className="flex justify-center py-4">
                    <img src={proactivefavicon} alt="proactivefavicon" className="h-15" />
                </DialogTitle>
                
                <div className="bg-[#FFFFFF] rounded-[15px] px-4 py-4 mt-12 flex lg:flex-row flex-col gap-3 items-center">
                    <img src={trip?.coverImage || trip} alt="trip" className="h-20 w-22 rounded-[10px]" />
                    <div className="flex flex-col gap-2">
                        <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl">
                            {trip?.name || "Wild Weekend Barcelona"}
                        </h4>
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-1">
                                <FaLocationDot size={14} color="#332A2A" />
                                <span className="text-[#332A2A] font-medium text-[10px]">{trip?.location || "Barcelona, Spain"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={calender} alt="calender" className="text-[#332A2A]" />
                                <span className="text-[#332A2A] font-medium text-[10px]">
                                    {trip?.startDate ? new Date(trip.startDate).toLocaleDateString() : "05"} to {trip?.endDate ? new Date(trip.endDate).toLocaleDateString() : "08 August"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <h4 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-xl">
                            €{trip?.perHeadPrice || "950.00"}
                        </h4>
                    </div>
                </div>

                <div className="px-2 py-5">
                    <div>
                        <span className="text-[#000000] font-bold text-lg mb-6 block">Payment Info</span>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm onSuccess={handlePaymentSuccess} amount={trip?.price || 950} />
                        </Elements>
                    </div>
                </div>
            </DialogHeader>
        </DialogContent>
    );
};


export default PayNow;
