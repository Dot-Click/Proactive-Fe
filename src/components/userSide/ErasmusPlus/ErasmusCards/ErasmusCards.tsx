import What from "../../../../assets/Whatis.png"
import Howdo from "../../../../assets/Howdo.png"
import when from "../../../../assets/When.png"
const ErasmusCards = () => {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center gap-6 py-6 lg:mb-30 lg:-mt-10 md:mt-20 mb-20 -mt-10">
            <div className="relative">
                <img src={What} alt="What" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-17 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Qué es?</h4>
                    <span className="text-[12px] text-[#221E33]">Un intercambio juvenil, una formación para jóvenes y mucho más</span>
                </div>
            </div>
            <div className="relative lg:mt-5">
                <img src={when} alt="when" className="lg:h-60 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Cuando?</h4>
                    <span className="text-[12px] text-[#221E33]">Manténgase atento a las redes sociales durante todo el año.</span>
                </div>
            </div>
            <div className="relative">
                <img src={Howdo} alt="Howdo" className="lg:h-65 h-50" />
                <div className="flex flex-col lg:gap-6 gap-2 absolute inset-0 px-4 lg:py-12 py-6">
                    <h4 className="font-bold lg:text-3xl">¿Cómo puedo participar?</h4>
                    <span className="text-[12px] text-[#221E33]">Los nuevos viajes se anunciarán en Instagram en la sección "Oportunidades Abiertas". Tras completar un formulario, se seleccionarán los participantes más motivados.</span>
                </div>
            </div>
        </div>
    )
}

export default ErasmusCards 