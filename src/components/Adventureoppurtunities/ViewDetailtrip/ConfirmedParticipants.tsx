import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock } from "lucide-react";

interface Participant {
  userId: string;
  userFirstName: string;
  userLastName: string;
  avatar: string | null;
  paymentStatus: string | null;
}

interface ConfirmedParticipantsProps {
  trip: any;
}

const ConfirmedParticipants = ({ trip }: ConfirmedParticipantsProps) => {
  const participants = trip?.participants || [];

  if (participants.length === 0) {
    return null; // Don't show anything if no confirmed participants
  }

  const categoryName = (trip?.categoryName || trip?.category || trip?.type || "").toString().toLowerCase();
  const isWildTrips = categoryName.includes("wild trips") || categoryName.includes("wild trip");

  // Filter for unique participants if any duplicates exist in backend
  const uniqueParticipants = participants.filter(
    (v: Participant, i: number, a: Participant[]) => a.findIndex(t => (t.userId === v.userId)) === i
  );

  return (
    <div className="px-4 sm:px-16 py-4">
      <h4 className="text-[#000000] font-bold text-lg mb-6">Confirmed Participants</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {uniqueParticipants.map((participant: Participant, index: number) => {
          
          const isPaid =
              ["paid", "success", "succeeded", "completed", "confirmed"].includes((participant.paymentStatus || "").toLowerCase());

          return (
            <div key={index} className="flex items-center gap-4 bg-[#F9F9F9] border border-[#E0D9D9] p-4 rounded-xl shadow-sm">
              <Avatar className="h-12 w-12 border-2 border-[#108700]/20">
                <AvatarImage src={participant.avatar || "https://github.com/shadcn.png"} alt={participant.userFirstName} />
                <AvatarFallback className="bg-white text-[#108700] font-bold">
                  {participant.userFirstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col flex-grow">
                <span className="font-semibold text-[#19232B] text-sm md:text-md">
                  {participant.userFirstName} {participant.userLastName ? participant.userLastName.charAt(0) + "." : ""}
                </span>
                <span className="text-xs text-[#666373]">
                  Confirmed Member
                </span>
              </div>

              {isWildTrips && (
                <div 
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-1 rounded ${isPaid ? 'text-[#108700] bg-[#EAF7E8]' : 'text-[#666373] bg-[#F1F1F1]'}`} 
                  title={isPaid ? "Payment Done" : "Payment Pending"}
                >
                  {isPaid ? <CheckCircle size={16} /> : <Clock size={16} />}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{isPaid ? 'Paid' : 'Pending'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConfirmedParticipants;
