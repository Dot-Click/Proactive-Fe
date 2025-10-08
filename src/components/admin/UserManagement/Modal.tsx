import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const Modal = () => {
    return (
        <div>
            <DialogContent className="sm:max-w-[425px] border-[6px] border-[#E3E3E3] rounded-[20px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[24px]">User Detail</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                        <span className="text-[12px]">Alex John</span>
                        <span className="text-[10px]">Alex@gmail.com</span>
                        <span className="text-[12px]">GOLD MEMBER</span>
                        </div>
                    </div>
                    <div className="grid gap-3">
                    </div>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </div>
    )
}

export default Modal