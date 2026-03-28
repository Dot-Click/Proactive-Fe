import Erasmus1 from "../../../../assets/Erasmus1.avif";
import Erasmus2 from "../../../../assets/Erasmus2.avif";
import Erasmus3 from "../../../../assets/Erasmus3.avif";
import Erasmus4 from "../../../../assets/Erasmus4.avif";
import Erasmus5 from "../../../../assets/Erasmus5.avif";
import Erasmus6 from "../../../../assets/Erasmus6.avif";
import Erasmus7 from "../../../../assets/Erasmus7.avif";
import Erasmus8 from "../../../../assets/Erasmus8.avif";
import Erasmus9 from "../../../../assets/Erasmus9.avif";
const ErasmusCard = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-6 mb-8">
      <div className="relative rounded-[14px] overflow-hidden ">
        <img
          src={Erasmus1}
          alt="Erasmus1"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-6 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">UNSTOPPABLE | Cantabria</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus2}
          alt="Erasmus2"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-6 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">NO LIMITS | Asturias</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus3}
          alt="Erasmus3"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-4 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">We Are Europe | Training Course</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus4}
          alt="Erasmus4"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-6 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">Make It Possible | Asturias</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus5}
          alt="Erasmus5"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-4 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">Youth Entrepreneurship in Rural Areas | Erasmus+</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus6}
          alt="Erasmus6"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-4 py-4 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">The Future is Rural | Castilla-La Mancha</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus7}
          alt="Erasmus7"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-6 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">Explosive Habits | Asturias</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus8}
          alt="Erasmus8"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-4 py-3 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">Shape Your Future, Shape Your Mind | Caribe</h4>
        </div>
      </div>
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          src={Erasmus9}
          alt="Erasmus9"
          className="h-[360px] object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-6 absolute inset-0">
          <h4 className="text-[#FFFFFF] font-medium text-lg text-center">SoulFit | Asturias</h4>
        </div>
      </div>
    </div>
  )
}

export default ErasmusCard