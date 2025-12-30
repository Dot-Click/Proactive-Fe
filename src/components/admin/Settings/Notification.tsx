import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { UseupdateSetting } from "@/hooks/updatesettinghook";
import { UsegetSettinghook } from "@/hooks/getSettinghook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod"
import { LoaderIcon } from "lucide-react";

const formSchema = z
    .object({
        ReminderDays: z.string().min(1, {
            message: "ReminderDays is required",
        }),
        emailNotification: z.boolean(),
        smsNotification: z.boolean(),
    })

const Notification = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            ReminderDays: "",
            emailNotification: false,
            smsNotification: false,
        },
    });

    const { mutateAsync, isPending } = UseupdateSetting();
    const { data } = UsegetSettinghook();
    const settings = data?.settings;

    useEffect(() => {
        if (settings) {
            form.reset({
                ReminderDays: settings.reminderDays?.toString() ?? settings.reminderDays ?? "",
                emailNotification: !!settings.emailNotification,
                smsNotification: !!settings.sendSms,
            });
        }
    }, [settings, form]);

    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        try {
            await mutateAsync({
                reminderDays: val.ReminderDays,
                emailNotification: val.emailNotification,
                sendSms: val.smsNotification,
            });
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <div className="rounded-[10px] mt-4 bg-white md:min-h-[100vh]">

                <div className="bg-[#FAFAFA] rounded-t-[10px]">
                    <h1 className="text-[#221E33] font-bold text-[18px] sm:text-[20px] px-6 py-6">
                        Notification Channels
                    </h1>
                </div>

                <div className="border-b border-[#EDEDED]" />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 py-4 grid md:grid-cols-2 gap-5">

                        <FormField
                            control={form.control}
                            name="emailNotification"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                                        <div className="flex flex-col">
                                            <span className="text-[#221E33] font-bold">Email Notifications</span>
                                            <span className="text-[#727272] text-[12px]">Send notifications via email</span>
                                        </div>
                                        <FormControl>
                                            <Switch checked={!!field.value} onCheckedChange={(v) => field.onChange(v)} className="w-12" />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="smsNotification"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                                        <div className="flex flex-col">
                                            <span className="text-[#221E33] font-bold">SMS Notifications</span>
                                            <span className="text-[#727272] text-[12px]">Send notifications via SMS</span>
                                        </div>
                                        <FormControl>
                                            <Switch checked={!!field.value} onCheckedChange={(v) => field.onChange(v)} className="w-12" />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ReminderDays"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Reminder Days Before Trip
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="03"
                                            {...field}
                                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end md:mt-0 md:col-span-2">
                            <Button type="submit" disabled={isPending} className="rounded-full px-14 py-6 cursor-pointer">
                                {isPending ? (
                                    <>
                                        <LoaderIcon className="animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default Notification