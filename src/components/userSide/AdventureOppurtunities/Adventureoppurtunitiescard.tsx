import adventureoppurunities1 from "../../../assets/adventureoppurtunities1.png"
import adventureoppurunities2 from "../../../assets/adventureoppurtunities2.png"
import adventureoppurunities3 from "../../../assets/adventureoppurtunities3.png"

const Adventureoppurtunitiescard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5">
            <img src={adventureoppurunities1} alt="adventureoppurunities1" className="h-100 w-full lg:w-1/3"/>
            <img src={adventureoppurunities2} alt="adventureoppurunities2" className="h-100 w-full lg:w-1/3"/>
            <img src={adventureoppurunities3} alt="adventureoppurunities3" className="h-100 w-full lg:w-1/3"/>
        </div>
    )
}

export default Adventureoppurtunitiescard