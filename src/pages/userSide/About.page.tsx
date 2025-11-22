import Aboutvideo from "@/components/userSide/About/Aboutvideo/Aboutvideo"
import ConnectingPeople from "@/components/userSide/About/ConnectingPeople/ConnectingPeople"
import Geeks from "@/components/userSide/About/Geeks/Geeks"
import OurCollaboration from "@/components/userSide/About/OurCollboration/OurCollaboration"
import Ourjourney from "@/components/userSide/About/Ourjourney/Ourjourney"
import OurMission from "@/components/userSide/About/OurMission/OurMission"
import OurValues from "@/components/userSide/About/OurValues/OurValues"
import Part from "@/components/userSide/About/Part/Part"
import JoinOurStory from "@/components/userSide/Benefits/JoinOurStory"

const AboutPage = () => {
  return (
    <div>
        <OurMission/>
        <ConnectingPeople/>
        <Aboutvideo/>
        <Geeks/>
        <OurValues/>
        <Part/>
        <OurCollaboration/>
        <Ourjourney/>
        <JoinOurStory/>
    </div>
  )
}

export default AboutPage