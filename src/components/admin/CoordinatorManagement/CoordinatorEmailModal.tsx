// components/modals/CoordinatorEmailModal.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {toast} from "sonner"
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Mail, User, AtSign } from "lucide-react";
import { useSendMail } from "@/hooks/useSendMail";

interface CoordinatorEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordinator: {
    id: string;
    fullName: string;
    email: string;
  };
}

const CoordinatorEmailModal = ({ isOpen, onClose, coordinator }: CoordinatorEmailModalProps) => {
  const [emailText, setEmailText] = useState("");
  
  const { mutate: sendMail, isPending } = useSendMail();

  const handleSendEmail = () => {
    if (!emailText.trim()) {
      toast.error("Please write a message before sending");
      return;
    }

    sendMail({
      userEmail: coordinator.email,
      emailText: emailText.trim(),
    }, {
      onSuccess: () => {
        setEmailText("");
        onClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] border-[6px] border-[#E3E3E3] rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-[24px] flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Send Email
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Recipient Info - Display Only */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-[#FAFAFE] to-[#F5F5FF] rounded-lg border border-[#E0E1E2]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <User className="h-5 w-5 text-[#771FB5]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#221E33] text-lg">{coordinator.fullName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <AtSign className="h-4 w-4 text-[#666373]" />
                  <span className="text-[#666373]">{coordinator.email}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-[#666373] italic">
              This email will be sent directly to the recipient's inbox.
            </div>
          </div>

          {/* Email Message Textarea */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="emailText" className="text-[#666373] text-base font-medium">
                Message <span className="text-red-500">*</span>
              </Label>
              <span className={`text-sm ${emailText.length > 5000 ? 'text-red-500' : 'text-[#666373]'}`}>
                {emailText.length}/5000 characters
              </span>
            </div>
            
            <div className="relative">
              <Textarea
                id="emailText"
                placeholder="Write your email message here... You can include:
• Greetings and introduction
• Main message content
• Instructions or next steps
• Closing remarks"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                className="min-h-[200px] rounded-xl border-[#E0E1E2] resize-none text-base p-4 pr-12"
                disabled={isPending}
                maxLength={5000}
              />
              
              {/* Character count indicator */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${emailText.length > 4500 ? 'bg-red-500' : 'bg-green-500'}`} />
              </div>
            </div>

            {/* Formatting Tips */}
            <div className="text-xs text-[#666373] bg-[#FAFAFA] p-3 rounded-lg border border-dashed">
              <span className="font-medium">Tip:</span> You can format your email with paragraphs, bullet points, or numbered lists.
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto rounded-full h-12 px-8 font-medium border-[#E0E1E2] hover:bg-gray-50"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSendEmail}
            disabled={isPending || !emailText.trim()}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#221E33] to-[#565070] hover:from-[#333344] hover:to-[#666588] cursor-pointer h-12 px-8 font-bold shadow-md"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Email...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoordinatorEmailModal;