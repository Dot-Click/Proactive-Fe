import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import send from "@/assets/sidebaricon/send.png"

const MessageModal = () => {
    return (
        <div>
            <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                        Conversation{" "}
                        <span className="font-medium text-[16px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                            (Wild Weekend Barcelona)
                        </span>
                    </DialogTitle>
                </DialogHeader>


                <div className="border border-[#E0E1E2] rounded-[10px] overflow-hidden">

                    <div className="bg-[#FAFAFA] px-5 py-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-4">

                        <div className="flex gap-3 items-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-[#221E33] font-medium">Lisa W.</span>
                                <span className="text-[#666373] text-[14px]">User</span>
                            </div>
                        </div>
                        <ArrowRight size={18} strokeWidth={3} className="md:flex hidden" />
                        <div className="flex gap-3 items-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-[#221E33] font-medium">Pavel Novak</span>
                                <span className="text-[#666373] text-[14px]">Coordinator</span>
                            </div>
                        </div>

                    </div>


                    <div className="border-b border-[#EDEDED]" />


                    <div className="px-5 py-4 flex flex-col gap-4">

                        {/* Incoming message (User) */}
                        <div className="flex items-start gap-3">
                            <div className="flex flex-col max-w-[70%]">
                                <div className="bg-[#FAFAFE] border border-[#EFEFEF] rounded-2xl rounded-bl-none px-4 py-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[16px] text-[#000000] font-bold">Lisa W.</span>
                                        <span className="text-[10px] text-[#666373] mt-1">10:42 AM</span>
                                    </div>
                                    <p className="text-[#221E33] text-[14px] leading-relaxed">
                                        Hi Pavel, just checking if the Wild Weekend Barcelona trip details are finalized?
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Outgoing message (Admin/Coordinator) */}
                        <div className="flex items-start gap-3 justify-end">
                            <div className="flex flex-col max-w-[70%] items-end">
                                <div className="bg-[#0DAC87] text-white rounded-2xl rounded-br-none px-4 py-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[16px] text-[#FFFFFF] font-bold">Lisa W.</span>
                                        <span className="text-[10px] text-[#DBD9E4] mt-1">10:42 AM</span>
                                    </div>
                                    <p className="text-[14px] leading-relaxed">
                                        Hey Lisa, yes! The trip itinerary and approval flow have been confirmed.
                                        You’ll receive the final version by tomorrow.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Another user message */}
                        <div className="flex items-start gap-3">
                            <div className="flex flex-col max-w-[70%]">
                                <div className="bg-[#FAFAFE] border border-[#EFEFEF] rounded-2xl rounded-bl-none px-4 py-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[16px] text-[#000000] font-bold">Lisa W.</span>
                                        <span className="text-[10px] text-[#666373] mt-1">10:42 AM</span>
                                    </div>
                                    <p className="text-[#221E33] text-[14px] leading-relaxed">
                                        Awesome! Thanks a lot for the quick update 😊
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col gap-4 justify-between items-center mt-8 border border-t px-5 py-4">
                        <Textarea
                            placeholder="Reply as Admin"
                            className="bg-[#FAFAFE] border border-[#EFEFEF] h-26 placeholder:text-[#221E33] px-5 py-4"
                        />
                        <DialogFooter className="w-full md:w-auto">
                            <div className="flex flex-col gap-4">
                                <Button className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">
                                    {/* <Send fill="#FFFFFF"/> */}
                                    <img src={send} alt="send" />
                                    Send
                                </Button>
                                <Button variant={'outline'} className="cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Close Chat</Button>
                            </div>
                        </DialogFooter>
                    </div>

                </div>

            </DialogContent>
        </div>
    )
}

export default MessageModal