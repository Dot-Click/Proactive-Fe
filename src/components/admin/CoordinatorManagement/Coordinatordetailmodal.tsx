// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import Map from "@/assets/sidebaricon/map.png"
// import clock from "@/assets/sidebaricon/clock.png"
// import star from "@/assets/sidebaricon/star.png"
// import { Progress } from "@/components/ui/progress"
// import { useNavigate } from "react-router-dom"
// import { UsegetCoordinatorbyId } from "@/hooks/getCoordinatorhookid"

// const CoordinatorData = [
//     {
//         Name: 'Total Trips Led',
//         Number: '03'
//     },
//     {
//         Name: 'Active Trips',
//         Number: '0'
//     },
//     {
//         Name: 'Success Rate',
//         Number: '89%'
//     },
//     {
//         Name: 'Repeat Customers',
//         Number: '60%'
//     },
// ]
// const Coordinatordetailmodal = ({ coordinatorId }: { coordinatorId: string }) => {
//     const navigate = useNavigate()
//     const { data, isLoading, isError } = UsegetCoordinatorbyId(coordinatorId);
//     const coordinator = data?.coordinator
//     {
//         isLoading && <p>Loading...</p>
//     }
//     {
//         isError && <p>Error loading coordinator details.</p>
//     }
//     return (
//         <div>
//             <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle className="font-bold text-[24px]">Coordinator Details</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4">
//                     <div className="flex lg:flex-row lg:items-center justify-between gap-3 bg-[#FAFAFE] md:px-6 px-4 py-6 rounded-[16px] mt-5">

//                         <div className="flex flex-col lg:flex-row items-start gap-2">
//                             <Avatar className="h-20 w-20">
//                                 <AvatarImage src={coordinator?.profilePicture} alt="@shadcn" />
//                                 <AvatarFallback>CN</AvatarFallback>
//                             </Avatar>

//                             <div className="flex flex-col justify-between">
//                                 <div>
//                                     <h2 className="text-[18px] text-[#221E33] font-semibold leading-tight">{coordinator?.fullName}</h2>
//                                     <p className="text-[13px] text-[#666373]">{coordinator?.email}</p>
//                                 </div>

//                                 <div className="flex gap-2 mt-3">
//                                     <Badge className="bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] rounded-full px-3 py-1.5">
//                                         Active
//                                     </Badge>
//                                     <Badge className="bg-[#771FB5]/10 text-[#771FB5] border border-[#771FB5] rounded-full px-3 py-1.5">
//                                         Junior Coordinator
//                                     </Badge>
//                                 </div>

//                                 <div className="flex gap-6 mt-4 text-[13px] text-[#221E33]">
//                                     <div className="flex flex-col lg:flex-row items-center gap-1.5 ">
//                                         <img src={star} alt="star" className="h-4" />
//                                         <span className="text-center lg:text-start">4.5 (23)</span>
//                                     </div>
//                                     <div className="flex flex-col lg:flex-row items-center gap-1.5 ">
//                                         <img src={Map} alt="map" className="h-4" />
//                                         <span className="text-center lg:text-start">{coordinator?.location}</span>
//                                     </div>
//                                     <div className="flex flex-col lg:flex-row items-center gap-1.5 ">
//                                         <img src={clock} alt="clock" className="h-4" />
//                                         <span className="text-center lg:text-start">{coordinator?.yearsOfExperience} years experience</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex flex-col text-center mb-6">
//                             <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">€897</span>
//                             <span className="text-[#666373] text-[14px]">Total Revenue</span>
//                         </div>

//                     </div>

//                     <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
//                         {
//                             CoordinatorData.map((user, i) => (
//                                 <div key={i} className="flex flex-col items-center rounded-[12px] px-5 py-6 bg-[#FAFAFE] hover:shadow-sm transition-all duration-300">
//                                     <span className="cursor-pointer font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">{user.Number}</span>
//                                     <span className="cursor-pointer text-[#666373]">{user.Name}</span>
//                                 </div>
//                             ))
//                         }
//                     </div>

