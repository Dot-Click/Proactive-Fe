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

const SignupSchema = z.object({
    FirstName: z.string().optional(),
    LastName: z.string().optional(),
    NickName: z.string().optional(),
    PhoneNumber: z.string().optional(),
    DOB: z.string().optional(),
    Gender: z.string().optional(),
    Address: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

const onSubmit = (val: z.infer<typeof SignupSchema>) => {
    console.log(val);
};

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
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate()
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
                                                            <Input
                                                                type="DOB"
                                                                placeholder="Enter your DOB"
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
                                                name="Gender"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#242E2F] font-semibold">
                                                            Gender
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="Gender"
                                                                placeholder="Enter your Gender"
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
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
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
                                            Sign Up
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
                                <Button className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#221E33] font-bold hover:scale-105 w-full rounded-full py-6 cursor-pointer transition-all delay-150 duration-200 ease-in flex items-center justify-center gap-2">
                                    <img src={google} alt="google" />
                                    Sign In with Google
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