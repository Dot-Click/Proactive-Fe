import JoinOurStory from "@/components/userSide/Benefits/JoinOurStory"
import GetInTouch from "@/components/userSide/Contact/GetInTouch"

const ContactPage = () => {
    return (
        <div className="flex flex-col gap-10 md:gap-20 mb-20">
            <GetInTouch />
            <JoinOurStory />
        </div>
    )
}

export default ContactPage