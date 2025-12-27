import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import TableHeader from "@/Table/TableHeader"
import { Star } from "lucide-react"
import Coordinatordetailmodal from "./Coordinatordetailmodal"
import { UsegetCoordinator, type Coordinator } from "@/hooks/getCoordinatorhook"


// const CoordinatorData = [
//     {
//         name: 'Pavel Novak',
//         email: 'pavel.n@email.com',
//         rating: '4.5 (23)',
//         tripNumber: '3',
//         revenue: '€12,850',
//         repeatCustomer: '95%',
//         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
//         location: 'Barcelona, Spain',
//         experience: '3 years',
//         successRate: '98 %',
//         lastActive: '1 hour ago'
//     },
//     {
//         name: 'Pavel Novak',
//         email: 'pavel.n@email.com',
//         rating: '4.5 (23)',
//         tripNumber: '3',
//         revenue: '€12,850',
//         repeatCustomer: '95%',
//         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
//         location: 'Barcelona, Spain',
//         experience: '3 years',
//         successRate: '98 %',
//         lastActive: '1 hour ago'
//     },
//     {
//         name: 'Pavel Novak',
//         email: 'pavel.n@email.com',
//         rating: '4.5 (23)',
//         tripNumber: '3',
//         revenue: '€12,850',
//         repeatCustomer: '95%',
//         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
//         location: 'Barcelona, Spain',
//         experience: '3 years',
//         successRate: '98 %',
//         lastActive: '1 hour ago'
//     },
//     {
//         name: 'Pavel Novak',
//         email: 'pavel.n@email.com',
//         rating: '4.5 (23)',
//         tripNumber: '3',
//         revenue: '€12,850',
//         repeatCustomer: '95%',
//         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
//         location: 'Barcelona, Spain',
//         experience: '3 years',
//         successRate: '98 %',
//         lastActive: '1 hour ago'
//     },
//     {
//         name: 'Pavel Novak',
//         email: 'pavel.n@email.com',
//         rating: '4.5 (23)',
//         tripNumber: '3',
//         revenue: '€12,850',
//         repeatCustomer: '95%',
//         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
//         location: 'Barcelona, Spain',
//         experience: '3 years',
//         successRate: '98 %',
//         lastActive: '1 hour ago'
//     },
//     {
//         name: 'Pavel Novak',
//         email: 'pavel.n@email.com',
//         rating: '4.5 (23)',
//         tripNumber: '3',
//         revenue: '€12,850',
//         repeatCustomer: '95%',
//         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
//         location: 'Barcelona, Spain',
//         experience: '3 years',
//         successRate: '98 %',
//         lastActive: '1 hour ago'
//     },
// ]

const Coordinatorinfo = () => {
const {data, isLoading, isError} = UsegetCoordinator()
    return (
        <>

        <div>
            <TableHeader
                showSearch
                showFilter
                showSort
                addButtonLabel="Add Coordinator"
                searchPlaceholder="Search Coordinators"
                showAddButton
                url="/dashboard/add-new-coordinator"
            />    
            {
                isLoading && <p>Loading...</p>
            }
            {
                isError && <p>Something went wrong</p>
            }        
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-3">
                {data?.coordinators?.map((user: Coordinator, i: number) => (
                    <div
                        key={i}
                        className="bg-white border border-[#E0E1E2] px-4 py-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {/* Top Section */}
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start items-center mt-2">
                            <div className="flex flex-col lg:flex-row gap-3 items-center">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={user.profilePicture} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-center lg:items-start justify-center">
                                    <span className="text-[#221E33] font-semibold text-[16px]">{user.fullName}</span>
                                    <span className="text-[#666373] text-[14px]">{user.email}</span>
                                    <span className="flex flex-wrap items-center gap-1 text-[#666373] text-[14px]">
                                        <Star fill="#FDBF08" color="#FDBF08" size={16} />
                                        <span className="text-[#D9D9D9]">•</span>
                                         trips led 3
                                    </span>
                                </div>
                            </div>
                            <Badge className="bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] rounded-full px-3 py-[2px] mt-2 lg:mt-0 text-[12px] font-medium">
                                Active
                            </Badge>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                            <div className="bg-[#FAFAFE] flex flex-col items-center justify-center py-3 rounded-[12px]">
                                <span className="font-semibold text-[15px]">0</span>
                                <span className="text-[#666373] text-[12px] text-nowrap">Active Trips</span>
                            </div>
                            <div className="bg-[#FAFAFE] flex flex-col items-center justify-center py-3 rounded-[12px]">
                                <span className="font-semibold text-[15px]">23</span>
                                <span className="text-[#666373] text-[12px] text-nowrap">Revenue</span>
                            </div>
                            <div className="bg-[#FAFAFE] flex flex-col items-center justify-center py-3 rounded-[12px]">
                                <span className="font-semibold text-[15px]">4</span>
                                <span className="text-[#666373] text-[12px] text-nowrap">Repeat Customers</span>
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-col mt-4 text-[#221E33] font-semibold">
                            <span>Specialties:</span>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                {user.specialities.map((speciality, i) => (
                                    <div
                                        key={i}
                                        className="bg-[#F5F5F5] rounded-[8px] px-3 py-1.5 text-[12px] text-[#727272]"
                                    >
                                        {speciality}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[#221E33] font-semibold text-[14px]">Location:</span>
                                <span className="text-[#727272] text-[12px]">{user.location || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#221E33] font-semibold text-[14px]">Experience:</span>
                                <span className="text-[#727272] text-[14px]">{user.yearsOfExperience || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#221E33] font-semibold text-[14px]">Success Rate:</span>
                                <span className="text-[#727272] text-[12px]">N/A</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#221E33] font-semibold text-[14px]">Last Active:</span>
                                <span className="text-[#727272] text-[12px]">N/A</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 grid lg:grid-cols-2 gap-3">
                            <div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="cursor-pointer w-full h-11 rounded-full bg-[#0C0C0C] text-white font-semibold text-[14px] hover:bg-[#1a1a1a] transition">
                                            View Detail
                                        </Button>
                                    </DialogTrigger>
                                    <Coordinatordetailmodal />
                                </Dialog>
                            </div>

                            <div>
                            <Button
                                variant="outline"
                                    className="cursor-pointer w-full h-11 rounded-full border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000] font-semibold text-[14px] hover:bg-[#FFF0F0]"
                            >
                                Block
                            </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        </>
    )
}

export default Coordinatorinfo