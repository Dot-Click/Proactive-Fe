import { Button } from "@/components/ui/button"
import openoppurtunitiesbg from "../../../assets/openoppurtunitiesbg.png"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import PaymentModal from "@/components/userDashboard/Alert/PaymentModal"
const MemberToday = () => {
    return (
        <div className="relative w-full">
            <img
                src={openoppurtunitiesbg}
                alt="openoppurtunitiesbg"
                className="w-full h-[400px] sm:h-[500px] md:h-[300px] object-cover"
            />

            <div className="flex flex-col justify-center gap-2 absolute inset-0 px-4">
                <h1 className="text-center bg-linear-to-r from-[#F7ECBE] to-[#F7ECBE] lg:text-4xl md:text-3xl sm:text-2xl text-transparent bg-clip-text font-bold">
                    Become a Member Today
                </h1>
                <p className="text-center text-[#FFFFFF] text-sm md:text-base lg:text-lg">
                    Get exclusive access to all Wild Weekends, Wild Trips, and events. Membership is valid for <br /> 365 days from the day of payment</p>
                <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
                    <Dialog>
                        <DialogTrigger>
                            <Button className="font-bold hover:scale-105 transition-all duration-300 bg-[#FFFFFF] hover:bg-[#f7f1f1] cursor-pointer text-[#03664F] rounded-full px-6 py-5">
                                Pay €50 & Join Now
                            </Button>
                        </DialogTrigger>
                        <PaymentModal />
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default MemberToday