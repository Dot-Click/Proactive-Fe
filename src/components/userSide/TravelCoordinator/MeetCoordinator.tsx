import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const CoordinatorData = [
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },

    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
    {
        img: "https://github.com/shadcn.png",
        Name: "Esther Howard",
        Description: "Passionate explorer & cultural enthusiast",
        Badge: "Cultural Immersion",
        Triplead: "24 trips led"
    },
]
const MeetCoordinator = () => {
    return (
        <div className="bg-[#FAFAFA] py-20">
            <div className="flex flex-col gap-4 justify-center items-center ">
                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-4xl">Meet Our Coordinators</h1>
                <p className="text-center text-[#221E33]">Get to know the amazing people who make every Proactive Future adventure unforgettable</p>
            </div>
            <div className="grid lg:grid-cols-4 items-center gap-4 px-12 py-12">
                {
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
                }
            </div>
        </div>
    )
}

export default MeetCoordinator