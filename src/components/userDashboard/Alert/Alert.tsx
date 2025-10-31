import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IoAlertCircle } from "react-icons/io5";
import PaymentModal from "./PaymentModal";

const AlertError = () => {
    return (
        <>
            <Alert variant="destructive" className="bg-[#AC0D0D]/8 border border-[#E00000] py-4">
                <IoAlertCircle color="#E00000" size={20} />
                <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                    <div className="">
                        <AlertTitle className="mb-1 text-[16px]">Membership</AlertTitle>
                        <AlertDescription className="-ml-7">
                            <p className="text-[#000000]">Join free by participating in ProActive activities for the next 365 days OR get instant access for €50</p>
                        </AlertDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button className="rounded-full px-8 py-6 cursor-pointer">Join for €50</Button>
                        </DialogTrigger>
                        <PaymentModal />
                    </Dialog>
                </div>
            </Alert>
        </>
    )
}

export default AlertError