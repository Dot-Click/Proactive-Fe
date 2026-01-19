import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseChangePassword } from "@/hooks/UseChangePasswordhook";

const formSchema = z
    .object({
        CurrentPassword: z.string().min(1, {
            message: "Current Password is required",
        }),
        NewPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
            .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
            .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
        ConfirmNewPassword: z.string().min(1, {
            message: "Confirm Password is required",
        }),
    })
    .refine((data) => data.NewPassword === data.ConfirmNewPassword, {
        message: "Passwords do not match",
        path: ["ConfirmNewPassword"],
    })

const UpdatePassword = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const { mutate: changePassword, isPending } = UseChangePassword();
    
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            CurrentPassword: "",
            NewPassword: "",
            ConfirmNewPassword: ""
        },
    });
    
    const onSubmit = (val: z.infer<typeof formSchema>) => {
        changePassword(
            {
                currentPassword: val.CurrentPassword,
                newPassword: val.NewPassword,
            },
            {
                onSuccess: () => {
                    form.reset();
                },
            }
        );
    };


    return (
        <div className="bg-white mt-3 rounded-[25px]">
            <div className="bg-[#FAFAFA] px-6 py-6 rounded-tl-[25px] rounded-tr-[25px] font-medium">
                <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Update Password</span>
            </div>

            <div className="px-6 py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mt-2 grid lg:grid-cols-1 gap-6 lg:max-w-[40vw]">
                            <FormField
                                control={form.control}
                                name="CurrentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Current Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Current Password"
                                                {...field}
                                                type="password"
                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="NewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="New Password"
                                                {...field}
                                                type="password"
                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ConfirmNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Confirm New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm New Password"
                                                {...field}
                                                type="password"
                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button 
                            type="submit"
                            className="mt-6 rounded-full px-6 py-4 bg-[#0DAC87] hover:bg-[#0f9c7b] cursor-pointer"
                            disabled={isPending}
                        >
                            {isPending ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default UpdatePassword