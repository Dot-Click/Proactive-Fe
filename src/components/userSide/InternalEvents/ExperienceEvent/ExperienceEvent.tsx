import ExperienceEventVideo from "./ExperienceEventVideo"

const ExperienceEvent = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center lg:gap-8 lg:pt-30 pt-10">
                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl">Experience Our Events</h1>
                <p className="text-[#221E33] text-[15px] text-center">See what makes our internal events transformative for travel professionals</p>
            </div>
            <div>
                <ExperienceEventVideo />
            </div>
        </>
    )
}

export default ExperienceEvent