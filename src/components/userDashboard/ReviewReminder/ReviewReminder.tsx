import { Button } from "@/components/ui/button"
import Review from "../../../assets/Review.png"
const ReviewReminder = () => {
  return (
    <div className="border border-[#D9D9D9] bg-[#FAFAFA] rounded-[15px] flex flex-col ">
      <div className="px-4 py-3">
        <span className="font-bold text-[18px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Review Reminder</span>
        <div className="mt-4 flex gap-2">
          <img src={Review} alt="Review" className="h-20 w-20"/>
          <div className="flex flex-col gap-1">
            <span className="text-[#221E33] font-bold text-[13px] text-nowrap">Prague Cultural Exchange</span>
            <span className="text-[#666373] text-[12px]">Jan 10-20, 2024</span>
          </div>
        </div>
        <div className="flex -mt-[36px] justify-end">
          <Button className="text-xs px-3 bg-[#0DAC87] hover:bg-[#0fa381] cursor-pointer rounded-full font-semibold">Write Review</Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewReminder