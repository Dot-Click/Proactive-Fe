import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UseMembership } from '@/hooks/UseMembershiphook';
import logo from "../../../assets/sidebaricon/favicon.png"
import { Alert, AlertDescription } from "@/components/ui/alert";
import PaymentSuccess from "../../../assets/SuccessPayment.png"
import { toast } from 'sonner';
// import { UsegetCurrentUser } from '@/hooks/getCurrentUserhook';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentSchema = z.object({
    CardHolder: z.string().min(2, 'Card Holder Name is required'),
});

type PaymentSchemaType = z.infer<typeof PaymentSchema>;

const CheckoutForm = ({ onSuccess }: { onSuccess: (paymentMethodId: string) => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const form = useForm<PaymentSchemaType>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: { CardHolder: '' },
    });
    const [cardError, setCardError] = useState('');
    const handleSubmit = async (data: PaymentSchemaType) => {
        if (!stripe || !elements) return;

        const cardNumber = elements.getElement(CardNumberElement);
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);

        if (!cardNumber || !cardExpiry || !cardCvc) return;

        setCardError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber,
            billing_details: { name: data.CardHolder },
        });

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
                        disabled={!stripe || !elements}
                        className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 cursor-pointer w-full rounded-full py-6 font-semibold transition-all"
                    >
                        Pay €50 Now
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const PaymentModal = () => {
    const [showhide, setShowHide] = useState(true);
    const { mutateAsync } = UseMembership();
    const handlePaymentSuccess = async (paymentMethodId: string) => {
        try {
            await mutateAsync({
                payment_method_id: paymentMethodId,
                amount: 50,
                currency: 'eur',
                membership_type: 'annual',
            });
            setShowHide(false);
            toast.success("Membership Created Successfully")
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] border-10 bg-[#FAFAFA] border-[#ECFBF6] rounded-[20px] overflow-y-auto p-0">
            {stripePromise && (
                <div className="h-full flex flex-col">
                    {showhide ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex justify-center mt-10 font-bold text-[24px] bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                    <img src={logo} alt="logo" className="h-14" />
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    Complete your membership payment
                                </DialogDescription>
                                <div className="bg-white px-6 py-6 rounded-[20px] mt-10 mx-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#242E2F] font-medium">Membership Fee</span>
                                        <div className="flex flex-col">
                                            <span className="text-[#000000] font-bold text-4xl">€50.00</span>
                                            <span className="text-[#000000] font-medium">/ 365 days</span>
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="mt-10 px-6 flex-1 flex flex-col">
                                <span className="text-[#000000] font-bold text-lg mb-6 block">Payment Info</span>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm onSuccess={handlePaymentSuccess} />
                                </Elements>
                            </div>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex justify-center mt-10 font-bold text-[24px] bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
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
                                <DialogClose asChild onClick={() => setShowHide(true)}>
                                    <Button className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 w-full rounded-full py-6 cursor-pointer font-semibold transition-all delay-150 duration-200 ease-in">
                                        Go to Dashboard
                                    </Button>
                                </DialogClose>
                            </div>
                        </>
                    )}
                </div>
            )}
        </DialogContent>
    );
};

export default PaymentModal;
