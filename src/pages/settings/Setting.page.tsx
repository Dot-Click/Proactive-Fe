import DangerZone from "@/components/settings/DangerZone"
import Header from "@/components/settings/header"
import Personalinformation from "@/components/settings/personalinformation"
import Securityprivacy from "@/components/settings/securityprivacy"
// import Travelpreference from "@/components/settings/Travelpreference"
import Userprofile from "@/components/settings/userprofile"

const UserSettingPage = () => {
  return (
    <div>
        <Header/>
        <div className="px-4 sm:px-16 flex lg:flex-row flex-col gap-4 py-2">
        <Userprofile/>
        <div className="flex-1 flex flex-col gap-5 mb-8">
        <Personalinformation/>
        {/* <Travelpreference/> */}
        <Securityprivacy/>
        <DangerZone/>
        </div>
        </div>
    </div>
  )
}

export default UserSettingPage