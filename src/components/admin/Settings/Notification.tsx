import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"

const formSchema = z
    .object({
        ReminderDays: z.string().min(1, {
            message: "ReminderDays is required",
        }),
    })

const Notification = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            ReminderDays: "",
        },
    });

    const onSubmit = (val: z.infer<typeof formSchema>) => {
        console.log(val);
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

                <div className="px-5 py-4 grid md:grid-cols-2 gap-5">

                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[#221E33] font-bold">Email Notifications</span>
                            <span className="text-[#727272] text-[12px]">Send notifications via email</span>
                        </div>
                        <Switch className="w-12" />
                    </div>
                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[#221E33] font-bold">SMS Notifications</span>
                            <span className="text-[#727272] text-[12px]">Send notifications via SMS</span>
                        </div>
                        <Switch className="w-12" />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        </form>
                    </Form>
                    <div className="flex justify-end md:mt-96">
                        <Button className="rounded-full px-14 py-6 cursor-pointer">Save Changes</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Notification