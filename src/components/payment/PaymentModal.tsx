import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UsePayment } from "@/hooks/UsePaymenthook";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
import { useQueryClient } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

type PaymentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripId: string | null;
  notificationId?: string | null;
};

const CheckoutForm: React.FC<{ tripId: string; onDone: () => void }> = ({ tripId, onDone }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: tripResp } = UsegetTripbyid(tripId);
  const trip = tripResp?.trip || tripResp;
  const amount = Number(trip?.price || trip?.amount || 0);
  const paymentMutation = UsePayment();
  const qc = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Payment system not loaded");
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      toast.error(error.message || "Failed to create payment method");
      return;
    }

    paymentMutation.mutate({
      payment_method_id: paymentMethod.id,
      amount,
      trip_id: tripId,
    }, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["notifications"] });
        qc.invalidateQueries({ queryKey: ["payment"] });
        toast.success("Payment completed");
        onDone();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="text-sm text-gray-600">Pay for: <strong>{trip?.title || trip?.name || "Trip"}</strong></div>
        <div className="text-sm text-gray-600">Amount: <strong>{amount || 0} EUR</strong></div>
      </div>
      <div className="border rounded-md p-4">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!stripe || (paymentMutation as any).isPending} className="bg-[#0DAC87]">
          {(paymentMutation as any).isPending ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onOpenChange, tripId, notificationId: _notificationId }) => {
  const [internalOpen, setInternalOpen] = useState(open);
  React.useEffect(() => setInternalOpen(open), [open]);

  const handleClose = () => {
    setInternalOpen(false);
    onOpenChange(false);
  };

  const content = useMemo(() => (
    <div className="space-y-4">
      {tripId ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm tripId={tripId} onDone={handleClose} />
        </Elements>
      ) : (
        <div className="text-sm text-gray-600">Trip not selected.</div>
      )}
    </div>
  ), [tripId]);

  return (
    <Dialog open={internalOpen} onOpenChange={(val) => { setInternalOpen(val); onOpenChange(val); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
