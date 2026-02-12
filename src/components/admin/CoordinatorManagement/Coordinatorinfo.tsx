// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogTrigger } from "@/components/ui/dialog"
// import TableHeader from "@/Table/TableHeader"
// import { LoaderIcon, Star } from "lucide-react"
// import Coordinatordetailmodal from "./Coordinatordetailmodal"
// import { UsegetCoordinator, type Coordinator } from "@/hooks/getCoordinatorhook"
// import { useState } from "react"
// import { UseupdateCoordinatorStatus } from "@/hooks/updatecoordinatorstatushook"
// import { UseSearchCoordinators } from "@/hooks/searchCoordinatorhook"
// import { toast } from "sonner"


// // const CoordinatorData = [
// //     {
// //         name: 'Pavel Novak',
// //         email: 'pavel.n@email.com',
// //         rating: '4.5 (23)',
// //         tripNumber: '3',
// //         revenue: '€12,850',
// //         repeatCustomer: '95%',
// //         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
// //         location: 'Barcelona, Spain',
// //         experience: '3 years',
// //         successRate: '98 %',
// //         lastActive: '1 hour ago'
// //     },
// //     {
// //         name: 'Pavel Novak',
// //         email: 'pavel.n@email.com',
// //         rating: '4.5 (23)',
// //         tripNumber: '3',
// //         revenue: '€12,850',
// //         repeatCustomer: '95%',
// //         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
// //         location: 'Barcelona, Spain',
// //         experience: '3 years',
// //         successRate: '98 %',
// //         lastActive: '1 hour ago'
// //     },
// //     {
// //         name: 'Pavel Novak',
// //         email: 'pavel.n@email.com',
// //         rating: '4.5 (23)',
// //         tripNumber: '3',
// //         revenue: '€12,850',
// //         repeatCustomer: '95%',
// //         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
// //         location: 'Barcelona, Spain',
// //         experience: '3 years',
// //         successRate: '98 %',
// //         lastActive: '1 hour ago'
// //     },
// //     {
// //         name: 'Pavel Novak',
// //         email: 'pavel.n@email.com',
// //         rating: '4.5 (23)',
// //         tripNumber: '3',
// //         revenue: '€12,850',
// //         repeatCustomer: '95%',
// //         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
// //         location: 'Barcelona, Spain',
// //         experience: '3 years',
// //         successRate: '98 %',
// //         lastActive: '1 hour ago'
// //     },
// //     {
// //         name: 'Pavel Novak',
// //         email: 'pavel.n@email.com',
// //         rating: '4.5 (23)',
// //         tripNumber: '3',
// //         revenue: '€12,850',
// //         repeatCustomer: '95%',
// //         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
// //         location: 'Barcelona, Spain',
// //         experience: '3 years',
// //         successRate: '98 %',
// //         lastActive: '1 hour ago'
// //     },
// //     {
// //         name: 'Pavel Novak',
// //         email: 'pavel.n@email.com',
// //         rating: '4.5 (23)',
// //         tripNumber: '3',
// //         revenue: '€12,850',
// //         repeatCustomer: '95%',
// //         specialities: ['Cultural Tours', 'Adventure Travel', 'Wildlife'],
// //         location: 'Barcelona, Spain',
// //         experience: '3 years',
// //         successRate: '98 %',
// //         lastActive: '1 hour ago'
// //     },
// // ]

// const Coordinatorinfo = () => {
//     const { data, isLoading, isError } = UsegetCoordinator();
//     const { mutateAsync } = UseupdateCoordinatorStatus();
//     const [selectedId, setSelectedId] = useState<string | null>(null);
//     const [open, setOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const { data: searchResults, isLoading: searchLoading } = UseSearchCoordinators(searchQuery);
    
//     // Use search results if query exists, otherwise use all coordinators
//     const displayData = searchQuery ? searchResults : data?.coordinators || [];
//     const displayLoading = searchQuery ? searchLoading : isLoading;
//     if (isError) {
//         return <div>Error loading membership data.</div>;
//     }
//     if (isLoading) {
//         return (
//             <div className="w-full flex items-center justify-center py-10">
//                 <LoaderIcon className="animate-spin" />
//             </div>
//         )
//     }

