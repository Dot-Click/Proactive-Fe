import What from "../../../../assets/Whatis.png"
import Howdo from "../../../../assets/Howdo.png"
import when from "../../../../assets/When.png"
const InternalEventCard = () => {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center gap-6 py-6 lg:mb-30 lg:-mt-10 md:mt-10 mb-20 -mt-10">
            <div className="relative">
                <img src={What} alt="What" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Qué es?</h4>
                    <span className="text-[12px] text-[#221E33]">Organizamos eventos internos exclusivos para voluntarios. De esta manera, el equipo se reúne para fortalecer lazos y dar vida a las ideas. Estos eventos generan una alegría y un ambiente inmejorables.</span>
                </div>
            </div>
            <div className="relative lg:mt-5">
                <img src={when} alt="when" className="lg:h-60 h-50" />
                <div className="flex flex-col lg:gap-7 gap-2 absolute inset-0 px-4 lg:py-6 py-6">
                    <h4 className="font-bold lg:text-3xl">Trabajo en equipo</h4>
                    <span className="text-[12px] text-[#221E33]">Organizamos dos eventos de integración de equipos al año, uno en verano y otro en invierno. Estos eventos combinan aventura con talleres para aprender y desarrollarnos como equipo. Hemos impartido talleres de acroyoga, teatro, tecnología, comunicación, definición de objetivos y mucho más.</span>
                </div>
            </div>
            <div className="relative">
                <img src={Howdo} alt="Howdo" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">Reuniones</h4>
                    <span className="text-[12px] text-[#221E33]">Todos los meses nos reunimos en línea durante una hora para seguir convirtiendo ideas en realidad y organizarnos, ¡mientras lo pasamos bien! :)</span>
                </div>
            </div>
        </div>
    )
}

export default InternalEventCard 