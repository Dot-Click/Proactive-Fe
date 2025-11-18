import setting from "../../../../assets/setting.png"
import WT1 from "../../../../assets/WT1.png"
import WT2 from "../../../../assets/WT2.png"

const WTConnectStranger = () => {
    return (
        <div className="relative ">
            {/* <div className="bg-black lg:h-[130vh] md:h-[200vh] h-[120vh]"></div> */}
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-30 gap-10 lg:py-10">
                <div className="flex flex-col justify-end items-end lg:mt-15 mt-10">
                    <img src={WT1} alt="WT1" className="lg:h-100 h-50" />
                    <img src={WT2} alt="WT2" className="lg:h-70 h-30 -mt-[60px] lg:-mr-10" />
                </div>

                <div className="flex flex-col lg:gap-8 gap-6 px-5 lg:px-0">
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Conectar con extrañas</h4>
                            <p className="text-[#221E33] text-[12px]">Cansado de una sociedad en la que cada <br /> vez es más difícil conectar con las personas que nos <br /> rodean, esta experiencia es perfecta para <br /> abrirse a conocer gente maravillosa <br /> y crear recuerdos compartidos únicos.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Conectar con extrañas</h4>
                            <p className="text-[#221E33] text-[12px]">Los fines de semana de Wild Weekends <br /> se preparan con esmero y cariño, <br /> cuidando cada detalle para ofrecer aventuras <br /> increíbles y vivir al máximo el evento. <br /> ¡Siempre con buena onda! ;)</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Aventura</h4>
                            <p className="text-[#221E33] text-[12px]">Como dijeron en un fin de semana salvaje: <br />  "prepárense para todo", eso es lo mejor: <br /> mucha aventura, superación personal y  <br /> risas, ¿listos?</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Coordinadora 24/7</h4>
                            <p className="text-[#221E33] text-[12px]">Varios miembros del equipo de Proactive Future <br /> coordinarán el Wild Weekend para garantizar <br /> que todo transcurra de la forma más fluida <br /> posible.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={setting} alt="setting" className="h-4 mt-2" />
                        <div className="flex flex-col">
                            <h4 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold text-xl">Precio muy bajo</h4>
                            <p className="text-[#221E33] text-[12px]">Compara precios en línea y verás que, <br /> con todo incluido, ningún otro precio  <br />  se acerca a estos. Nuestro objetivo  <br />  es que sean asequibles.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WTConnectStranger