//                     <div className="ml-1 mt-4 md:text-start text-center">
//                         <h1 className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Overview</h1>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-3">
//                         <div className="border border-[#E0E1E2] rounded-[10px]">
//                             <h1 className="text-[#221E33] font-medium text-[20px] m-5">Professional Information</h1>
//                             <div className="border-b border-[#EDEDED]" />
//                             <div className="px-5 py-4 flex flex-col gap-4">
//                                 <div className="flex flex-col gap-2">
//                                     <span className="text-[#666373]">Specialties:</span>
//                                     {
//                                         coordinator?.specialities.map((speciality: string[]) => (
//                                             <div className="text-[#666373] grid lg:grid-cols-2 gap-y-2 ">
//                                                 <Badge className="px-5 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">{speciality}</Badge>
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                                 <div className="flex flex-col gap-2">
//                                     <span className="text-[#666373]">Languages:</span>
//                                     {
//                                         coordinator?.languages.map((language: string[]) => (
//                                             <div className="text-[#666373] grid lg:grid-cols-3 gap-y-2">
//                                                 <Badge className="px-7 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">{language}</Badge>
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-[#666373]">Certification Level</span>
//                                     <span className="text-[#666373] font-semibold">{coordinator?.certificateLvl}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-[#666373]">Member Since</span>
//                                     <span className="text-[#666373]">{new Date(coordinator?.userCreatedAt).toLocaleDateString("en-US")}</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="border border-[#E0E1E2] rounded-[10px]">
//                             <h1 className="text-[#221E33] font-medium text-[20px] m-5">Performance Metrics</h1>
//                             <div className="border-b border-[#EDEDED]" />
//                             <div className="px-5 py-4 flex flex-col gap-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-[#666373]">Overall Performance</span>
//                                     <span className="text-[#666373]">88%</span>
//                                 </div>
//                                 <div>
//                                     <Progress value={80} className="w-[100%] h-3" />
//                                 </div>
//                                 <div className="flex justify-between mt-5">
//                                     <span className="text-[#666373]">Success Rate</span>
//                                     <span className="text-[#666373]">95%</span>
//                                 </div>
//                                 <div>
//                                     <Progress value={80} className="w-[100%] h-3" />
//                                 </div>
//                                 <div className="flex justify-between mt-5">
//                                     <span className="text-[#666373]">Customer Satisfaction</span>
//                                     <span className="text-[#666373]">4.7/5.0</span>
//                                 </div>
//                                 <div>
//                                     <Progress value={80} className="w-[100%] h-3" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="flex md:flex-row flex-col gap-2 justify-between items-center mt-8">
//                     <DialogClose asChild>
//                     <Button className="w-full md:w-auto rounded-full bg-[#E0DDDD] hover:bg-[#c7c1c1] cursor-pointer text-[#606066] h-12 px-10 font-bold">Go Back</Button>
//                     </DialogClose>
//                     <DialogFooter className="w-full md:w-auto">
//                         <div className="flex md:flex-row flex-col gap-4 w-full md:w-auto">
//                             <Button onClick={() => navigate("/dashboard/edit-coordinator/:id")} className="w-full md:w-auto font-bold rounded-full bg-[#0DAC87] hover:bg-[#09a07d] cursor-pointer h-12 px-10">Edit Profile</Button>
//                             <Button className="w-full md:w-auto font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">Send Email</Button>
//                             <Button variant={'outline'} className="w-full md:w-auto cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Block User</Button>
//                         </div>
//                     </DialogFooter>
//                 </div>
//             </DialogContent>
//         </div>
//     )
// }

// export default Coordinatordetailmodal

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Map from "@/assets/sidebaricon/map.png"
import clock from "@/assets/sidebaricon/clock.png"
import star from "@/assets/sidebaricon/star.png"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom"
import { UsegetCoordinatorbyId } from "@/hooks/getCoordinatorhookid"
import { LoaderIcon } from "lucide-react"

// Static labels for stats (values can be made dynamic if API provides them later)
const CoordinatorData = [
    { Name: 'Total Trips Led', Number: '03' },
    { Name: 'Active Trips', Number: '0' },
    { Name: 'Success Rate', Number: '89%' },
    { Name: 'Repeat Customers', Number: '60%' },
]

const Coordinatordetailmodal = ({ coordinatorId, role }: { coordinatorId: string, role: string }) => {
    const navigate = useNavigate()
    const { data, isLoading, isError } = UsegetCoordinatorbyId(coordinatorId);

    // Accessing the nested coordinator object from your API response structure
    const coordinator = data?.coordinator;

    if (isLoading) {
        return (
            <DialogContent className="sm:max-w-[400px] flex flex-col items-center justify-center py-20">
                <LoaderIcon className="animate-spin h-10 w-10 text-gray-400" />
                <p className="mt-4 text-sm text-gray-500">Fetching Details...</p>
            </DialogContent>
        )
    }

    if (isError || !coordinator) {
        return (
            <DialogContent className="sm:max-w-[400px] text-center py-10">
                <p className="text-red-500 font-semibold">Error loading coordinator details.</p>
                <DialogClose asChild>
                    <Button className="mt-4" variant="outline">Close</Button>
                </DialogClose>
            </DialogContent>
        )
    }

    return (
        <div>
            <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[24px]">Coordinator Details</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    {/* Header Info Section */}
                    <div className="flex lg:flex-row lg:items-center justify-between gap-3 bg-[#FAFAFE] md:px-6 px-4 py-6 rounded-[16px] mt-5">
                        <div className="flex flex-col lg:flex-row items-start gap-4">
                            <Avatar className="h-20 w-20 border-2 border-white">
                                <AvatarImage src={coordinator.profilePicture} alt={coordinator.fullName} />
                                <AvatarFallback>{coordinator.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="text-[18px] text-[#221E33] font-semibold leading-tight">{coordinator.fullName}</h2>
                                    <p className="text-[13px] text-[#666373]">{coordinator.email}</p>
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <Badge className="bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] rounded-full px-3 py-1.5">
                                        Active
                                    </Badge>
                                    <Badge className="bg-[#771FB5]/10 text-[#771FB5] border border-[#771FB5] rounded-full px-3 py-1.5">
                                        {coordinator.type}
                                    </Badge>
                                </div>

                                <div className="flex gap-6 mt-4 text-[13px] text-[#221E33]">
                                    <div className="flex items-center gap-1.5">
                                        <img src={star} alt="star" className="h-4" />
                                        <span>4.5 (23)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <img src={Map} alt="map" className="h-4" />
                                        <span>{coordinator.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <img src={clock} alt="clock" className="h-4" />
                                        <span>{coordinator.yearsOfExperience} years experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col text-center lg:items-end">
                            <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">€897</span>
                            <span className="text-[#666373] text-[14px]">Total Revenue</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                        {CoordinatorData.map((item, i) => (
                            <div key={i} className="flex flex-col items-center rounded-[12px] px-5 py-6 bg-[#FAFAFE] hover:shadow-sm transition-all">
                                <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">{item.Number}</span>
                                <span className="text-[#666373] text-sm">{item.Name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="ml-1 mt-4">
                        <h1 className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">Overview</h1>
                    </div>

                    {/* Dynamic Detail Cards */}
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border border-[#E0E1E2] rounded-[10px] bg-white">
                            <h1 className="text-[#221E33] font-medium text-[18px] m-5">Professional Information</h1>
                            <div className="border-b border-[#EDEDED]" />
                            <div className="px-5 py-4 flex flex-col gap-5">

                                <div className="flex flex-col gap-2">
                                    <span className="text-[#666373] text-sm">Specialties:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {coordinator.specialities.map((spec: string, i: number) => (
                                            <Badge key={i} className="bg-[#F5F5F5] text-[#727272] hover:bg-[#F5F5F5] border-none px-3 py-1">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-[#666373] text-sm">Languages:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {coordinator.languages.map((lang: string, i: number) => (
                                            <Badge key={i} className="bg-[#F5F5F5] text-[#727272] hover:bg-[#F5F5F5] border-none px-4 py-1">
                                                {lang}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#666373]">Certification Level</span>
                                    <span className="text-[#221E33] font-semibold">{coordinator.certificateLvl}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#666373]">Member Since</span>
                                    <span className="text-[#221E33] font-semibold">
                                        {new Date(coordinator.userCreatedAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-[#E0E1E2] rounded-[10px] bg-white">
                            <h1 className="text-[#221E33] font-medium text-[18px] m-5">Performance Metrics</h1>
                            <div className="border-b border-[#EDEDED]" />
                            <div className="px-5 py-4 flex flex-col gap-6">
                                <div>
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="text-[#666373]">Overall Performance</span>
                                        <span className="font-semibold">88%</span>
                                    </div>
                                    <Progress value={88} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="text-[#666373]">Success Rate</span>
                                        <span className="font-semibold">95%</span>
                                    </div>
                                    <Progress value={95} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="text-[#666373]">Customer Satisfaction</span>
                                        <span className="font-semibold">4.7/5.0</span>
                                    </div>
                                    <Progress value={94} className="h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex md:flex-row flex-col gap-2 justify-between items-center mt-8">
                    <DialogClose asChild>
                        <Button className="w-full md:w-auto rounded-full bg-[#E0DDDD] hover:bg-[#c7c1c1] cursor-pointer text-[#606066] h-12 px-10 font-bold">Go Back</Button>
                    </DialogClose>
                    {
                        role === "user" ? null : (
                            <DialogFooter className="w-full md:w-auto">
                                <div className="flex md:flex-row flex-col gap-4 w-full md:w-auto">
                                    <Button
                                        onClick={() => navigate(`/dashboard/edit-coordinator/${coordinatorId}`)}
                                        className="w-full md:w-auto font-bold rounded-full bg-[#0DAC87] hover:bg-[#09a07d] cursor-pointer h-12 px-10"
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button className="w-full md:w-auto font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">Send Email</Button>
                                    <Button variant={'outline'} className="w-full md:w-auto cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Block User</Button>
                                </div>
                            </DialogFooter>
                        )
                    }
                </div>
            </DialogContent>
        </div>
    )
}

export default Coordinatordetailmodal