import OuttripCard from "./OuttripCard"

const Ourtrips = () => {
  return (
    <div className="bg-linear-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
      {/* <div className="relative flex justify-between items-center">
                <img src={linearline} alt="linearline"  className="absolute top-25 left-25"/>
                <img src={Box} alt="Box" className="absolute top-25 right-25" />
            </div> */}
      <div className="flex flex-col lg:gap-8 gap-4 lg:pt-20 pt-10">
        <h1 className="text-center lg:text-4xl text-2xl font-bold bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">Our trips</h1>
      </div>
      <div className="px-4 sm:px-16 py-8 flex justify-center items-center">
        <OuttripCard />
      </div>
    </div>
  )
}

export default Ourtrips