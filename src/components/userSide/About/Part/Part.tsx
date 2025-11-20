import setting from "../../../../assets/setting.png"
import AboutPart1 from "../../../../assets/AboutPart1.png"
import AboutPart2 from "../../../../assets/AboutPart2.png"
import box1 from "../../../../assets/box.png"

const Part = () => {
    return (
        <div className="relative bg-[#F0F5FD]/28">
            <div className="relative">
                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text 
                  font-bold lg:text-4xl relative z-10 text-center lg:py-20 py-10 tracking-wider">
                    Why be part of it?
                </h1>
                <img
                    src={box1}
                    alt="box1"
                    className="w-22 h-26 absolute top-10 left-122 -translate-x-1/2  opacity-80 lg:flex hidden"
                />
            </div>
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-30 gap-10 lg:py-10 py-8">
                <div className="flex flex-col lg:gap-8 gap-6 px-5 lg:px-0">
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Motivated group of young <br /> people</h4>
                            <p className="text-[#221E33] text-[12px]">Cansado de una sociedad en la que cada <br /> vez es más difícil conectar con las personas que nos <br /> rodean, esta experiencia es perfecta para <br /> abrirse a conocer gente maravillosa <br /> y crear recuerdos compartidos únicos.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Priority in youth mobility</h4>
                            <p className="text-[#221E33] text-[12px]">Los fines de semana de Wild Weekends <br /> se preparan con esmero y cariño, <br /> cuidando cada detalle para ofrecer aventuras <br /> increíbles y vivir al máximo el evento. <br /> ¡Siempre con buena onda! ;)</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Creating team projects</h4>
                            <p className="text-[#221E33] text-[12px]">Como dijeron en un fin de semana salvaje: <br />  "prepárense para todo", eso es lo mejor: <br /> mucha aventura, superación personal y  <br /> risas, ¿listos?</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Make a difference on your <br /> CV</h4>
                            <p className="text-[#221E33] text-[12px]">Varios miembros del equipo de Proactive Future <br /> coordinarán el Wild Weekend para garantizar <br /> que todo transcurra de la forma más fluida <br /> posible.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Benefits in your daily life</h4>
                            <p className="text-[#221E33] text-[12px]">Compara precios en línea y verás que, <br /> con todo incluido, ningún otro precio  <br />  se acerca a estos. Nuestro objetivo  <br />  es que sean asequibles.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Continuous training and <br /> enjoyment</h4>
                            <p className="text-[#221E33] text-[12px]">Compara precios en línea y verás que, <br /> con todo incluido, ningún otro precio  <br />  se acerca a estos. Nuestro objetivo  <br />  es que sean asequibles.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <img src={AboutPart1} alt="AboutPart1" className="lg:h-100 h-50" />
                    <img src={AboutPart2} alt="AboutPart2" className="lg:h-70 h-30 -mt-[60px] -ml-6" />
                </div>
            </div>
        </div>
    )
}

export default Part