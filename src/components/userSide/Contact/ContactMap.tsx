import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import CustomMarkerIcon from "../../../assets/CustomMarker.avif";
import getintouch from "../../../assets/GetInTouchbg.avif";
import getintouchlayer from "../../../assets/getintouchlayer.avif";
import { useContactInfo } from "@/hooks/getContactInfohook";
import { useTranslation } from "react-i18next";
import callicon from "../../../assets/footerphone.avif";
import mailicon from "../../../assets/footeremail.avif";
import locationicon from "../../../assets/footerlocation.avif";

const customMarkerIcon = new Icon({
  iconUrl: "" + CustomMarkerIcon,
  iconRetinaUrl: "" + CustomMarkerIcon,
  shadowUrl: "",
  iconSize: [80, 80],
  iconAnchor: [40, 80], // Adjusted anchor to point to the bottom center of the icon
  popupAnchor: [0, -70],
  shadowSize: [41, 41],
});

const DEFAULT_POSITION: [number, number] = [24.8627, 67.07363];
const DEFAULT_ADDRESS = "123 Adventure Street Brussels, Belgium 1000";
const DEFAULT_PHONE = "+32 2 123 4567";
const DEFAULT_EMAIL = "hello@proactiefuture.com";

const ContactMap = () => {
  const { t } = useTranslation();
  const { data } = useContactInfo();

  const lat =
    data?.mapLat != null ? parseFloat(data.mapLat) : DEFAULT_POSITION[0];
  const lng =
    data?.mapLng != null ? parseFloat(data.mapLng) : DEFAULT_POSITION[1];
  const position: [number, number] = [
    Number.isFinite(lat) ? lat : DEFAULT_POSITION[0],
    Number.isFinite(lng) ? lng : DEFAULT_POSITION[1],
  ];

  const address = data?.contactAddress ?? DEFAULT_ADDRESS;
  const phone = data?.contactPhone ?? DEFAULT_PHONE;
  const email = data?.contactEmail ?? DEFAULT_EMAIL;

  return (
    <div className="mt-12 mb-20 md:mb-32 lg:mt-32 md:mt-20 flex flex-col xl:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto w-[95%] sm:w-full">
      {/* Left Section: Contact Details */}
      <div className="w-full xl:w-1/2 text-white relative min-h-fit lg:min-h-full flex flex-col rounded-3xl overflow-hidden shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src={getintouch}
            alt="getintouch"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full opacity-70">
            <img
              src={getintouchlayer}
              alt="getintouchlayer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col w-full h-full">
          <div className="flex flex-col px-6 py-8 sm:px-10 sm:py-12 w-full">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-wider w-full"
              dangerouslySetInnerHTML={{
                __html: t("contact.whereIsTeam").replace(
                  /\n/g,
                  '<br className="lg:block hidden" />',
                ),
              }}
            />
          </div>

          <div className="border-b border-[#FFFFFF]/60 w-full opacity-40"></div>

          <div className="py-10 px-6 sm:px-10 lg:py-20 lg:px-12 w-full flex-grow">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight">
              {t("contact.getInTouch")}
            </h1>
            <p
              className="text-sm sm:text-lg mb-6 sm:mb-8 font-medium opacity-90 leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{
                __html: t("contact.questionOrIdea").replace(/\n/g, "<br />"),
              }}
            />

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
              {t("contact.contactInfo")}
            </h3>

            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="p-2 sm:p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                   <img src={locationicon} alt="location" className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                   <p className="text-sm sm:text-base lg:text-lg font-semibold leading-snug">
                    {address}
                   </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 group">
                <div className="p-2 sm:p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                  <img src={callicon} alt="call" className="w-5 h-5" />
                </div>
                <a href={`tel:${phone}`} className="text-sm sm:text-base lg:text-lg font-bold hover:underline transition-all">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 group">
                <div className="p-2 sm:p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                  <img src={mailicon} alt="mail" className="w-5 h-5" />
                </div>
                <a href={`mailto:${email}`} className="text-sm sm:text-base lg:text-lg font-bold hover:underline transition-all break-all">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Map */}
      <div className="w-full xl:w-1/2 h-80 sm:h-96 xl:h-auto min-h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="topright" />

          <Marker position={position} icon={customMarkerIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ContactMap;
