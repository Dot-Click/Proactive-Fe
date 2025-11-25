import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import CustomMarkerIcon from '../../../assets/CustomMarker.png';
import getintouch from '../../../assets/GetInTouchbg.png';
import getintouchlayer from '../../../assets/getintouchlayer.png';
const customMarkerIcon = new Icon({
  iconUrl: "" + CustomMarkerIcon,
  iconRetinaUrl: "" + CustomMarkerIcon,
  shadowUrl: "",
  iconSize: [80, 80],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ContactMap = () => {
  const position: [number, number] = [24.86270, 67.07363];

  return (
    <div className="mb-10 lg:mt-0 md:mt-10 flex flex-col lg:flex-row justify-center items-center py-10 px-6 rounded-3xl overflow-hidden max-w-6xl mx-auto bg-linear-to-r from-[#E4FAF7]/18 to-[#E4FAF7] shadow-lg">
      <div className="w-full lg:w-1/2 text-white  rounded-t-3xl md:rounded-l-3xl md:rounded-t-none relative ">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <img src={getintouch} alt="getintouch" className='' />
          <div className="absolute top-0 left-0 w-full h-full z-0 opacity-70">
            <img src={getintouchlayer} alt="getintouchlayer" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col px-10 py-15">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-wider">Where is <br className="lg:flex hidden" /> the team?</h2>
          </div>
          <div className='border-b border-[#FFFFFF]/61 w-100'></div>
          <div className="py-20 px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold mb-4 sm:mb-6 tracking-wider">Get In Touch</h1>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 font-semibold tracking-wider">Have a question or idea in mind? <br /> We're here to listen and help you <br /> every step of the way.</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-5 tracking-wider">Contact Info</h3>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-xl flex items-center font-semibold tracking-wider">
                <i className="mr-3 sm:mr-4 text-xl sm:text-2xl "></i>123 Adventure Street Brussels, <br /> Belgium 1000
              </p>
              <p className="text-base sm:text-xl flex items-center font-semibold tracking-wider">
                <i className="mr-3 sm:mr-4 text-xl sm:text-2xl "></i>+32 2 123 4567
              </p>
              <p className="text-base sm:text-xl flex items-center font-semibold tracking-wider">
                <i className="mr-3 sm:mr-4 text-xl sm:text-2xl "></i>hello@proactiefuture.com
              </p>
            </div>
          </div>
        </div>

      </div>
      
      <div className="w-full lg:w-1/2 h-80 sm:h-96 md:h-[760px] md:rounded-3xl overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="topright" />

          <Marker position={position} icon={customMarkerIcon}>
            <Popup>123 Adventure Street Brussels, Belgium 1000</Popup>
          </Marker>
        </MapContainer>
      </div>

    </div>
  );
};

export default ContactMap;
