import CategoriesDistribution from "@/components/coordinator/Dashboard/CategoriesDistribution"
import CoordinatorStates from "@/components/coordinator/Dashboard/CoordinatorStates"
import Header from "@/components/coordinator/Dashboard/Header"

const CoordinatorDashboard = () => {
  return (
    <div>
      <Header/>
      <div className="mt-3">
      <CoordinatorStates/>
      </div>
      <div className="mt-3">
        <CategoriesDistribution/>
      </div>
    </div>
  )
}

export default CoordinatorDashboard