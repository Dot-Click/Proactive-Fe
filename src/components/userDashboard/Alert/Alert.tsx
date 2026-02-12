import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IoInformationCircle } from "react-icons/io5";
import PaymentModal from "./PaymentModal";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";

const AlertError = () => {
    const { data } = UsegetCurrentUser();
    const membershipAvailable = data?.data?.user?.membershipAvailable
    return (
        <>
            {
                membershipAvailable ? null : (
                    <Alert className="bg-[#E3F2FD] border border-[#2196F3] py-4">
                        <IoInformationCircle color="#2196F3" size={20} />
                        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                            <div className="">
                                <AlertTitle className="mb-1 text-[16px] text-[#1976D2]">Membership</AlertTitle>
                                <AlertDescription className="-ml-7">
                                    <p className="text-[#424242]">Join free by participating in ProActive activities for the next 365 days OR get instant access for €50</p>
                                </AlertDescription>
                            </div>
                            <Dialog>
                                <DialogTrigger>
                                    <Button className="rounded-full px-8 py-6 cursor-pointer bg-[#424242] hover:bg-[#616161] text-white">Join for €50</Button>
                                </DialogTrigger>
                                <PaymentModal />
                            </Dialog>
                        </div>
                    </Alert>
                )
            }
        </>
    )
}

export default AlertError
