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
      <div className="flex lg:flex-row flex-col gap-2 min-h-[40vh]">
        <Banner />
        <Tripcategories />
        <div className="lg:mt-3 lg:mb-0.5 flex items-center justify-center mt-1 bg-white rounded-[25px] lg:w-[300px] w-full">
          <Calendar
            mode="range"
            defaultMonth={date}
            className="lg:w-[280px] px-6"
          />
        </div>
      </div>

      <div className="w-full">
        <AdminStates />
      </div>

      <div className="flex lg:flex-row flex-col gap-2 w-full">
        <div className="lg:flex-[2.5] lg:min-w-0">
          <Chart />
        </div>
        <div className="lg:flex-[1] lg:min-w-[320px]">
          <Recentactivity />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage