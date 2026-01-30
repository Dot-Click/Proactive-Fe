import zigzag from "../../../assets/zigzag.png"
import zigzagbottom from "../../../assets/zigzagbottom.png"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
// import { useState } from "react"
// import MessageCoordinator from "./MessageCoordinator"

interface CoordinatordetailProps {
    trip?: any
}

const Coordinatordetail = ({ trip }: CoordinatordetailProps) => {
    // const [selectedCoordinator, setSelectedCoordinator] = useState<any>(null)
    // const [isMessageOpen, setIsMessageOpen] = useState(false)

    // Extract coordinators from trip data - check multiple possible paths
    const tripData = trip?.trip?.[0] || trip?.trip || trip;
    const coordinators = tripData?.coordinators || 
        (tripData?.coordinator ? [tripData.coordinator] : []) || 
        [];

    // Filter out null/undefined coordinators and ensure we have valid data
    const displayCoordinators = Array.isArray(coordinators) 
        ? coordinators.filter((coord: any) => coord && (coord.fullName || coord.CoordinatorName || coord.id || coord._id))
        : [];

    // const handleMessageClick = (coordinator: any) => {
    //     // Ensure coordinator object has id for MessageCoordinator component
    //     const coordinatorWithId = {
    //         ...coordinator,
    //         id: coordinator.id || coordinator._id || coordinator.coordinatorId
    //     }
    //     setSelectedCoordinator(coordinatorWithId)
    //     setIsMessageOpen(true)
    // }

    if (displayCoordinators.length === 0) {
        return null
    }

    return (
        <>
            <img src={zigzag} alt="zigzag" className="py-4" />
            <div className="px-4 sm:px-16 py-6">
                <h4 className="text-[#000000] font-bold text-lg">Coordinators</h4>
                <div className="grid lg:grid-cols-2 gap-4 py-4">
                    {displayCoordinators.map((coordinator: any, index: number) => {
                        const coordinatorName = coordinator.fullName || coordinator.CoordinatorName || "Coordinator"
                        const coordinatorEmail = coordinator.email || coordinator.CoordinatorEmail || ""
                        const coordinatorImage = coordinator.profilePicture || coordinator.CoordinatorPhoto || "https://github.com/shadcn.png"
                        const coordinatorBio = coordinator.bio || coordinator.CoordinatorBio || "No bio available."
                        // const coordinatorId = coordinator.id || coordinator._id

                        return (
                            <div key={index} className="border border-[#C1C1C1] bg-[#F9F9F9] rounded-[10px] px-3 py-5">
                                <div className="flex items-center gap-2">
                                    <Avatar className="lg:w-16 lg:h-16 mr-2">
                                        <AvatarImage src={coordinatorImage} alt={coordinatorName} />
                                        <AvatarFallback>{coordinatorName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h4 className="text-[#141E20] font-semibold">{coordinatorName}</h4>
                                        {coordinatorEmail && (
                                            <span className="text-[#332A2A] text-sm">{coordinatorEmail}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-6 flex flex-col gap-3">
                                    <h4 className="text-[#332A2A] font-semibold text-sm">About Coordinator</h4>
                                    <span className="text-[#332A2A] text-[12px]">{coordinatorBio}</span>
                                </div>
                                {/* <div className="pt-4">
                                    <Button
                                        onClick={() => handleMessageClick(coordinator)}
                                        disabled={!coordinatorId}
                                        className="cursor-pointer w-full bg-[#0DAC87] hover:bg-[#0DAC87]/90 text-white font-semibold rounded-lg py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Message Coordinator
                                    </Button>
                                </div> */}
                            </div>
                        )
                    })}
                </div>
            </div>
            <img src={zigzagbottom} alt="zigzagbottom" className="py-4" />

            {/* {selectedCoordinator && (
                <MessageCoordinator
                    coordinator={selectedCoordinator}
                    tripId={tripData?.id || tripData?._id || trip?.id || trip?._id}
                    tripTitle={tripData?.title || trip?.title}
                    open={isMessageOpen}
                    onOpenChange={setIsMessageOpen}
                />
            )} */}
        </>
    )
}

export default Coordinatordetail