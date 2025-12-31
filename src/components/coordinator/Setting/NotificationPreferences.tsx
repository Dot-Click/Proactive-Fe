import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const NotificationPreferences = () => {
    return (
        <div className="bg-white mt-3 rounded-[25px]">
            <div className="bg-[#FAFAFA] px-6 py-6 rounded-tl-[25px] rounded-tr-[25px] font-medium">
                <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Notification Preferences</span>
            </div>
            <div className="flex flex-col gap-6 px-6 py-6">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium">Email Notifications</span>
                        <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium text-[12px]">Receive email updates about applications and trips</span>
                    </div>
                    <Switch className="w-12" />
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium">Application Alerts</span>
                        <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium text-[12px]">Get notified when new applications are submitted</span>
                    </div>
                    <Switch className="w-12" />
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium">Review Notifications</span>
                        <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium text-[12px]">Alerts when participants submit reviews</span>
                    </div>
                    <Switch className="w-12" />
                </div>
                <div>
                    <Button className="rounded-full px-6 py-4 cursor-pointer">Save Preferences</Button>
                </div>
            </div>
        </div>
    )
}

export default NotificationPreferences