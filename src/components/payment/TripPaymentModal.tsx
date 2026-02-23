import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UsePayment } from '@/hooks/UsePaymenthook';
import { UsegetTripbyid } from '@/hooks/gettripbyidhook';
import logo from "@/assets/sidebaricon/favicon.png";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const PaymentSchema = z.object({
    CardHolder: z.string().min(2, 'Card Holder Name is required'),
});

type PaymentSchemaType = z.infer<typeof PaymentSchema>;

const CheckoutForm = ({
    trip,
    onSuccess
}: {
    trip: any;
    onSuccess: (paymentMethodId: string) => void
}) => {
    const stripe = useStripe();
    const elements = useElements();

    const form = useForm<PaymentSchemaType>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: { CardHolder: '' },
    });

    const [cardError, setCardError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (data: PaymentSchemaType) => {
        if (!stripe || !elements) return;

        const cardNumber = elements.getElement(CardNumberElement);
        if (!cardNumber) return;

        setIsProcessing(true);
        setCardError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber,
            billing_details: { name: data.CardHolder },
        });

        if (error) {
            setCardError(error.message || 'Payment failed');
            setIsProcessing(false);
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
                                    placeholder="Full Name as on card"
                                    className="bg-[#FAFAFE] placeholder:text-[#BEBEBE] border border-[#EFEFEF] px-4 py-5 w-full h-14 rounded-xl"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div>
                        <FormLabel className="text-[#242E2F] font-medium block mb-2">Card Number</FormLabel>
                        <div className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-4 w-full rounded-xl h-14">
                            <CardNumberElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#242E2F',
                                            '::placeholder': { color: '#BEBEBE' },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <FormLabel className="text-[#242E2F] font-medium block mb-2">Expiry Date</FormLabel>
                            <div className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-4 w-full rounded-xl h-14">
                                <CardExpiryElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#242E2F',
                                                '::placeholder': { color: '#BEBEBE' },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <FormLabel className="text-[#242E2F] font-medium block mb-2">CVV</FormLabel>
                            <div className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-4 w-full rounded-xl h-14">
                                <CardCvcElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#242E2F',
                                                '::placeholder': { color: '#BEBEBE' },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {cardError && (
                    <div className="text-red-500 text-sm p-3 bg-red-50 rounded-xl border border-red-200">
                        {cardError}
                    </div>
                )}

                <div className="pt-4 pb-2">
                    <Button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="bg-[#0DAC87] hover:bg-[#11a180] w-full rounded-full py-7 text-lg font-bold shadow-lg shadow-[#0DAC87]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            `Pay €${trip?.perHeadPrice || trip?.price || 0} Now`
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export const TripPaymentModalContent = ({ tripId }: { tripId: string }) => {
    const { data: tripResp, isLoading } = UsegetTripbyid(tripId);
    const trip = tripResp?.trip || tripResp;
    const { mutateAsync } = UsePayment();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handlePaymentSuccess = async (paymentMethodId: string) => {
        try {
            await mutateAsync({
                payment_method_id: paymentMethodId,
                amount: Number(trip?.perHeadPrice || trip?.price || 0),
                currency: 'eur',
                trip_id: tripId,
            });

            // Invalidate relevant queries
            await queryClient.invalidateQueries({ queryKey: ["payment"] });
            await queryClient.invalidateQueries({ queryKey: ["notifications"] });
            await queryClient.invalidateQueries({ queryKey: ["User-Dashboard"] });
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

            toast.success("Payment successful!");
            navigate("/user-dashboard/payment/success", {
                state: {
                    paymentId: tripId, // Or use response?.data?.paymentId if available
                    amount: trip?.perHeadPrice || trip?.price,
                    tripName: trip?.title || trip?.name
                }
            });
        } catch (error: any) {
            console.error('Payment failed:', error);
            // navigate("/user-dashboard/payment/failure");
            toast.error(error?.message || "Payment failed. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#0DAC87] w-10 h-10" />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-6">
            <DialogHeader className="mb-8">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="logo" className="h-12" />
                </div>
                <DialogTitle className="text-2xl font-extrabold text-[#221E33] text-center mb-1">
                    Trip Payment
                </DialogTitle>
                <DialogDescription className="text-center text-[#666373]">
                    Securely complete your adventure booking
                </DialogDescription>

                <div className="bg-[#F8F9FB] p-6 rounded-2xl mt-8 border border-[#ECECF1] flex justify-between items-center">
                    <div>
                        <p className="text-xs font-bold text-[#666373] uppercase tracking-wider mb-1">TRIP</p>
                        <p className="text-[#221E33] font-bold text-lg truncate max-w-[200px]">
                            {trip?.title || trip?.name || "The Adventure"}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-[#666373] uppercase tracking-wider mb-1">TOTAL AMOUNT</p>
                        <p className="text-[#221E33] font-black text-3xl">
                            €{trip?.perHeadPrice || trip?.price || 0}
                        </p>
                    </div>
                </div>
            </DialogHeader>

            {stripePromise && (
                <div className="flex-1">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm trip={trip} onSuccess={handlePaymentSuccess} />
                    </Elements>
                </div>
            )}
        </div>
    );
};

const TripPaymentModal = ({ tripId }: { tripId: string }) => {
    return (
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white rounded-[30px] overflow-y-auto p-0 border-none shadow-2xl">
            <TripPaymentModalContent tripId={tripId} />
        </DialogContent>
    );
};

export default TripPaymentModal;
