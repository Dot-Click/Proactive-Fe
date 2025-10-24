import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"

const formSchema = z
    .object({
        SessionTime: z.string().min(1, {
            message: "Session Time is required",
        }),
        MaxLogin: z.string().min(1, {
            message: "MaxLogin is required",
        }),
        MinPassword: z.string().min(1, {
            message: "MinPassword is required",
        }),
    })

const Security = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            SessionTime: "",
            MaxLogin: "",
            MinPassword: "",
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
                        Security Settings
                    </h1>
                </div>

                {/* <div className="border-b border-[#EDEDED]" /> */}

                <div className="px-5 py-4 flex flex-col gap-5 md:w-[84vh]">
                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[#221E33] font-bold">Require Two-Factor Authentication</span>
                            <span className="text-[#727272] text-[12px]">Mandatory 2FA for all admin users</span>
                        </div>
                        <Switch className="w-12" />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="SessionTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#242E2F] font-semibold">
                                                Session Timeout
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Session Timeout"
                                                    {...field}
                                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="MaxLogin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#242E2F] font-semibold">
                                                Max Login Attempts
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Max Login Attempts"
                                                    {...field}
                                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="MinPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#242E2F] font-semibold">
                                                Minimum Password Length
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Minimum Password Length"
                                                    {...field}
                                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="flex justify-end md:mt-32 mt-6 px-5 py-4">
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        className="rounded-full px-12 py-5 cursor-pointer ">
                        Save Changes
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Security