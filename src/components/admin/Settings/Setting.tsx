import { useState } from "react";
import General from "./General";
import Trips from "./Trips";
import Notification from "./Notification";
import Security from "./Security";
import AddFAQ from "./AddFAQ";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = ["General", "Trips", "Notifications", "Security & Data", "Add FAQ"];

  return (
    <>
      <div className="bg-white border border-[#D9D9D9] px-4 py-2 rounded-full lg:w-fit mt-4">
        <div className="flex flex-wrap lg:justify-start justify-center gap-2">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center text-[10px] md:text-[16px] px-6 py-2 rounded-full cursor-pointer transition-colors ${activeTab === tab
                ? "bg-[#221E33] text-white"
                : "bg-[#F3F3F3] text-black"
                }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      {activeTab === 'General' && <General />}
      {activeTab === 'Trips' && <Trips />}
      {activeTab === 'Notifications' && <Notification />}
      {activeTab === 'Security & Data' && <Security />}
      {activeTab === 'Add FAQ' && <AddFAQ />}
    </>
  );
}

export default Setting