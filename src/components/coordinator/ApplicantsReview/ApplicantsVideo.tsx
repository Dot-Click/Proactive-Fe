import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import intro from "../../../assets/Intro.mp4"

const ApplicantsVideo = ({video}: {video: string}) => {
    return (
        <div>
            <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[24px]">Introduction Video</DialogTitle>
                </DialogHeader>
                <video controls className="w-full lg:h-100">
                    <source src={video}/>
                </video>
            </DialogContent>
        </div>
    )
}

export default ApplicantsVideo