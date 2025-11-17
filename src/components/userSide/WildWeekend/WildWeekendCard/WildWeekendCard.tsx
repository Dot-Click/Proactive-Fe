import What from "../../../../assets/Whatis.png"
import Howdo from "../../../../assets/Howdo.png"
import when from "../../../../assets/When.png"
const WildWeekendCard = () => {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center gap-6 py-6 mb-10">
            <div className="relative">
                <img src={What} alt="What" className="h-65" />
                <div className="flex flex-col gap-6 absolute inset-0 px-4 py-12">
                    <h4 className="font-bold text-3xl">¿Qué es?</h4>
                    <span className="text-[12px] text-[#221E33]">Una experiencia única donde crearás conexiones que te llenarán el corazón, vivirás aventuras y te superarás a ti mismo/a, disfrutarás de talleres y experiencias de aprendizaje, y simplemente cambiarás tu vida.</span>
                </div>
            </div>
            <div className="relative">
                <img src={when} alt="when" className="h-60 mt-5" />
                <div className="flex flex-col gap-6 absolute inset-0 px-4 py-12">
                    <h4 className="font-bold text-3xl">¿Cuando?</h4>
                    <span className="text-[12px] text-[#221E33]">Los fines de semana salvajes se celebran durante todo el año en toda España. Suelen durar de viernes a domingo, y ocasionalmente hay algunos más largos.</span>
                </div>
            </div>
            <div className="relative">
                <img src={Howdo} alt="Howdo" className="h-65" />
                <div className="flex flex-col gap-4 absolute inset-0 px-4 py-12">
                    <h4 className="font-bold text-3xl">¿Cómo puedo participar?</h4>
                    <span className="text-[12px] text-[#221E33]">Los nuevos WW se anunciarán en Instagram en la sección "Oportunidades Abiertas". Tras completar un formulario, se seleccionarán los participantes más cualificados y que mejor se adapten a la experiencia.</span>
                </div>
            </div>
        </div>
    )
}

export default WildWeekendCard 