import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Globe2, Sparkles, Trophy, Quote } from "lucide-react";

interface CoordinatordetailProps {
    trip?: any;
}

const Coordinatordetail = ({ trip }: CoordinatordetailProps) => {
    const tripData = trip?.trip?.[0] || trip?.trip || trip;
    const coordinators = tripData?.coordinators || (tripData?.coordinator ? [tripData.coordinator] : []) || [];

    // For demonstration, ensure we have 3-5 coordinators with mock data for gif/adventures
    let displayCoordinators = Array.isArray(coordinators)
        ? coordinators.map((coord: any) => ({
            ...coord,
            fullName: coord.fullName || coord.CoordinatorName,
            profilePicture: coord.profilePicture || coord.CoordinatorPhoto,
            // Mock data for demo
            gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx66F9C7Pa/giphy.gif",
            tripsDone: Math.floor(Math.random() * 15) + 5,
            bio: "Viajero incasable, amante de las montañas y fotógrafo aficionado. He recorrido más de 30 países buscando las mejores puestas de sol.",
            crazyAdventures: "Dormí en un iglú en Groenlandia y crucé el desierto del Sáhara en camello durante 7 días.",
            languages: ["Español", "Inglés", "Francés"]
        }))
        : [];

    if (displayCoordinators.length < 3) {
        const mocks = [
            {
                fullName: "Alex Rivera",
                profilePicture: "https://i.pravatar.cc/300?u=1",
                gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0HlPcEIPqY2Tj1V6/giphy.gif",
                tripsDone: 12,
                bio: "Apasionado por la cultura asiática y el senderismo. Mi misión es que cada viajero descubra la esencia real de cada destino.",
                crazyAdventures: "Hice paracaidismo sobre los Alpes y buceé con tiburones en Sudáfrica.",
                languages: ["Español", "Inglés", "Portugués"]
            },
            {
                fullName: "Maria Garcia",
                profilePicture: "https://i.pravatar.cc/300?u=2",
                gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif",
                tripsDone: 8,
                bio: "Especialista en rutas gastronómicas y mercados locales. Creo que la mejor forma de conocer un país es a través de su comida.",
                crazyAdventures: "Comí insectos en Tailandia y aprendí a cocinar pasta con una 'nonna' en Sicilia.",
                languages: ["Español", "Italiano", "Inglés"]
            },
            {
                fullName: "Jordan Smit",
                profilePicture: "https://i.pravatar.cc/300?u=3",
                gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l2JhMvI81e59S3Ucw/giphy.gif",
                tripsDone: 15,
                bio: "Geólogo y guía de montaña. Me encanta explicar la historia natural de los paisajes que visitamos.",
                crazyAdventures: "Subí al campo base del Everest y exploré cuevas de hielo en Islandia.",
                languages: ["Inglés", "Español", "Alemán"]
            },
            {
                fullName: "Sam Lopez",
                profilePicture: "https://i.pravatar.cc/300?u=4",
                gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx66F9C7Pa/giphy.gif",
                tripsDone: 5,
                bio: "Surfista y amante del mar. Siempre busco los destinos con las mejores olas y playas vírgenes.",
                crazyAdventures: "Surfeé olas de 5 metros en Nazaret y viví en una furgoneta un año.",
                languages: ["Español", "Inglés"]
            }
        ];
        displayCoordinators = [...displayCoordinators, ...mocks].slice(0, 5);
    }

    if (displayCoordinators.length === 0) return null;

    return (
        <div className="py-16 border-t border-[#ECECF1] mt-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl space-y-6">
                    <h3 className="text-[#221E33] font-extrabold text-3xl font-sans tracking-tight">
                        Los coordinadores de viaje
                    </h3>
                    <p className="text-[#646464] text-base leading-relaxed font-sans">
                        Nuestros coordinadores son elegidos porque son personas como tú: viajeros apasionados, capaces de compartir la experiencia de forma auténtica y con la preparación necesaria para que vivas tu viaje al máximo.
                    </p>
                    <button className="px-6 py-2.5 border border-[#D1D5DB] rounded-lg text-[#221E33] font-bold text-sm hover:bg-gray-50 transition-colors bg-white shadow-sm font-sans">
                        Descubre más sobre nuestros coordinadores
                    </button>
                </div>

                {/* Overlapping Avatars with Hover-Gif and Modal */}
                <div className="flex -space-x-6">
                    {displayCoordinators.map((coord: any, idx) => {
                        const name = coord.fullName || "Coordinador";
                        const img = coord.profilePicture;
                        const gif = coord.gif;

                        return (
                            <Dialog key={idx}>
                                <DialogTrigger asChild>
                                    <div className="relative group cursor-pointer">
                                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-110 group-hover:z-20 group-hover:shadow-2xl">
                                            {/* Static Image */}
                                            <img
                                                src={img}
                                                alt={name}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                            />
                                            {/* GIF/Video Shadow Image (Moving Effect) */}
                                            <img
                                                src={gif}
                                                alt={`${name} moving`}
                                                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </DialogTrigger>

                                <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl">
                                    <div className="flex flex-col md:flex-row min-h-[500px]">
                                        {/* Left Side: Photo & Trips Done */}
                                        <div className="md:w-[45%] relative bg-[#221E33]">
                                            <img
                                                src={img}
                                                alt={name}
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                            {/* Trips Done badge overlay */}
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-[#0DAC87] flex items-center justify-center shadow-lg">
                                                        <Trophy className="text-white" size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-2xl leading-none">{coord.tripsDone}</p>
                                                        <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mt-1">Viajes realizados</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Info Sections */}
                                        <div className="md:w-[55%] p-8 lg:p-12 space-y-8 overflow-y-auto max-h-[90vh]">
                                            <div>
                                                <Badge className="bg-[#E6F7F3] text-[#0DAC87] hover:bg-[#E6F7F3] border-none font-bold px-3 py-1 mb-3">
                                                    Trip Coordinator
                                                </Badge>
                                                <h2 className="text-[#221E33] font-black text-4xl tracking-tight leading-none">
                                                    {name}
                                                </h2>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[#221E33] font-bold">
                                                    <Quote size={20} className="text-[#0DAC87]" />
                                                    <h4>Biografía</h4>
                                                </div>
                                                <p className="text-[#646464] text-base leading-relaxed">
                                                    {coord.bio}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[#221E33] font-bold">
                                                    <Sparkles size={20} className="text-[#0DAC87]" />
                                                    <h4>Aventuras locas</h4>
                                                </div>
                                                <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-[#F3F4F6]">
                                                    <p className="text-[#221E33] text-sm italic leading-relaxed">
                                                        "{coord.crazyAdventures}"
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[#221E33] font-bold">
                                                    <Globe2 size={20} className="text-[#0DAC87]" />
                                                    <h4>Idiomas</h4>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {coord.languages.map((lang: string, lIdx: number) => (
                                                        <Badge key={lIdx} variant="outline" className="border-[#ECECF1] text-[#666373] font-medium px-4 py-1.5 rounded-full">
                                                            {lang}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Coordinatordetail;
