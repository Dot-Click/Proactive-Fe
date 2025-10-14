import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const Included = () => {
  return (
    <div className="mb-20">
      <div className="flex justify-between items-center mt-6">
        <span className="text-[#108700] font-medium">What’s Included</span>
          <Button className="text-[#666373] rounded-full border border-[#666373] w-30 py-5 cursor-pointer" variant={'outline'}>
          <Plus/>
          Add Item
        </Button>
      </div>
      <div className="flex justify-between items-center mt-6">
        <span className="text-[#D40004] font-medium">What’s Not Included</span>
          <Button className="text-[#666373] rounded-full border border-[#666373] w-30 py-5 cursor-pointer" variant={'outline'}>
          <Plus/>
          Add Item
        </Button>
      </div>
    </div>
  )
}

export default Included