import Alltripstable from "@/components/coordinator/Dashboard/Alltripstable"
import CategoriesDistribution from "@/components/coordinator/Dashboard/CategoriesDistribution"
import CoordinatorStates from "@/components/coordinator/Dashboard/CoordinatorStates"
import Header from "@/components/coordinator/Dashboard/Header"
import Recentactivity from "@/components/coordinator/Dashboard/Recentactivity"

const CoordinatorDashboard = () => {
  return (
    <div>
      <Header />
      <div className="mt-3">
        <CoordinatorStates />
      </div>
      <div className="mt-3">
        <CategoriesDistribution />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 mt-1">
        <div className="flex-1 min-w-0">
          <Alltripstable />
        </div>
        <div className="w-full lg:w-[360px]">
          <Recentactivity />
        </div>
      </div>
    </div>
  )
}

export default CoordinatorDashboard