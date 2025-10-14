import { useState } from "react";
import PaymentStatus from "./PaymentStatus";
import MembershipTracker from "./MembershipTracker";
import DiscountCode from "./DiscountCode";

const Paymentmembership = () => {
  const [activeTab, setActiveTab] = useState("Payment Status");

  const tabs = ["Payment Status", "Membership Tracker", "Discount Code"];

  return (
    <>
      <div className="bg-white border border-[#D9D9D9] px-4 py-2 rounded-full w-fit mt-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full cursor-pointer transition-colors ${activeTab === tab
                ? "bg-[#221E33] text-white"
                : "bg-[#F3F3F3] text-black"
                }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      {activeTab === 'Payment Status' && <PaymentStatus />}
      {activeTab === 'Membership Tracker' && <MembershipTracker />}
      {activeTab === 'Discount Code' && <DiscountCode />}

    </>
  );
}

export default Paymentmembership