//     const HandleBlockCoordinator = async (id: string) => {
//         try {
//             await mutateAsync({ id });
//         } catch (error) {
//             toast.error('Failed to block Coordinator')
//         }
//     }
//     return (
//         <>
//             <div>
//                 <TableHeader
//                     showSearch
//                     showFilter
//                     showSort
//                     addButtonLabel="Add Coordinator"
//                     searchPlaceholder="Search Coordinators"
//                     showAddButton
//                     url="/dashboard/add-new-coordinator"
//                     onSearch={setSearchQuery}
//                 />
//                 <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-3">
//                     {displayLoading && (
//                         <div className="w-full flex items-center justify-center py-10">
//                             <LoaderIcon className="animate-spin" />
//                         </div>
//                     )}
//                     {!displayLoading && displayData?.length === 0 ? (
//                         <div className="bg-white border border-[#E0E1E2] px-4 py-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300">
//                             <span className="text-[#221E33] font-semibold text-[16px]">No Coordinators Found</span>
//                         </div>
//                     ) : !displayLoading && displayData?.map((user: Coordinator, i: number) => (
//                         <div
//                             key={i}
//                             className="bg-white border border-[#E0E1E2] px-4 py-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                             {/* Top Section */}
//                             <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start items-center mt-2">
//                                 <div className="flex flex-col lg:flex-row gap-3 items-center">
//                                     <Avatar className="h-16 w-16">
//                                         <AvatarImage src={user.profilePicture} alt="@shadcn" />
//                                         <AvatarFallback>CN</AvatarFallback>
//                                     </Avatar>
//                                     <div className="flex flex-col items-center lg:items-start justify-center">
//                                         <span className="text-[#221E33] font-semibold text-[16px]">{user.fullName}</span>
//                                         <span className="text-[#666373] text-[14px]">{user.email}</span>
//                                         <span className="flex flex-wrap items-center gap-1 text-[#666373] text-[14px]">
//                                             <Star fill="#FDBF08" color="#FDBF08" size={16} />
//                                             <span className="text-[#D9D9D9]">•</span>
//                                             trips led 3
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <Badge className="bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] rounded-full px-3 py-0.5 mt-2 lg:mt-0 text-[12px] font-medium">
//                                     Active
//                                 </Badge>
//                             </div>

//                             {/* Stats Section */}
//                             <div className="grid grid-cols-3 gap-3 mt-6">
//                                 <div className="bg-[#FAFAFE] flex flex-col items-center justify-center py-3 rounded-[12px]">
//                                     <span className="font-semibold text-[15px]">0</span>
//                                     <span className="text-[#666373] text-[12px] text-nowrap">Active Trips</span>
//                                 </div>
//                                 <div className="bg-[#FAFAFE] flex flex-col items-center justify-center py-3 rounded-[12px]">
//                                     <span className="font-semibold text-[15px]">23</span>
//                                     <span className="text-[#666373] text-[12px] text-nowrap">Revenue</span>
//                                 </div>
//                                 <div className="bg-[#FAFAFE] flex flex-col items-center justify-center py-3 rounded-[12px]">
//                                     <span className="font-semibold text-[15px]">4</span>
//                                     <span className="text-[#666373] text-[12px] text-nowrap">Repeat Customers</span>
//                                 </div>
//                             </div>

