import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, ArrowRight } from "lucide-react";
import logo from "@/assets/sidebaricon/favicon.png";
import successBg from "@/assets/SuccessPayment.png";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { paymentId, tripName } = location.state || {};

    const displayId = paymentId ? `TR-${paymentId.toString().slice(-6).toUpperCase()}` : "TR-CONFIRMED";
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[30px] shadow-2xl overflow-hidden border border-[#ECECF1]">
                <div className="bg-[#E6F7F3] p-12 flex flex-col items-center relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0DAC87]/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0DAC87]/5 rounded-full blur-3xl"></div>

                    <img src={logo} alt="Proactive" className="h-14 mb-8 relative z-10" />
                    <div className="bg-white p-4 rounded-full shadow-lg relative z-10 mb-6">
                        <CheckCircle2 size={48} className="text-[#0DAC87]" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#221E33] text-center mb-2 relative z-10">
                        Payment Successful!
                    </h1>
                    <p className="text-[#666373] text-center font-medium relative z-10">
                        Pack your bags, the adventure awaits!
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="bg-[#F8F9FB] rounded-2xl p-6 border border-[#ECECF1] space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-[#ECECF1]">
                            <span className="text-sm font-semibold text-[#666373] uppercase tracking-wider">Booking ID</span>
                            <span className="bg-[#0DAC87] text-white text-xs font-bold px-3 py-1 rounded-full">{displayId}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-[#0DAC87]" />
                                <span className="text-[#221E33] font-bold">{tripName || "Adventure"} Reserved</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-[#0DAC87]" />
                                <span className="text-[#666373] text-sm">Confirmed on {today}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#E6F7F3]/50 p-4 rounded-2xl border border-[#0DAC87]/20">
                        <img src={successBg} alt="Success" className="h-10 w-10 object-contain" />
                        <p className="text-[#156250] text-sm font-semibold leading-relaxed">
                            A confirmation email and receipt have been sent to your registered email address.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Button
                            onClick={() => navigate("/user-dashboard")}
                            className="w-full bg-[#0DAC87] hover:bg-[#0b8a6c] text-white rounded-full py-7 text-lg font-bold shadow-lg shadow-[#0DAC87]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Back to Dashboard
                            <ArrowRight size={20} />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => window.print()}
                            className="w-full text-[#666373] font-semibold hover:bg-gray-100 rounded-full"
                        >
                            Print Receipt
                        </Button>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-[#666373] text-sm font-medium">
                Need help? <span className="text-[#0DAC87] cursor-pointer hover:underline">Contact Support</span>
            </p>
        </div>
    );
};

export default PaymentSuccessPage;
