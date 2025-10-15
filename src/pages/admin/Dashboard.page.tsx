import AdminStates from "@/components/admin/Dashboard/adminStates"
import Banner from "@/components/admin/Dashboard/Banner"
import { Chart } from "@/components/admin/Dashboard/Chart"
import Recentactivity from "@/components/admin/Dashboard/Recentactivity"
import Tripcategories from "@/components/admin/Dashboard/Tripcategories"
import { Calendar } from "@/components/ui/calendar"

const DashboardPage = () => {
  const date = new Date(2026, 1, 1)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex lg:flex-row md:flex-col gap-2 min-h-[40vh]">
        <Banner />
        <Tripcategories />
        <div className="flex justify-center mt-2 bg-white lg:px-2 lg:py-2 rounded-[25px]">
          <Calendar
            mode="range"
            defaultMonth={date}
          />
        </div>
      </div>

      <div className="w-full">
        <AdminStates />
      </div>
      <div className="flex lg:flex-row flex-col gap-2 w-full">
        <Chart />
        <Recentactivity />
      </div>

    </div>
  )
}

export default DashboardPage