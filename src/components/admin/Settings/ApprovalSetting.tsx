import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsegetSettinghook } from "@/hooks/getSettinghook";
import { UseupdateSetting } from "@/hooks/updatesettinghook";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod"


const formSchema = z
    .object({
        defaultApproval: z.string().min(1, {
            message: "Select Default Approval",
        }),
        defaultMaxParticipants: z.string().min(1, {
            message: "Select Max Participants",
        }),
        defaultMinParticipants: z.string().min(1, {
            message: "Select Min Participants",
        }),
    })

const ApprovalSetting = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            defaultApproval: "",
            defaultMaxParticipants: "",
            defaultMinParticipants: "",
        },
    });
    const { mutateAsync, isPending } = UseupdateSetting();
    const { data } = UsegetSettinghook();
    const ApprovalSettingData = data?.settings;

    useMemo(() => {
        if (ApprovalSettingData) {
            form.reset({
                defaultApproval: ApprovalSettingData.defaultApproval ?? "",
                defaultMaxParticipants: ApprovalSettingData.defaultMaxParticipants ?? "",
                defaultMinParticipants: ApprovalSettingData.defaultMinParticipants ?? "",
            });
        }
    }, [ApprovalSettingData, form]);

    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        const { defaultApproval, defaultMaxParticipants, defaultMinParticipants } = val
        try {
            await mutateAsync({
                defaultApproval,
                defaultMaxParticipants,
                defaultMinParticipants
            });
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="rounded-[10px] mt-4 bg-white">

            <div className="bg-[#FAFAFA] rounded-t-[10px]">
                <h1 className="text-[#221E33] font-semibold text-[18px] sm:text-[20px] px-6 py-6">
                    Approval Settings
                </h1>
            </div>

            <div className="border-b border-[#EDEDED]" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="px-6 py-6 flex flex-col gap-5 flex-1">
                        <FormField
                            control={form.control}
                            name="defaultApproval"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Default Approval Flow
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                <SelectValue placeholder="Select Approval" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Auto Approval">Auto Approval</SelectItem>
                                                <SelectItem value="Manual Approval">Manual Approval</SelectItem>
                                                <SelectItem value="Admin Approval Required">Admin Approval Required</SelectItem>
                                                <SelectItem value="Pending Review">Pending Review</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultMaxParticipants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Default Max Participants
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                <SelectValue placeholder="Select Max Participants" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5 Participants</SelectItem>
                                                <SelectItem value="10">10 Participants</SelectItem>
                                                <SelectItem value="15">15 Participants</SelectItem>
                                                <SelectItem value="20">20 Participants</SelectItem>
                                                <SelectItem value="25">25 Participants</SelectItem>
                                                <SelectItem value="30">30 Participants</SelectItem>
                                                <SelectItem value="40">40 Participants</SelectItem>
                                                <SelectItem value="50">50 Participants</SelectItem>
                                                <SelectItem value="Unlimited">Unlimited</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultMinParticipants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Default Min Participants
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                <SelectValue placeholder="Select Min Participants" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 Participant</SelectItem>
                                                <SelectItem value="2">2 Participants</SelectItem>
                                                <SelectItem value="5">5 Participants</SelectItem>
                                                <SelectItem value="10">10 Participants</SelectItem>
                                                <SelectItem value="15">15 Participants</SelectItem>
                                                <SelectItem value="20">20 Participants</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end md:mt-36 px-6 py-6">
                        <Button className="rounded-full px-14 py-6 cursor-pointer">{isPending ? (
                            <>
                                <LoaderIcon className="animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : "Save Changes"}</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ApprovalSetting