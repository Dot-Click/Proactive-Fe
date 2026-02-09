import z from "zod";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";
import { UseUpdateUserProfile } from "@/hooks/UseUpdateUserProfilehook";

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name is required",
    }).max(100, {
        message: "First name must be less than 100 characters",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required",
    }).max(100, {
        message: "Last name must be less than 100 characters",
    }),
    nickName: z.string().max(200, {
        message: "Nick name must be less than 200 characters",
    }).optional(),
    dob: z.string().optional(),
    address: z.string().max(500, {
        message: "Address must be less than 500 characters",
    }).optional(),
    phoneNumber: z.string().max(20, {
        message: "Phone number must be less than 20 characters",
    }).optional(),
    gender: z.string().max(20, {
        message: "Gender must be less than 20 characters",
    }).optional(),
    emergencyContact: z.string().max(100, {
        message: "Emergency contact must be less than 100 characters",
    }).optional(),
    dni: z.string().max(50, {
        message: "DNI must be less than 50 characters",
    }).optional(),
    dietaryRestrictions: z.string().max(200, {
        message: "Diet restrictions must be less than 200 characters",
    }).optional(),
});

const Personalinformation = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const { data: userData, isLoading } = UsegetCurrentUser();
    const { mutate: updateProfile, isPending } = UseUpdateUserProfile();
    const [showEdit, setShowEdit] = useState(false);

    const user = userData?.data?.user;

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            firstName: "",
            lastName: "",
            nickName: "",
            dob: "",
            address: "",
            phoneNumber: "",
            gender: "",
            emergencyContact: "",
            dni: "",
            dietaryRestrictions: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.FirstName || "",
                lastName: user.LastName || "",
                nickName: user.NickName || "",
                dob: user.dob || "",
                address: user.Address || "",
                phoneNumber: user.PhoneNumber || "",
                gender: user.Gender || "",
                emergencyContact: user.EmergencyContact || "",
                dni: user.DNI || "",
                dietaryRestrictions: user.DietRestrictions || "",
            });
        }
    }, [user, form]);

    const onSubmit = (val: z.infer<typeof formSchema>) => {
        updateProfile(
            {
                firstName: val.firstName,
                lastName: val.lastName,
                nickName: val.nickName,
                dob: val.dob,
                address: val.address,
                phoneNumber: val.phoneNumber,
                gender: val.gender,
                emergencyContact: val.emergencyContact || undefined,
                dni: val.dni || undefined,
                dietaryRestrictions: val.dietaryRestrictions || undefined,
            },
            {
                onSuccess: () => {
                    setShowEdit(false);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div>
                <div className="bg-[#FAFAFA] rounded-tl-[20px] rounded-tr-[20px] border border-[#D9D9D9]">
                    <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-4 py-6">
                        Personal Information
                    </h1>
                </div>
                <div className="bg-[#FAFAFA] border border-[#D9D9D9] px-7 py-6 rounded-bl-[20px] rounded-br-[20px]">
                    <div className="text-center py-8 text-[#666373]">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-[#FAFAFA] rounded-tl-[20px] rounded-tr-[20px] border border-[#D9D9D9]">
                <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-4 py-6">
                    Personal Information
                </h1>
            </div>

            <div className="bg-[#FAFAFA] border border-[#D9D9D9] px-7 py-6 rounded-bl-[20px] rounded-br-[20px]">
                {!showEdit ? (
                    <>
                        <div className="flex flex-wrap gap-5 items-center justify-between mb-6">
                            <div></div>
                            <Button
                                onClick={() => setShowEdit(true)}
                                className="px-6 py-5 rounded-full border border-[#D4D4D4] font-semibold cursor-pointer w-fit bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] text-[#221E33]"
                            >
                                Edit Information
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">First Name</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.FirstName || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Nick Name</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.NickName ? `@${user.NickName.replace(/^@/, "")}` : "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">DOB</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.dob || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Address</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.Address || "Not provided"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Last Name</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.LastName || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Phone Number</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.PhoneNumber || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Gender</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.Gender || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Emergency Contact</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.EmergencyContact || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">DNI</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.DNI || "Not provided"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[#332A2A] font-semibold">Diet Restrictions</span>
                                    <span className="text-[#666373] text-[14px]">
                                        {user?.DietRestrictions || "Not provided"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="First Name"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Last Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Last Name"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="nickName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Nick Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="@nickname"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="+1 (555) 123-4567"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Date of Birth
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="DD/MM/YYYY"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Gender
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Gender"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="123 Adventure St, San Francisco, CA 94102"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="emergencyContact"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Emergency Contact
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="+1 (555) 987-6543"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dni"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    DNI
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="12345678A"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dietaryRestrictions"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Diet Restrictions
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                                                        {...field}
                                                        className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mt-8 flex gap-4 justify-end">
                                    <Button
                                        type="button"
                                        onClick={() => setShowEdit(false)}
                                        className="rounded-full cursor-pointer px-6 py-5 border border-[#D4D4D4] font-semibold bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] text-[#221E33] hover:scale-105 transition-all duration-300"
                                        disabled={isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="rounded-full cursor-pointer px-6 py-5 bg-[#0DAC87] hover:bg-[#129b7b] text-white font-semibold hover:scale-105 transition-all duration-300"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Updating..." : "Update Information"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Personalinformation;