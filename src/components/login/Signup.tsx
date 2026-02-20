import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import google from "../../assets/google.png"
import login from "../../assets/login.png"
import loginLayer from "../../assets/loginLayer.png"
import loginformbg from "../../assets/loginformbg.png"
import proactivelogo from "../../assets/proactive-logo.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner";
import { useCreateUser } from "@/hooks/UserRegisterhook";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";

const allowedGenders = ["Male", "Female", "Other"];

const SignupSchema = z.object({
    FirstName: z.string().min(2, 'FirstName is required'),
    LastName: z.string().min(2, 'LastName is required'),
    NickName: z.string().optional(),
    PhoneNumber: z.string().regex(/^\+?\d{9,15}$/, "Invalid phone number"),
    DOB: z.string()
        .min(1, "DOB is required")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in YYYY-MM-DD format")
        .refine((date) => {
            const d = new Date(date);
            return !isNaN(d.getTime());
        }, "DOB must be a valid date"),
    Gender: z.enum(allowedGenders, "Gender must be Male, Female, or Other"),
    Address: z.string().min(1, "Address is required"),
    EmergencyContact: z.string().max(100, "Emergency contact must be less than 100 characters").optional(),
    DNI: z.string().max(50, "DNI must be less than 50 characters").optional(),
    DietRestrictions: z.string().max(200, "Diet restrictions must be less than 200 characters").optional(),
    email: z.string().email("Invalid email address"),
    Password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
});


