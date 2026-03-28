import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  Mail,  ShieldCheck, CreditCard, Clock } from "lucide-react";

interface MembershipDetailModalProps {
    isOpen: boolean;
    onClose: (open: boolean) => void;
    member: any;
}

const MembershipDetailModal = ({ isOpen, onClose, member }: MembershipDetailModalProps) => {
    if (!member) return null;

    const user = member.user;
    const displayName = user
        ? user.firstName || user.nickName
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : user.email
        : "Unknown";
    const email = user?.email || "N/A";

    const startDate = member.createdAt
        ? new Date(member.createdAt).toLocaleString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        })
        : "N/A";

    const expiryDate = member.membershipExpiry
        ? new Date(member.membershipExpiry).toLocaleString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        })
        : "N/A";

    const daysLeft = member.membershipExpiry
        ? Math.ceil((new Date(member.membershipExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
                {/* Custom Header Graphic */}
                <div className="h-24 bg-gradient-to-r from-[#221E33] to-[#565070] relative">
                    <div className="absolute -bottom-10 left-8">
                        <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="px-8 pt-12 pb-8">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-2xl font-bold text-[#221E33]">
                            {displayName}
                        </DialogTitle>
                        <DialogDescription className="flex items-center gap-2 text-[#666373]">
                            <Mail size={14} />
                            {email}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-8 grid grid-cols-2 gap-6">
                        {/* Membership Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-[#221E33] uppercase tracking-wider flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#0DAC87]" />
                                Membership Plan
                            </h3>
                            <div className="bg-[#F6F6FF] rounded-xl p-4">
                                <p className="text-[#666373] text-xs mb-1">Status</p>
                                <span className="inline-block bg-[#0DAC87]/10 text-[#0DAC87] border border-[#0DAC87]/20 px-3 py-1 rounded-full text-xs font-bold capitalize">
                                    {member.status || "Active"}
                                </span>
                                <div className="mt-3">
                                    <p className="text-[#666373] text-xs">Type</p>
                                    <p className="font-bold text-[#221E33]">{member.membershipType || "Standard"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dates Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-[#221E33] uppercase tracking-wider flex items-center gap-2">
                                <Clock size={16} className="text-[#FD8B3A]" />
                                Validity
                            </h3>
                            <div className="bg-[#F6F6FF] rounded-xl p-4">
                                <div className="mb-3">
                                    <p className="text-[#666373] text-xs">Expires on</p>
                                    <p className="font-bold text-[#221E33]">{expiryDate}</p>
                                </div>
                                <div>
                                    <p className="text-[#666373] text-xs">Remaining</p>
                                    <p className={`font-bold ${daysLeft < 30 ? 'text-[#9C0000]' : 'text-[#0DAC87]'}`}>
                                        {daysLeft} Days
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-sm font-bold text-[#221E33] uppercase tracking-wider flex items-center gap-2">
                            <CreditCard size={16} className="text-[#221E33]" />
                            Payment Details
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#F6F6FF] rounded-xl p-3">
                                <p className="text-[#666373] text-[10px]">Method</p>
                                <p className="font-bold text-[#221E33] text-sm uppercase">{member.method || "Card"}</p>
                            </div>
                            <div className="bg-[#F6F6FF] rounded-xl p-3">
                                <p className="text-[#666373] text-[10px]">Last 4</p>
                                <p className="font-bold text-[#221E33] text-sm">**** {member.last4 || "0000"}</p>
                            </div>
                            <div className="bg-[#F6F6FF] rounded-xl p-3">
                                <p className="text-[#666373] text-[10px]">Member Since</p>
                                <p className="font-bold text-[#221E33] text-sm">{startDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-8 pb-8 sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            className="w-full bg-[#221E33] hover:bg-[#2d2742] text-white rounded-full h-12 font-bold transition-all shadow-md hover:shadow-lg"
                        >
                            Close Details
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MembershipDetailModal;
