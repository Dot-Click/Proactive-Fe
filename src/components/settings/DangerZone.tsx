import { toast } from "sonner"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"


const DangerZone = () => {

    const HandleDelete = () => {
        toast.success("Account has been Deleted.")
    }
    return (
        <div>
            <div className="bg-[#FFE9E9] rounded-tl-[20px] rounded-tr-[20px] border border-[#D9D9D9]">
                <h1 className="text-[#FF0000] font-bold text-[28px] sm:text-[20px] px-4 py-6">
                    Danger Zone
                </h1>
            </div>

            <div className="bg-[#FFE9E9] border border-[#D9D9D9] px-7 py-6 rounded-bl-[20px] rounded-br-[20px]">
                <div className="flex flex-wrap gap-5 items-center justify-between">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Delete Account</span>
                            <span className="text-[#666373] text-[14px]">Permanently delete your account and all data</span>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button className="px-8 py-5 rounded-full font-semibold cursor-pointer w-fit bg-[#FF0000] hover:bg-[#f50707] text-[#FFFFFF]">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                                <DialogFooter className="mt-6">
                                    <DialogClose className="flex justify-end gap-4">
                                        <Button variant="outline" className="cursor-pointer">Cancel</Button>
                                        <Button onClick={HandleDelete} type="submit" variant={'destructive'} className="cursor-pointer">Yes</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default DangerZone