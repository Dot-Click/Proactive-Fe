import Memories1 from "../../../../assets/Memories1.avif"
import Memories2 from "../../../../assets/Memories2.avif"
import Memories3 from "../../../../assets/Memories3.avif"
import Memories4 from "../../../../assets/Memories4.avif"
import Memories5 from "../../../../assets/Memories5.avif"
import Memories6 from "../../../../assets/Memories6.avif"
import Memories7 from "../../../../assets/Memories7.avif"
import Memories8 from "../../../../assets/Memories8.avif"

const SomeMemoriesCard = () => {
    return (
        <div className="flex flex-col gap-4 px-6">
            {/* Row: 3 Images */}
            <div className="flex lg:flex-row flex-col gap-4">
                <img src={Memories1} alt="Memories1" className="h-80 object-contain" />
                <img src={Memories2} alt="Memories2" className="h-80 object-contain"  />
                <img src={Memories3} alt="Memories3" className="h-80 object-contain" />
            </div>

            {/* Row: 2 Images */}
            <div className="flex lg:flex-row flex-col gap-4">
                <img src={Memories4} alt="Memories4" className="h-80 object-contain" />
                <img src={Memories5} alt="Memories5" className="h-80 object-contain" />
            </div>

            {/* Row: 3 Images */}
            <div className="flex lg:flex-row flex-col gap-4">
                <img src={Memories6} alt="Memories6" className="h-110 object-contain" />
                <img src={Memories7} alt="Memories7" className="h-110 object-contain" />
                <img src={Memories8} alt="Memories8" className="h-110 object-contain" />
            </div>
        </div>
    )
}

export default SomeMemoriesCard