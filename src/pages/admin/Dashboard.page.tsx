import AdminStates from "@/components/admin/Dashboard/adminStates"
import Banner from "@/components/admin/Dashboard/Banner"
import { Chart } from "@/components/admin/Dashboard/Chart"
import Recentactivity from "@/components/admin/Dashboard/Recentactivity"
import Tripcategories from "@/components/admin/Dashboard/Tripcategories"
import { Calendar } from "@/components/ui/calendar"

const DashboardPage = () => {
  return (
    <>
      <div className="flex gap-2">
        <Banner />
        <Tripcategories />
      <div>
        <Calendar
          mode="range"
          className="rounded-[25px] mt-2 shadow-sm"
        />
      </div>
      </div>

      <div>
        <AdminStates />
        <div className="flex gap-2">
        <Chart />
        <Recentactivity />
        </div>
      </div>

    </>
  )
}

export default DashboardPage