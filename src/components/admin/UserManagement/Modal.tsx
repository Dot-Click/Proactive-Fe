import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const userData = [
    {
        Name: 'Trip Completed',
        Number: '03'
    },
    {
        Name: 'Points Earned',
        Number: '850'
    },
    {
        Name: 'Destinations',
        Number: '02'
    },
    {
        Name: 'Member since',
        Number: '02-24'
    },
]
const Modal = () => {
    return (
        <div>
            <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[24px]">User Detail</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">

                    <div className="flex flex-col lg:flex-row items-center gap-2 bg-[#FAFAFE] px-6 py-7 rounded-[12px] mt-5">
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-center w-full">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-[18px] text-[#221E33] font-medium">Alex John</span>
                                <span className="text-[12px] text-[#666373]">alexjohn@gmail.com</span>
                                <span className="text-[12px] text-[#D79511] mt-1 font-semibold">GOLD MEMBER</span>
                            </div>
                        </div>
                            <div className="flex flex-col text-center">
                                <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">€897</span>
                                <span className="text-[#666373] text-[13px]">Total Spent</span>
                            </div>
                    </div>

                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 ">
                        {
                            userData.map((user, i) => (
                                <div key={i} className="flex flex-col items-center rounded-[12px] px-5 py-6 bg-[#FAFAFE] hover:shadow-sm transition-all duration-300">
                                    <span className="cursor-pointer font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">{user.Number}</span>
                                    <span className="cursor-pointer text-[#666373]">{user.Name}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border border-[#E0E1E2] rounded-[10px]">
                            <h1 className="text-[#221E33] font-medium text-[20px] m-5">Account Information</h1>
                            <div className="border-b border-[#EDEDED]" />
                            <div className="px-5 py-4 flex flex-col gap-6">
                                <div className="flex justify-between">
                                    <span className="text-[#666373]">Membership Expiry</span>
                                    <span className="text-[#666373]">Dec 31, 2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#666373]">Last Active</span>
                                    <span className="text-[#666373]">2 hours ago</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#666373]">Account Status</span>
                                    <span className="text-[#077B21]">Active</span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-[#E0E1E2] rounded-[10px]">
                            <h1 className="text-[#221E33] font-medium text-[20px] m-5">Travel Preferences</h1>
                            <div className="border-b border-[#EDEDED]" />
                            <div className="px-5 py-4 flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#666373]">Favorite Destinations</span>
                                    <div className="bg-[#F5F5F5] px-6 py-2 rounded-[8px]">
                                        <span className="text-[#727272]">Spain</span>
                                    </div>
                                    <div className="bg-[#F5F5F5] px-6 py-2 rounded-[8px]">
                                        <span className="text-[#727272]">Italy</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#666373]">Trip Category</span>
                                    <Badge className="px-3 py-2 rounded-[6px] bg-[#C4FFF0] text-[#156250] font-medium text-[14px]">Wild Weekend</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-2 justify-between items-center mt-8">
                    <Button className="w-full md:w-auto rounded-full bg-[#E0DDDD] hover:bg-[#c7c1c1] cursor-pointer text-[#606066] h-12 px-10 font-bold">Go Back</Button>
                    <DialogFooter className="w-full md:w-auto">
                        <div className="flex md:flex-row flex-col gap-4">
                            <Button className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">Send Email</Button>
                            <Button variant={'outline'} className="cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Block User</Button>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </div>
    )
}

export default Modal