const Signup = () => {
    type SignupSchemaType = z.infer<typeof SignupSchema>
    const form = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema) as any,
        defaultValues: {
            FirstName: "",
            LastName: "",
            NickName: "",
            PhoneNumber: "",
            DOB: "",
            Gender: "",
            Address: "",
            EmergencyContact: "",
            DNI: "",
            DietRestrictions: "",
            email: "",
            Password: "",
        },
    });
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const createUserMutation = useCreateUser();
    const { mutate, isPending } = useGoogleSignup();

    const onSubmit = async (val: z.infer<typeof SignupSchema>) => {
        const {
            FirstName,
            LastName,
            NickName,
            PhoneNumber,
            DOB,
            Gender,
            Address,
            EmergencyContact,
            DNI,
            DietRestrictions,
            email,
            Password,
        } = val;
        try {
            const response = await createUserMutation.mutateAsync({
                FirstName,
                LastName,
                NickName,
                PhoneNumber,
                DOB,
                Gender,
                Address,
                EmergencyContact: EmergencyContact || undefined,
                DNI: DNI || undefined,
                DietRestrictions: DietRestrictions || undefined,
                email,
                Password,
            })
            if (response.data.user.role === "user") {
                navigate("/login")
            }
            toast.success("Account Created Successfully")
        } catch (error: any) {
            const responseData = error?.response?.data;

            // Handle validation errors with field-specific messages
            if (responseData?.errors) {
                const firstErrorKey = Object.keys(responseData.errors)[0];
                const firstError = responseData.errors[firstErrorKey];
                const fieldName = firstErrorKey
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim();

                if (Array.isArray(firstError) && firstError.length > 0) {
                    toast.error(`${fieldName}: ${firstError[0]}`);
                } else {
                    toast.error(responseData?.message || "Please check your input and try again.");
                }
            } else {
                // Handle other errors
                const errorMessage = responseData?.message ||
                    error?.message ||
                    "Unable to create your account. Please try again.";
                toast.error(errorMessage);
            }
        }
    };

    return (
        <div
            className="relative h-screen w-screen overflow-hidden bg-cover"
            style={{ backgroundImage: `url(${login})` }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${loginLayer})` }}
            >
            </div>
            <div className="grid lg:grid-cols-2 gap-4 h-full relative">

                <div className="flex justify-center items-center min-h-screen px-4 py-4">
                    <div
                        style={{ backgroundImage: `url(${loginformbg})` }}
                        className="max-w-[600px] w-full rounded-xl shadow-md z-10 max-h-[90vh] overflow-auto"
                    >
                        <div className="px-8 py-10">
                            <img src={proactivelogo} alt="proactivelogo" className="w-40 h-10" />
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text text-3xl font-bold px-8">
                                Welcome Back
                            </h1>
                            <p className="text-[#221E33] text-[14px] mt-2">
                                Sign up to continue your adventure journey
                            </p>
                        </div>

                        <div className="px-16 py-10">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Email Address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="FirstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            First Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="First Name"
                                                                placeholder="Enter your First Name"
                                                                {...field}
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="LastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            Last Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="Last Name"
                                                                placeholder="Enter your Last Name"
                                                                {...field}
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="NickName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            Nick Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="Nick Name"
                                                                placeholder="Enter your Nick Name"
                                                                {...field}
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="PhoneNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            Phone Number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="Phone Number"
                                                                placeholder="Enter your Phone Number"
                                                                {...field}
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="DOB"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            DOB
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Popover {...field} open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        id="date"
                                                                        className="w-full justify-between text-[#242E2F] bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5"
                                                                    >
                                                                        {date ? date.toLocaleDateString() : "Select date"}
                                                                        <ChevronDownIcon />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={date}
                                                                        captionLayout="dropdown"
                                                                        onSelect={(selectedDate) => {
                                                                            setDate(selectedDate);
                                                                            field.onChange(selectedDate?.toISOString().split("T")[0]);
                                                                            setOpen(false);
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            {/* <Input
                                                                placeholder="Enter your DOB"
                                                                {...field}
                                                                type="date"
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            /> */}
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="Gender"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            Gender
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                <SelectTrigger {...field} className="md:w-[220px] w-full py-5 bg-[#FAFAFE] border border-[#EFEFEF]">
                                                                    <SelectValue placeholder="Select a Gender" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Select Gender</SelectLabel>
                                                                        <SelectItem value="Male">Male</SelectItem>
                                                                        <SelectItem value="Female">Female</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="Address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="Address"
                                                            placeholder="Enter your Address"
                                                            {...field}
                                                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="EmergencyContact"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            Emergency Contact
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder="Enter emergency contact"
                                                                {...field}
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="DNI"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            DNI
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder="Enter your DNI"
                                                                {...field}
                                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="DietRestrictions"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Diet Restrictions
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter any diet restrictions (optional)"
                                                            {...field}
                                                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter your password"
                                                            {...field}
                                                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-8">
                                        <Button className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 w-full rounded-full py-6 cursor-pointer font-semibold transition-all delay-150 duration-200 ease-in">
                                            {
                                                createUserMutation.isPending ? "...Loading" : "Sign Up"
                                            }
                                        </Button>
                                    </div>

                                    <div className="flex items-center mt-4 space-x-4">
                                        <div className="flex-1 h-[0.2px] bg-[#97A4A4]" />
                                        <span className="text-[#97A4A4] text-[12px]">Or</span>
                                        <div className="flex-1 h-[0.2px] bg-[#97A4A4]" />
                                    </div>
                                </form>
                            </Form>

                            <div className="mt-4">
                                <Button onClick={() => mutate()} disabled={isPending} className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#221E33] font-bold hover:scale-105 w-full rounded-full py-6 cursor-pointer transition-all delay-150 duration-200 ease-in flex items-center justify-center gap-2">
                                    <img src={google} alt="google" />
                                    {isPending ? "..." : "Continue with Google"}
                                </Button>
                            </div>

                            <div className="mt-6 mb-10">
                                <p className="text-center text-[12px]">
                                    Already have an account?
                                    <span onClick={() => navigate("/login")} className="text-[#0DAC87] underline font-semibold cursor-pointer mx-1">
                                        Sign In
                                    </span>
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="lg:flex lg:flex-col justify-end items-center lg:mb-16 px-8 py-8">
                    <div className="flex flex-col gap-4 justify-center items-center text-center">
                        <span className="text-[#F7ECBE] lg:text-5xl text-xl font-bold">
                            Adventure Awaits
                        </span>
                        <span className="text-[#FFFFFF] lg:text-[18px] lg:tracking-tighter">Join thousands of adventurers exploring the world's <br /> most incredible destinations</span>
                    </div>
                    <div className="grid lg:grid-cols-3 mt-8 lg:gap-2 gap-3">
                        <div className="bg-linear-to-b from-[#000000]/63 to-[#00000000]/0 px-14 py-4 border border-[#FFFFFF]/20 rounded-lg">
                            <div className="flex flex-col text-center">
                                <span className="text-4xl text-white font-bold">150+</span>
                                <span className="text-md text-white">Adventures</span>
                            </div>
                        </div>
                        <div className="bg-linear-to-b from-[#000000]/63 to-[#00000000]/0  py-4 border border-[#FFFFFF]/20 rounded-lg">
                            <div className="flex flex-col text-center">
                                <span className="text-4xl text-white font-bold">2500+</span>
                                <span className="text-md text-white">Members</span>
                            </div>
                        </div>
                        <div className="bg-linear-to-b from-[#000000]/63 to-[#00000000]/0 py-4 border border-[#FFFFFF]/20 rounded-lg">
                            <div className="flex flex-col text-center">
                                <span className="text-4xl text-white font-bold">50+</span>
                                <span className="text-md text-white">Countries Visited</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup