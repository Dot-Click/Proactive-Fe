
const Personalinformation = () => {
    return (
        <div>
            <div className="bg-[#FAFAFA] rounded-tl-[20px] rounded-tr-[20px] border border-[#D9D9D9]">
                <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-4 py-6">
                    Personal Information
                </h1>
            </div>

            <div className="bg-[#FAFAFA] border border-[#D9D9D9] px-7 py-6 rounded-bl-[20px] rounded-br-[20px]">
                <div className="grid grid-cols-2">

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">First Name</span>
                            <span className="text-[#666373] text-[14px]">Will</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Nick Name</span>
                            <span className="text-[#666373] text-[14px]">@mr_will</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">DOB</span>
                            <span className="text-[#666373] text-[14px]">14/06/1995</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Address</span>
                            <span className="text-[#666373] text-[14px]">123 Adventure St, San Francisco, CA 94102</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Bettelheim</span>
                            <span className="text-[#666373] text-[14px]">Will</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Phone Number</span>
                            <span className="text-[#666373] text-[14px]">+1 (555) 987-6543</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Gender</span>
                            <span className="text-[#666373] text-[14px]">Male</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Personalinformation