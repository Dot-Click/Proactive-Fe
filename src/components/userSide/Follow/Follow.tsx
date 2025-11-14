import Instagram from "../../../assets/Instagram.png"
import FollowCard from "./FollowCard"
const Follow = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 lg:py-20 py-8">
        <img src={Instagram} className="" alt="Instagram" />
        <h1 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold lg:text-4xl">Follow Our Journey</h1>
        <p className="text-center text-[#221E33] font-medium">Get inspired by real adventures from our community. Follow @proactivefuture for daily <br className="lg:block hidden"/> doses of wanderlust!</p>
        <div >
            <FollowCard/>
        </div>
    </div>
  )
}

export default Follow