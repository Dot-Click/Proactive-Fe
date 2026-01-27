import Coordinatordetailmodal from "@/components/admin/CoordinatorManagement/Coordinatordetailmodal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UsegetCoordinator } from "@/hooks/getCoordinatorhook";
import { useState } from "react";


// const CoordinatorData = [
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },

//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
//     {
//         img: "https://github.com/shadcn.png",
//         Name: "Esther Howard",
//         Description: "Passionate explorer & cultural enthusiast",
//         Badge: "Cultural Immersion",
//         Triplead: "24 trips led"
//     },
// ]
const MeetCoordinator = () => {
    const { data: coordinatorData } = UsegetCoordinator();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return (
        <div className="bg-[#FAFAFA] py-20">
            <div className="flex flex-col gap-4 justify-center items-center ">
                <h1 className="text-center bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-4xl">Meet Our Coordinators</h1>
                <p className="text-center text-[#221E33]">Get to know the amazing people who make every Proactive Future adventure unforgettable</p>
            </div>
            <div className="grid lg:grid-cols-4 items-center gap-4 px-12 py-12">
                {/* {
                    CoordinatorData.map((item, index) => (
                        <div key={index} className="bg-white shadow-sm py-4 px-2 rounded-[25px] ">
                            <div key={index} className="flex flex-col items-center gap-4 py-2">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-2xl">{item.Name}</h1>
                                <p className="text-[#221E33] w-60 text-center">{item.Description}</p>
                                <div className="bg-[#C4FFF0] px-3 py-2 rounded-[10px]">
                                    <p className="text-[#156250]">{item.Badge}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    ⭐
                                    <p className="text-[#221E33]">{item.Triplead}</p>
                                </div>
                            </div>
                        </div>
                    ))
                } */}
                {
                    coordinatorData?.coordinators?.map((item: any, index: any) => (
                        <div key={index} className="bg-white shadow-sm py-4 px-2 rounded-[25px] ">
                            <div key={index} className="flex flex-col items-center gap-4 py-2">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={item.profilePicture} alt={item.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-2xl">{item.fullName}</h1>
                                <p className="text-[#221E33] w-60 text-center">{item.bio}</p>
                                <div className="bg-[#C4FFF0] px-3 py-2 rounded-[10px]">
                                    <p className="text-[#156250]">{item.specialities.join(", ")}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    ⭐
                                    <p className="text-[#221E33]">{item.yearsOfExperience} years of experience</p>
                                </div>
                            </div>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => { setSelectedId(item.id); setOpen(true); }}
                                        className="cursor-pointer w-full h-11 rounded-full bg-[#0C0C0C] text-white font-semibold text-[14px] hover:bg-[#1a1a1a] transition">
                                        View Detail
                                    </Button>
                                </DialogTrigger>
                                {
                                    selectedId &&
                                    <Coordinatordetailmodal 
                                    coordinatorId={selectedId} 
                                    role='user'
                                    />
                                }
                            </Dialog>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MeetCoordinator