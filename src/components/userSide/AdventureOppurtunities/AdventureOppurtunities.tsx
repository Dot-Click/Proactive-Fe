// import linearline from "../../../assets/linearline.png"
// import Box from "../../../assets/box.png"
import Adventureoppurtunitiescard from "./Adventureoppurtunitiescard"

const AdventureOppurtunities = () => {
    return (
        <div className="bg-linear-gradient-to-r from-[#F0F5FD]/18 to-[#F0F5FD]">
            {/* <div className="relative flex justify-between items-center">
                <img src={linearline} alt="linearline"  className="absolute top-25 left-25"/>
                <img src={Box} alt="Box" className="absolute top-25 right-25" />
            </div> */}
            <div className="flex flex-col gap-8 py-10">
                <h1 className="text-center text-4xl font-bold bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">Adventure Oppurtunities</h1>
                <p className="text-center text-sm text-[#221E33]">Choose your path to adventure. Whether you're looking for a quick escape or an extended journey, <br />
                    we have the perfect experience waiting for you.</p>
            </div>
            <div className="px-4 sm:px-16 py-8 flex justify-center items-center">
            <Adventureoppurtunitiescard/>
            </div>
        </div>
    )
}

export default AdventureOppurtunities