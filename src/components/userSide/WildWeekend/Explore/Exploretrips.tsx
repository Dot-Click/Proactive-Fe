import Explorecard from "./Explorecard"
import { useTranslation } from "react-i18next"

const Exploretrips = () => {
  const { t } = useTranslation();
  return (
    <div className="">
        <h1 className="lg:text-4xl bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text text-center font-bold py-10 lg:py-20" dangerouslySetInnerHTML={{ __html: t('wildWeekend.exploreTrips.title').replace(/\n/g, '<br />') }} />
        <div >
            <Explorecard/>
        </div>
    </div>
  )
}

export default Exploretrips