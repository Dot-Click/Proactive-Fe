import What from "../../../../assets/Whatis.png"
import Howdo from "../../../../assets/Howdo.png"
import when from "../../../../assets/When.png"

const WildTripCard = () => {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center gap-6 py-6 lg:mb-30 lg:-mt-10 md:mt-20 mb-20 -mt-10">
            <div className="relative">
                <img src={What} alt="What" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Qué es?</h4>
                    <span className="lg:text-[12px] text-[10px] text-[#221E33]">Te invitamos a una experiencia única explorando otras culturas y viviendo aventuras en un grupo de hasta 12 personas. Se trata de viajes de mochilero muy locales, con mucha flexibilidad para adaptarte a la cultura, que te permitirán sumergirte por completo en ella. Prepárate para algo realmente increíble.</span>
                </div>
            </div>
            <div className="relative lg:mt-5">
                <img src={when} alt="when" className="lg:h-60 h-50" />
                <div className="flex flex-col lg:gap-8 gap-2 absolute inset-0 px-4 lg:py-7 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Cuando?</h4>
                    <span className="text-[12px] text-[#221E33]">Hay varios viajes a lo largo del año, pero ahora mismo estamos haciendo viajes de aventura a Egipto e Islandia.</span>
                </div>
            </div>
            <div className="relative">
                <img src={Howdo} alt="Howdo" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Cómo puedo participar?</h4>
                    <span className="text-[12px] text-[#221E33]">Los nuevos viajes se anunciarán en Instagram en la sección "Oportunidades Abiertas". Tras completar un formulario, se seleccionarán los viajeros más cualificados y que mejor se adapten a la experiencia.</span>
                </div>
            </div>
        </div>
    )
}

export default WildTripCard 