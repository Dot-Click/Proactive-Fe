import { Button } from "@/components/ui/button"
import Instagram from "../../../../assets/Instagram.png"
import Instagram2 from "../../../../assets/Instagram2.png"
import FollowCard from "./FollowCard"
const Follow = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 lg:py-16 py-8">
        <img src={Instagram} className="" alt="Instagram" />
        <h1 className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold lg:text-4xl">Follow Our Journey</h1>
        <p className="text-center text-[#221E33] font-medium">Get inspired by real adventures from our community. Follow @proactivefuture for daily <br className="lg:block hidden" /> doses of wanderlust!</p>
      </div>
      <div className="flex flex-col justify-center items-center mb-6">
        <FollowCard />
        <div>
          <Button className="rounded-full px-7 py-6 bg-linear-to-r from-[#F73696] to-[#FF6800] cursor-pointer">
            <img src={Instagram2} alt="Instagram2" className="h-4" />
            <p>Follow @proactivefuture</p>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Follow