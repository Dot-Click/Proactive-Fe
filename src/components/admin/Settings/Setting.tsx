import { useState } from "react";
import General from "./General";
import Trips from "./Trips";
import Notification from "./Notification";
import Security from "./Security";
import AddFAQ from "./AddFAQ";
import Contact from "./Contact";
import Location from "./Location";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = ["General", "Contact","Locations", "Trips", "Notifications", "Security & Data", "Add FAQ"];

  return (
    <div className="w-full">
      <div className="bg-white border border-[#D9D9D9] px-4 py-2 rounded-full lg:w-fit mt-4 overflow-x-auto">
        <div className="flex flex-nowrap lg:justify-start justify-start gap-2 min-w-0">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center shrink-0 text-[10px] md:text-[16px] px-4 md:px-6 py-2 rounded-full cursor-pointer transition-colors ${activeTab === tab
                ? "bg-[#221E33] text-white"
                : "bg-[#F3F3F3] text-black"
                }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-[400px] mt-4">
        {activeTab === "General" && <General />}
        {activeTab === "Contact" && <Contact />}
        {activeTab === "Trips" && <Trips />}
        {activeTab === "Notifications" && <Notification />}
        {activeTab === "Security & Data" && <Security />}
        {activeTab === "Add FAQ" && <AddFAQ />}
        {activeTab === "Locations" && <Location />}
      </div>
    </div>
  );
}

export default Setting