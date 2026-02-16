import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import CustomMarkerIcon from "../../../assets/CustomMarker.png";
import getintouch from "../../../assets/GetInTouchbg.png";
import getintouchlayer from "../../../assets/getintouchlayer.png";
import { useContactInfo } from "@/hooks/getContactInfohook";
import { useTranslation } from "react-i18next";

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
    <div className="mb-10 lg:mt-30 md:mt-10 flex flex-col lg:flex-row justify-center items-stretch max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg bg-linear-to-r from-[#E4FAF7]/18 to-[#E4FAF7]">
      {/* Left Section: Contact Details */}
      <div className="w-full lg:w-1/2 text-white relative min-h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <img
            src={getintouch}
            alt="getintouch"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full z-0 opacity-70">
            <img
              src={getintouchlayer}
              alt="getintouchlayer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col px-10 py-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-wider"
              dangerouslySetInnerHTML={{
                __html: t("contact.whereIsTeam").replace(
                  /\n/g,
                  '<br className="lg:flex hidden" />',
                ),
              }}
            />
          </div>

          <div className="border-b border-[#FFFFFF]/60 w-full"></div>

          <div className="py-12 px-8 lg:py-20">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold mb-4 sm:mb-6 tracking-wider">
              {t("contact.getInTouch")}
            </h1>
            <p
              className="text-base sm:text-lg mb-6 sm:mb-8 font-semibold tracking-wider"
              dangerouslySetInnerHTML={{
                __html: t("contact.questionOrIdea").replace(/\n/g, "<br />"),
              }}
            />

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-5 tracking-wider">
              {t("contact.contactInfo")}
            </h3>

            <div className="space-y-4">
              <p className="text-base sm:text-xl flex items-start font-semibold tracking-wider">
                <i className="mr-3 sm:mr-4 text-xl sm:text-2xl mt-1"></i>
                <span>
                  {address.includes(", ") ? (
                    <>
                      {address.split(", ")[0]}, <br />{" "}
                      {address.split(", ").slice(1).join(", ")}
                    </>
                  ) : (
                    address
                  )}
                </span>
              </p>
              <p className="text-base sm:text-xl flex items-center font-semibold tracking-wider">
                <i className="mr-3 sm:mr-4 text-xl sm:text-2xl "></i>
                {phone}
              </p>
              <p className="text-base sm:text-xl flex items-center font-semibold tracking-wider">
                <i className="mr-3 sm:mr-4 text-xl sm:text-2xl "></i>
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Map */}
      <div className="w-full lg:w-1/2 h-80 sm:h-96 lg:h-auto min-h-[400px]">
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
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ContactMap;
