import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Map from "@/assets/sidebaricon/map.png"
import clock from "@/assets/sidebaricon/clock.png"
import star from "@/assets/sidebaricon/star.png"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom"

const CoordinatorData = [
    {
        Name: 'Total Trips Led',
        Number: '03'
    },
    {
        Name: 'Active Trips',
        Number: '0'
    },
    {
        Name: 'Success Rate',
        Number: '89%'
    },
    {
        Name: 'Repeat Customers',
        Number: '60%'
    },
]
const Coordinatordetailmodal = () => {
const navigate = useNavigate()
    return (
        <div>
            <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[24px]">Coordinator Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">

                    <div className="flex lg:flex-row lg:items-center justify-between gap-3 bg-[#FAFAFE] md:px-6 px-4 py-6 rounded-[16px] mt-5">
                        
                        <div className="flex flex-col lg:flex-row items-start gap-2">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="text-[18px] text-[#221E33] font-semibold leading-tight">Pavel Novak</h2>
                                    <p className="text-[13px] text-[#666373]">pavel.n@email.com</p>
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <Badge className="bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] rounded-full px-3 py-1.5">
                                        Active
                                    </Badge>
                                    <Badge className="bg-[#771FB5]/10 text-[#771FB5] border border-[#771FB5] rounded-full px-3 py-1.5">
                                        Junior Coordinator
                                    </Badge>
                                </div>

                                <div className="flex gap-6 mt-4 text-[13px] text-[#221E33]">
                                    <div className="flex flex-col lg:flex-row items-center gap-1.5 ">
                                        <img src={star} alt="star" className="h-4" />
                                        <span className="text-center lg:text-start">4.5 (23)</span>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center gap-1.5 ">
                                        <img src={Map} alt="map" className="h-4" />
                                        <span className="text-center lg:text-start">Barcelona, Spain</span>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center gap-1.5 ">
                                        <img src={clock} alt="clock" className="h-4" />
                                        <span className="text-center lg:text-start">1 year experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col text-center mb-6">
                            <span className="font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">€897</span>
                            <span className="text-[#666373] text-[14px]">Total Revenue</span>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {
                            CoordinatorData.map((user, i) => (
                                <div key={i} className="flex flex-col items-center rounded-[12px] px-5 py-6 bg-[#FAFAFE] hover:shadow-sm transition-all duration-300">
                                    <span className="cursor-pointer font-bold text-[30px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">{user.Number}</span>
                                    <span className="cursor-pointer text-[#666373]">{user.Name}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className="ml-1 mt-4 md:text-start text-center">
                        <h1 className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Overview</h1>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border border-[#E0E1E2] rounded-[10px]">
                            <h1 className="text-[#221E33] font-medium text-[20px] m-5">Professional Information</h1>
                            <div className="border-b border-[#EDEDED]" />
                            <div className="px-5 py-4 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#666373]">Specialties:</span>
                                    <div className="text-[#666373] grid lg:grid-cols-2 gap-y-2 ">
                                        <Badge className="px-5 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">Adventure Travel</Badge>
                                        <Badge className="px-5 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">Desert Expeditions</Badge>
                                        <Badge className="px-5 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">Wildlife</Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#666373]">Languages:</span>
                                    <div className="text-[#666373] grid lg:grid-cols-3 gap-y-2">
                                        <Badge className="px-7 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">English</Badge>
                                        <Badge className="px-7 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">Arabic</Badge>
                                        <Badge className="px-7 py-2 font-medium bg-[#F5F5F5] text-[#727272] text-[15px]">Spanish</Badge>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#666373]">Certification Level</span>
                                    <span className="text-[#666373] font-semibold">Certified Coordinator</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#666373]">Member Since</span>
                                    <span className="text-[#666373]">2023-09-15</span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-[#E0E1E2] rounded-[10px]">
                            <h1 className="text-[#221E33] font-medium text-[20px] m-5">Performance Metrics</h1>
                            <div className="border-b border-[#EDEDED]" />
                            <div className="px-5 py-4 flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="text-[#666373]">Overall Performance</span>
                                    <span className="text-[#666373]">88%</span>
                                </div>
                                <div>
                                    <Progress value={80} className="w-[100%] h-3" />
                                </div>
                                <div className="flex justify-between mt-5">
                                    <span className="text-[#666373]">Success Rate</span>
                                    <span className="text-[#666373]">95%</span>
                                </div>
                                <div>
                                    <Progress value={80} className="w-[100%] h-3" />
                                </div>
                                <div className="flex justify-between mt-5">
                                    <span className="text-[#666373]">Customer Satisfaction</span>
                                    <span className="text-[#666373]">4.7/5.0</span>
                                </div>
                                <div>
                                    <Progress value={80} className="w-[100%] h-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex md:flex-row flex-col gap-2 justify-between items-center mt-8">
                    <Button className="w-full md:w-auto rounded-full bg-[#E0DDDD] hover:bg-[#c7c1c1] cursor-pointer text-[#606066] h-12 px-10 font-bold">Go Back</Button>
                    <DialogFooter className="w-full md:w-auto">
                        <div className="flex md:flex-row flex-col gap-4 w-full md:w-auto">
                            <Button onClick={()=> navigate("/dashboard/edit-coordinator/:id")} className="w-full md:w-auto font-bold rounded-full bg-[#0DAC87] hover:bg-[#09a07d] cursor-pointer h-12 px-10">Edit Profile</Button>
                            <Button className="w-full md:w-auto font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10">Send Email</Button>
                            <Button variant={'outline'} className="w-full md:w-auto cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Block User</Button>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </div>
    )
}

export default Coordinatordetailmodal