import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import bottomimg from "../../../assets/participantsbottom.png"
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";

const CardsDetail = [
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
    {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
        Name: "Esther Howard",
        CollegeName: "Student in Panadomte Christian College"
    },
]

const ParticipantsCards = () => {

    return (
        <div className="px-4 sm:px-16 py-4">
            <h4 className="text-[#000000] font-bold text-lg">What Participants Say</h4>
            <div className="py-6">
                <Marquee direction="left" pauseOnHover speed={50}>
                    <div className="grid grid-cols-3 gap-3 cursor-pointer">
                        {
                            CardsDetail.map((item, index) => (
                                <div key={index} className="w-100 shadow-md flex flex-col gap-6 bg-[#F9F9F9] border border-[#E0D9D9] rounded-[20px] px-10 py-8">
                                    <span className="text-[#514D4D] font-semibold text-[14px]">{item.Description}</span>
                                    <img src={bottomimg} alt="bottomimg" />
                                    <div className="flex items-center gap-2">
                                        <Avatar className="lg:w-18 lg:h-18 mr-2">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h4 className="text-[#19232B] font-semibold">{item.Name}</h4>
                                            <span className="text-[#514D4D] text-[13px] text-nowrap">{item.CollegeName}</span>
                                            <div className="flex gap-2 mt-1">
                                                {[...Array(5)].map(() => {
                                                    // const ratingValue = i + 1
                                                    return (
                                                        <FaStar
                                                        color="#0DAC87"
                                                        // onMouseEnter={() => setHover(ratingValue)}
                                                        // onMouseLeave={() => setHover(0)}
                                                        // onClick={() => setRating(ratingValue)}
                                                        // color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Marquee>
            </div>
        </div>
    )
}

export default ParticipantsCards