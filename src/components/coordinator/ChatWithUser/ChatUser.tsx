import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import send from "@/assets/sidebaricon/send.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ChatUser = () => {
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-3">

      {/* Messagning Section */}
      <div className="bg-white lg:mt-6 rounded-[25px]">

        <div className="bg-[#FAFAFA] rounded-tl-[25px] rounded-tr-[25px] px-5 py-4">
          <div className="flex justify-between items-center">
            <span className="text-[#221E33] font-bold text-[18px]">All Chats</span>
            <Search strokeWidth={1} />
          </div>
        </div>

        <div className="py-3 px-3 flex flex-col gap-3 overflow-y-auto h-[80vh]">
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#1DBA4C]/10 rounded-full border border-[#1DBA4C] text-[#1DBA4C] px-3 py-1">Open</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#1DBA4C]/10 rounded-full border border-[#1DBA4C] text-[#1DBA4C] px-3 py-1">Open</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#1DBA4C]/10 rounded-full border border-[#1DBA4C] text-[#1DBA4C] px-3 py-1">Open</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#1DBA4C]/10 rounded-full border border-[#1DBA4C] text-[#1DBA4C] px-3 py-1">Open</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#1DBA4C]/10 rounded-full border border-[#1DBA4C] text-[#1DBA4C] px-3 py-1">Open</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#BA1D1D]/10 rounded-full border border-[#BA1D1D] text-[#BA1D1D] px-3 py-1">Close</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#BA1D1D]/10 rounded-full border border-[#BA1D1D] text-[#BA1D1D] px-3 py-1">Close</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#BA1D1D]/10 rounded-full border border-[#BA1D1D] text-[#BA1D1D] px-3 py-1">Close</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#BA1D1D]/10 rounded-full border border-[#BA1D1D] text-[#BA1D1D] px-3 py-1">Close</Badge>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#FAFAFE] px-2 py-2 rounded-[8px]">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-bold text-[12px]">Michael C.</span>
                <span className="text-[#666373] text-[10px] text-ellipsis text-nowrap">Hi Maria! I just applied for the Barcelo.....</span>
              </div>
            </div>
            <Badge className="bg-[#BA1D1D]/10 rounded-full border border-[#BA1D1D] text-[#BA1D1D] px-3 py-1">Close</Badge>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="bg-white lg:mt-6 flex flex-col md:h-[100vh] h-[140vh] rounded-[25px]">

        <div className="bg-[#FAFAFA] rounded-tl-[25px] rounded-tr-[25px] px-8 py-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-4 border border-[#D9D9D9]">
          <div className="flex gap-3 items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[#221E33] font-medium">Lisa W.</span>
              <span className="text-[#666373] text-[14px]">User</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex flex-col gap-4 overflow-y-scroll">

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

        </div>

        <div className="flex md:flex-row flex-col gap-4 justify-between items-center mt-8 px-5 py-4 inset-shadow-sm rounded-bl-[25px] rounded-br-[25px]">
          <Textarea
            placeholder="Reply as Admin"
            className="bg-[#FAFAFE] border border-[#EFEFEF] h-24 placeholder:text-[#221E33] px-5 py-4"
          />

          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <Button className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">
                {/* <Send fill="#FFFFFF"/> */}
                <img src={send} alt="send" />
                Send
              </Button>
              <Button variant={'outline'} className="cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Close Chat</Button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ChatUser