import z from "zod"
import { Button } from "../ui/button"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseChangePassword } from "@/hooks/UseChangePasswordhook";


const formSchema = z
    .object({
        oldPassword: z.string().min(1, {
            message: "Current Password is required",
        }),
        NewPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
            .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
            .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
        ConfirmPassword: z.string().min(1, {
            message: "Confirm Password is required",
        }),
    })
    .refine((data) => data.NewPassword === data.ConfirmPassword, {
        message: "Passwords do not match",
        path: ["ConfirmPassword"],
    })
const Securityprivacy = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const { mutate: changePassword, isPending } = UseChangePassword();
    const [showhide, setShowHide] = useState(false);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            oldPassword: "",
            NewPassword: "",
            ConfirmPassword: "",
        },
    });

    const onSubmit = (val: z.infer<typeof formSchema>) => {
        changePassword(
            {
                currentPassword: val.oldPassword,
                newPassword: val.NewPassword,
            },
            {
                onSuccess: () => {
                    form.reset();
                    setShowHide(false);
                },
            }
        );
    };


    return (
        <div>
            <div className="bg-[#FAFAFA] rounded-tl-[20px] rounded-tr-[20px] border border-[#D9D9D9]">
                <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-4 py-6">
                    Security & Privacy
                </h1>
            </div>

            <div className="bg-[#FAFAFA] border border-[#D9D9D9] px-7 py-6 rounded-bl-[20px] rounded-br-[20px]">
                <div className="flex flex-wrap gap-5 items-center justify-between">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#332A2A] font-semibold">Password</span>
                            <span className="text-[#666373] text-[14px]">Last updated {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                    <Button onClick={()=> setShowHide((prev) => !prev)} className="px-6 py-5 rounded-full border border-[#D4D4D4] font-semibold cursor-pointer w-fit bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] text-[#221E33]">Change Password</Button>
                </div>
                {
                    showhide ?
                        <div className="py-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-5">
                                        <FormField
                                            control={form.control}
                                            name="oldPassword"
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
                                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
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
                                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ConfirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Confirm Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Confirm Password"
                                                            {...field}
                                                            type="password"
                                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-8">
                                        <Button 
                                            type="submit" 
                                            className="rounded-full cursor-pointer w-full mt-6 bg-[#0DAC87] hover:bg-[#129b7b] text-white px-4 py-6 font-semibold hover:scale-105 transition-all duration-300"
                                            disabled={isPending}
                                        >
                                            {isPending ? "Updating..." : "Update Password"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
}

export default Securityprivacy