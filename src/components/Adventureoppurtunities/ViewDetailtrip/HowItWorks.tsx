import { Calendar, UserPlus, Map, Users, Heart } from 'lucide-react';
import zigzagbottom from "../../../assets/zigzagbottom.png"

const HowItWorks = () => {
    const steps = [
        {
            icon: <Calendar className="size-7 text-[#FF4D4D]" />,
            title: "When are they?",
            description: "Discover our upcoming group departures by destination, month or type of trip. We're sure to have that trip you've been dreaming of for a long time."
        },
        {
            icon: <UserPlus className="size-7 text-[#FF4D4D]" />,
            title: "How do I sign up?",
            description: "When you receive an email that your trip is 'Confirmed', it means it's official, we're going on a trip! We do not include flights, so you have total freedom of choice."
        },
        {
            icon: <Map className="size-7 text-[#FF4D4D]" />,
            title: "Adventure",
            description: "The travel group will be formed by people of your age (25-35 and 35-45 years). In this way you will share the experience with people similar to you and your interests."
        },
        {
            icon: <Users className="size-7 text-[#A855F7]" />,
            title: "Expert coordination team",
            description: "On our trip we will be accompanied by a coordinator, who is an adventure companion more than who is in charge of the logistics and organization of the trip."
        },
        {
            icon: <Heart className="size-7 text-[#EC4899]" />,
            title: "Enjoy the best group trip 💗",
            description: "Connect with your new friends, explore the destination you have chosen and get excited living the experience of your life, we assure you it will be unforgettable."
        }
    ];

    return (
        <div className="py-20 border-t border-[#ECECF1]">
            <h2 className="text-center text-3xl font-extrabold text-[#221E33] mb-16 tracking-tight">¿Cómo funciona?</h2>
            <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-8 bg-[#F9FAFB]/50 rounded-[32px] border border-[#F3F4F6] transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1 duration-300"
                        >
                            <div className="mb-8 p-5 rounded-full bg-white shadow-sm ring-1 ring-black/5">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[#221E33] mb-4 leading-tight">
                                {step.title}
                            </h3>
                            <p className="text-[#64748B] text-sm leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full pt-10">
                <img src={zigzagbottom} alt="" className="w-full opacity-50" />
            </div>
        </div>
    );
};

export default HowItWorks;
