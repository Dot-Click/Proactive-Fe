import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { UsegetSettinghook } from "@/hooks/getSettinghook";
import { UseupdateSetting } from "@/hooks/updatesettinghook";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod"

const formSchema = z
    .object({
        sessionTimeout: z.string().min(1, {
            message: "Session Time is required",
        }),
        maxLogins: z.string().min(1, {
            message: "MaxLogin is required",
        }),
        minPasswordLength: z.string().min(1, {
            message: "MinPassword is required",
        }),
        twoFactorEnabled: z.boolean(),
    })

const Security = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            sessionTimeout: "",
            maxLogins: "",
            minPasswordLength: "",
            twoFactorEnabled: false,
        },
    });
    const { mutateAsync, isPending } = UseupdateSetting();
    const { data } = UsegetSettinghook();
    const SecurityData = data?.settings;

    useEffect(() => {
        if (SecurityData) {
            form.reset({
                sessionTimeout: SecurityData.sessionTimeout?.toString() ?? "",
                maxLogins: SecurityData.maxLogins?.toString() ?? "",
                minPasswordLength: SecurityData.minPasswordLength?.toString() ?? "",
                twoFactorEnabled: !!SecurityData.twoFactorEnabled,
            });
        }
    }, [SecurityData, form]);

    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        try {
            await mutateAsync({
                sessionTimeout: val.sessionTimeout,
                maxLogins: val.maxLogins,
                minPasswordLength: val.minPasswordLength,
                twoFactorEnabled: val.twoFactorEnabled,
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
                        Security Settings
                    </h1>
                </div>

                {/* <div className="border-b border-[#EDEDED]" /> */}

                <div className="px-5 py-4 flex flex-col gap-5 md:w-[84vh]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="twoFactorEnabled"
                                render={({ field }) => (
                                    <FormItem className="mb-6">
                                        <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-4 rounded-[20px]">
                                            <div className="flex flex-col">
                                                <span className="text-[#221E33] font-bold">Require Two-Factor Authentication</span>
                                                <span className="text-[#727272] text-[12px]">Mandatory 2FA for all admin users</span>
                                            </div>
                                            <FormControl>
                                                <Switch checked={!!field.value} onCheckedChange={(v) => field.onChange(v)} className="w-12" />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="sessionTimeout"
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
                                    name="maxLogins"
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
                                    name="minPasswordLength"
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
                        {isPending ? (
                            <>
                                <LoaderIcon className="animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : "Save Changes"}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Security