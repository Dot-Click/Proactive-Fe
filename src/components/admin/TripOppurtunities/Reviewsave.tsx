import { useFormContext } from "react-hook-form";
import type { TripFormType } from "./tripschema";

const Reviewsave = () => {
  const { getValues } = useFormContext<TripFormType>();
  const values = getValues();
  return (
    <div className="bg-white px-6 py-6">
      <div className="flex flex-col">
        <span className="text-[#221E33] font-semibold text-[20px]">
          Review Your Trip
        </span>
        <span className="text-[#221E33] font-normal text-[14px]">
          Check all details before publishing. You can always edit later
        </span>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap md:gap-18 gap-6 mt-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-[#221E33] font-bold">Basic Information</h1>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Type:</span>
            <span>{values.type}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Title:</span>
            <span>{values.title}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Location:</span>
            <span>{values.location}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Duration:</span>
            <span>{values.duration}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Price:</span>
            <span>{values.BestPrice}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-[#221E33] font-bold">
            Trip Details: {values.description}
          </h1>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Group Size:</span>
            <span>{values.GroupSize}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Rhythm:</span>
            <span>{values.rhythm}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Sport Level:</span>
            <span>{values.SportsLevel}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Coordinators:</span>
            <span>1</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Included Items:</span>
            <span>{values.included.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviewsave;
