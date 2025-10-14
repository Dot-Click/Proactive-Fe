
const Reviewsave = () => {
  return (
    <div>
      <div className="flex flex-col mt-6">
        <span className="text-[#221E33] font-semibold text-[20px]">Review Your Trip</span>
        <span className="text-[#221E33] font-normal text-[14px]">Check all details before publishing. You can always edit later</span>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap md:gap-18 gap-6 mt-6">
        <div className="flex flex-col gap-3">
            <h1 className="text-[#221E33] font-bold">Basic Information</h1>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Type:</span>
            <span>Wild Weekend</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Title:</span>
            <span>Wild Weekend</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Location:</span>
            <span>Wild Weekend</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Duration:</span>
            <span>Wild Weekend</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Price:</span>
            <span>€0</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-[#221E33] font-bold">Trip Details</h1>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Group Size:</span>
            <span>12 people</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Rhythm:</span>
            <span>Wild Weekend</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Sport Level:</span>
            <span>Wild Weekend</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Coordinators:</span>
            <span>1</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#221E33] font-bold">Included Items:</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviewsave