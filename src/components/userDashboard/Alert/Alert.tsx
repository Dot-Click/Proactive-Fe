import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IoInformationCircle } from "react-icons/io5";
import PaymentModal from "./PaymentModal";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";
import { useTranslation } from "react-i18next";

const AlertError = () => {
    const { t } = useTranslation();
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
                                <AlertTitle className="mb-1 text-[16px] text-[#1976D2]">{t("dashboard.membership")}</AlertTitle>
                                <AlertDescription className="-ml-7">
                                    <p className="text-[#424242]">{t("dashboard.membershipAlert")}</p>
                                </AlertDescription>
                            </div>
                            <Dialog>
                                <DialogTrigger>
                                    <Button className="rounded-full px-8 py-6 cursor-pointer bg-[#424242] hover:bg-[#616161] text-white">{t("dashboard.joinFor")}</Button>
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
