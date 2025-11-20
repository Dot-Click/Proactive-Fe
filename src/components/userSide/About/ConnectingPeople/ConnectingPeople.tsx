import connectingPeople from "../../../../assets/connectingPeople.png"
import box2 from "../../../../assets/box2.png"

const ConnectingPeople = () => {
    return (
        <div className="relative">
            <img src={connectingPeople} alt="connectingPeople" />
            <div className="flex flex-col lg:justify-end h-130 lg:gap-12 gap-4 absolute inset-0 lg:py-0 py-6 px-2">
                <div className="relative">
                    <h1 className="text-center text-[#F7EBBE] 
      font-bold lg:text-4xl relative z-10 tracking-wider">
                        Connecting People
                    </h1>
                    <img
                        src={box2}
                        alt="box2"
                        className="w-25 h-25 absolute -top-7 left-120  opacity-20 lg:flex hidden"
                    />
                </div>
                <p className="text-center text-[#FFFFFF] lg:text-[14px] text-[10px]">Our business is deeply human: it's built on relationships and interactions , not just while we're <br className="lg:flex hidden"/> traveling. We host many events throughout the year to engage with our community and <br className="lg:flex hidden"/> have our WeRoaders and travel coordinators share their stories. Every day we see the <br className="lg:flex hidden"/> impact of our work and are reminded that we make a living building relationships and <br className="lg:flex hidden"/> changing lives . Not many companies can say the same. This is our "why ," the reason we <br className="lg:flex hidden"/> come to work every day, and we consider it a privilege.</p>
            </div>
        </div>
    )
}

export default ConnectingPeople