//                             {/* Specialties */}
//                             <div className="flex flex-col mt-4 text-[#221E33] font-semibold">
//                                 <span>Specialties:</span>
//                                 <div className="flex flex-wrap items-center gap-2 mt-2">
//                                     {user.specialities.map((speciality, i) => (
//                                         <div
//                                             key={i}
//                                             className="bg-[#F5F5F5] rounded-xl px-3 py-1.5 text-[12px] text-[#727272]"
//                                         >
//                                             {speciality}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Details */}
//                             <div className="grid grid-cols-2 gap-2 mt-4">
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-[#221E33] font-semibold text-[14px] text-nowrap">Location:</span>
//                                     <span className="text-[#727272] text-[12px] text-nowrap line-clamp-3">{user.location || "N/A"}</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-[#221E33] font-semibold text-[14px]">Experience:</span>
//                                     <span className="text-[#727272] text-[14px]">{user.yearsOfExperience || "N/A"}</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-[#221E33] font-semibold text-[14px]">Success Rate:</span>
//                                     <span className="text-[#727272] text-[12px]">N/A</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-[#221E33] font-semibold text-[14px]">Last Active:</span>
//                                     <span className="text-[#727272] text-[12px]">N/A</span>
//                                 </div>
//                             </div>

//                             {/* Buttons */}
//                             <div className="mt-6 grid lg:grid-cols-2 gap-3">
//                                 <div>
//                                     <Dialog open={open} onOpenChange={setOpen}>
//                                         <DialogTrigger asChild>
//                                             <Button
//                                                 onClick={() => { setSelectedId(user.id); setOpen(true); }}
//                                                 className="cursor-pointer w-full h-11 rounded-full bg-[#0C0C0C] text-white font-semibold text-[14px] hover:bg-[#1a1a1a] transition">
//                                                 View Detail
//                                             </Button>
//                                         </DialogTrigger>
//                                         {
//                                             selectedId &&
//                                             <Coordinatordetailmodal 
//                                             coordinatorId={selectedId} 
//                                             role="admin"
//                                             />
//                                         }
//                                     </Dialog>
//                                 </div>

//                                 <div>
//                                     <Button
//                                         onClick={() => HandleBlockCoordinator(user.id)}
//                                         variant="outline"
//                                         className="cursor-pointer w-full h-11 rounded-full border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000] font-semibold text-[14px] hover:bg-[#FFF0F0]"
//                                     >
//                                         {user.isActive ? "Block" : "Unblock"}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Coordinatorinfo


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import TableHeader from "@/Table/TableHeader"
import { LoaderIcon, Star } from "lucide-react"
import Coordinatordetailmodal from "./Coordinatordetailmodal"
import { UsegetCoordinator, type Coordinator } from "@/hooks/getCoordinatorhook"
import { useState } from "react"
import { UseupdateCoordinatorStatus } from "@/hooks/updatecoordinatorstatushook"
import { UseSearchCoordinators } from "@/hooks/searchCoordinatorhook"
import { toast } from "sonner"

const Coordinatorinfo = () => {
    // 1. Fetch Hooks
    const { data: allData, isLoading: isAllLoading, isError } = UsegetCoordinator();
    const [searchQuery, setSearchQuery] = useState("");
    const { data: searchResults, isLoading: isSearchLoading } = UseSearchCoordinators(searchQuery);
    
    const { mutateAsync } = UseupdateCoordinatorStatus();
    
    // 2. States
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // 3. Logic: Determine which data to show
    const isSearching = searchQuery.trim().length >= 2;
    const allDisplayData = isSearching ? searchResults : (allData?.coordinators || []);
    const displayLoading = isSearching ? isSearchLoading : isAllLoading;

    // 4. Pagination Logic
    const totalItems = allDisplayData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayData = allDisplayData.slice(startIndex, endIndex);

    // Reset to page 1 when search query or items per page changes
    const handleLimitChange = (limit: number) => {
        setItemsPerPage(limit);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const HandleBlockCoordinator = async (id: string) => {
        try {
            await mutateAsync({ id });
            toast.success("Status updated successfully");
        } catch (error) {
            toast.error('Failed to update coordinator status');
        }
    };

    if (isError) {
        return <div className="p-10 text-center text-red-500">Error loading membership data.</div>;
    }

    return (
        <>
            <div>
                <TableHeader
                    showSearch
                    showFilter
                    showSort
                    addButtonLabel="Add Coordinator"
                    searchPlaceholder="Search by name or email..."
                    showAddButton
                    url="/dashboard/add-new-coordinator"
                    onSearch={(val) => {
                        setSearchQuery(val);
                        setCurrentPage(1); // Reset to page 1 on search
                    }}
                    limit={itemsPerPage}
                    defaultLimit={10}
                    limitOptions={[5, 10, 20, 30, 50]}
                    onLimitChange={handleLimitChange}
                />

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-3">
                    {displayLoading ? (
                        // Loader shown during initial load or during search
                        <div className="col-span-full flex items-center justify-center py-20">
                            <LoaderIcon className="animate-spin h-10 w-10 text-gray-400" />
                        </div>
                    ) : allDisplayData.length === 0 ? (
                        // No results state
                        <div className="col-span-full bg-white border border-[#E0E1E2] px-4 py-16 rounded-[20px] text-center shadow-sm">
                            <span className="text-[#666373] font-semibold text-[16px]">
                                {isSearching ? `No coordinators found matching "${searchQuery}"` : "No coordinators available."}
                            </span>
                        </div>
                    ) : (
                        // Data List
                        displayData.map((user: Coordinator) => (
                            <div
                                key={user.id}
                                className="bg-white border border-[#E0E1E2] px-4 py-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Top Section */}
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start items-center mt-2">
                                    <div className="flex flex-col lg:flex-row gap-3 items-center">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={user.profilePicture} alt={user.fullName} />
                                            <AvatarFallback>{user.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
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
                                    <Badge className={user.isActive 
                                        ? "bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] rounded-full px-3 py-0.5 mt-2 lg:mt-0 text-[12px] font-medium"
                                        : "bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-0.5 mt-2 lg:mt-0 text-[12px] font-medium"
                                    }>
                                        {user.isActive ? "Active" : "Blocked"}
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
                                        {user.specialities?.length > 0 ? user.specialities.map((speciality, i) => (
                                            <div
                                                key={i}
                                                className="bg-[#F5F5F5] rounded-xl px-3 py-1.5 text-[12px] text-[#727272]"
                                            >
                                                {speciality}
                                            </div>
                                        )) : <span className="text-[12px] font-normal text-gray-400">No specialties</span>}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#221E33] font-semibold text-[14px] text-nowrap">Location:</span>
                                        <span className="text-[#727272] text-[12px] truncate">{user.location || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#221E33] font-semibold text-[14px]">Exp:</span>
                                        <span className="text-[#727272] text-[14px]">{user.yearsOfExperience || "0"} yrs</span>
                                    </div>
                                </div>

                                {/* Spacer to push buttons to bottom */}
                                <div className="flex-1"></div>

                                {/* Buttons */}
                                <div className="mt-6 grid lg:grid-cols-2 gap-3">
                                    <Dialog open={open && selectedId === user.id} onOpenChange={(val) => { setOpen(val); if(!val) setSelectedId(null); }}>
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => { setSelectedId(user.id); setOpen(true); }}
                                                className="cursor-pointer w-full h-11 rounded-full bg-[#0C0C0C] text-white font-semibold text-[14px] hover:bg-[#1a1a1a] transition">
                                                View Detail
                                            </Button>
                                        </DialogTrigger>
                                        {selectedId === user.id && (
                                            <Coordinatordetailmodal 
                                                coordinatorId={selectedId} 
                                                role="admin"
                                            />
                                        )}
                                    </Dialog>

                                    <Button
                                        onClick={() => HandleBlockCoordinator(user.id)}
                                        variant="outline"
                                        className={`cursor-pointer w-full h-11 rounded-full border font-semibold text-[14px] transition ${
                                            user.isActive 
                                                ? "border-[#9C0000] text-[#9C0000] hover:bg-[#FFF0F0]" 
                                                : "border-green-600 text-green-600 hover:bg-green-50"
                                        }`}
                                    >
                                        {user.isActive ? "Block" : "Unblock"}
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                {!displayLoading && totalItems > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4">
                        <div className="text-[#666373] text-sm">
                            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} coordinators
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg border border-[#EFEFEF] bg-white hover:bg-[#FAFAFA] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum: number;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-2 rounded-lg min-w-[40px] ${
                                                currentPage === pageNum
                                                    ? "bg-[#0DAC87] text-white hover:bg-[#0C9A7A]"
                                                    : "border border-[#EFEFEF] bg-white hover:bg-[#FAFAFA]"
                                            }`}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg border border-[#EFEFEF] bg-white hover:bg-[#FAFAFA] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Coordinatorinfo;