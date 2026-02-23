import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle, AlertCircle, RefreshCcw, Home } from "lucide-react";
import logo from "@/assets/sidebaricon/favicon.png";

const PaymentFailurePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[30px] shadow-2xl overflow-hidden border border-[#ECECF1]">
                <div className="bg-[#FFF5F5] p-12 flex flex-col items-center relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

                    <img src={logo} alt="Proactive" className="h-14 mb-8 relative z-10 opacity-50 grayscale" />
                    <div className="bg-white p-4 rounded-full shadow-lg relative z-10 mb-6">
                        <XCircle size={48} className="text-[#FF5252]" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#221E33] text-center mb-2 relative z-10">
                        Payment Failed
                    </h1>
                    <p className="text-[#666373] text-center font-medium relative z-10">
                        Something went wrong during the transaction.
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="bg-[#F8F9FB] rounded-2xl p-6 border border-[#ECECF1] space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-[#ECECF1]">
                            <span className="text-sm font-semibold text-[#666373] uppercase tracking-wider">Issue</span>
                            <span className="bg-[#FF5252] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Declined</span>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 p-2 bg-red-50 rounded-lg">
                                    <AlertCircle size={20} className="text-[#FF5252]" />
                                </div>
                                <div>
                                    <p className="text-[#221E33] font-bold text-base">Payment Not Processed</p>
                                    <p className="text-[#666373] text-sm mt-1">Your card was not charged. This might be due to incorrect card details or insufficient funds.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Button
                            onClick={() => window.history.back()}
                            className="w-full bg-[#221E33] hover:bg-[#2c2741] text-white rounded-full py-7 text-lg font-bold shadow-lg shadow-[#221E33]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <RefreshCcw size={20} />
                            Try Again
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/user-dashboard")}
                            className="w-full text-[#666373] font-bold hover:bg-gray-50 rounded-full flex items-center justify-center gap-2"
                        >
                            <Home size={18} />
                            Go to Dashboard
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-[#9ea4b0] text-[13px] font-medium leading-[1.6]">
                            If you continue to experience issues, please verify your payment details or use a different card.
                        </p>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-[#666373] text-sm font-medium">
                Need help? <span className="text-[#0DAC87] cursor-pointer hover:underline font-bold">Talk to us</span>
            </p>
        </div>
    );
};

export default PaymentFailurePage;
