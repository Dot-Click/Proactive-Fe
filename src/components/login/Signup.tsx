import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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

const allowedGenders = ["Male", "Female", "Other"] as const;

const Signup = () => {
    const { t } = useTranslation();
    const SignupSchema = useMemo(() => z.object({
        FirstName: z.string().min(2, t("auth.errors.somethingWentWrong")), // Fallback or more specific if needed
        LastName: z.string().min(2, t("auth.errors.somethingWentWrong")),
        NickName: z.string().optional(),
        PhoneNumber: z.string().regex(/^\+?\d{9,15}$/, t("auth.errors.somethingWentWrong")),
        DOB: z.string()
            .min(1, t("auth.errors.somethingWentWrong"))
            .regex(/^\d{4}-\d{2}-\d{2}$/, t("auth.errors.somethingWentWrong")),
        Gender: z.enum(allowedGenders, { message: t("auth.signup.selectGender") }),
        Address: z.string().min(1, t("auth.errors.somethingWentWrong")),
        EmergencyContact: z.string().max(100).optional(),
        DNI: z.string().max(50).optional(),
        DietRestrictions: z.string().max(200).optional(),
        email: z.string().email(t("auth.errors.invalidEmail")),
        Password: z.string()
            .min(8, t("auth.errors.passwordMin"))
            .refine((val) => /[A-Z]/.test(val), t("auth.errors.passwordUpper"))
            .refine((val) => /[0-9]/.test(val), t("auth.errors.passwordNumber"))
            .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), t("auth.errors.passwordSpecial")),
    }), [t]);

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema) as any,
        defaultValues: {
            FirstName: "",
            LastName: "",
            NickName: "",
            PhoneNumber: "",
            DOB: "",
            Gender: undefined,
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
            toast.success(t("applicationForm.successToast")); // Reusing a success message or defining new one
        } catch (error: any) {
            const message = error?.response?.data?.message || t("auth.errors.somethingWentWrong");
            toast.error(message);
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
                                {t("auth.signup.createAccount")}
                            </h1>
                            <p className="text-[#221E33] text-[14px] mt-2">
                                {t("auth.signup.signUpSubtitle")}
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
                                                        {t("auth.login.email")}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder={t("auth.login.emailPlaceholder")}
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
                                                            {t("auth.signup.firstName")}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder={t("auth.signup.firstName")}
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
                                                            {t("auth.signup.lastName")}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder={t("auth.signup.lastName")}
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
                                                            {t("auth.signup.dob")}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Popover {...field} open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        id="date"
                                                                        className="w-full justify-between text-[#242E2F] bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5"
                                                                    >
                                                                        {date ? date.toLocaleDateString() : t("auth.signup.selectDate")}
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
                                                            {t("auth.signup.gender")}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                <SelectTrigger {...field} className="md:w-[220px] w-full py-5 bg-[#FAFAFE] border border-[#EFEFEF]">
                                                                    <SelectValue placeholder={t("auth.signup.selectGender")} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>{t("auth.signup.selectGender")}</SelectLabel>
                                                                        <SelectItem value="Male">{t("auth.signup.genders.male")}</SelectItem>
                                                                        <SelectItem value="Female">{t("auth.signup.genders.female")}</SelectItem>
                                                                        <SelectItem value="Other">{t("auth.signup.genders.other")}</SelectItem>
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
                                                createUserMutation.isPending ? t("auth.signup.creatingAccount") : t("auth.signup.signUp")
                                            }
                                        </Button>
                                    </div>

                                    <div className="flex items-center mt-4 space-x-4">
                                        <div className="flex-1 h-[0.2px] bg-[#97A4A4]" />
                                        <span className="text-[#97A4A4] text-[12px]">{t("auth.login.or")}</span>
                                        <div className="flex-1 h-[0.2px] bg-[#97A4A4]" />
                                    </div>
                                </form>
                            </Form>

                            <div className="mt-4">
                                <Button onClick={() => mutate()} disabled={isPending} className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#221E33] font-bold hover:scale-105 w-full rounded-full py-6 cursor-pointer transition-all delay-150 duration-200 ease-in flex items-center justify-center gap-2">
                                    <img src={google} alt="google" />
                                    {isPending ? "..." : t("auth.login.continueWithGoogle")}
                                </Button>
                            </div>

                            <div className="mt-6 mb-10">
                                <p className="text-center text-[12px]">
                                    {t("auth.signup.alreadyHaveAccount")}
                                    <span onClick={() => navigate("/login")} className="text-[#0DAC87] underline font-semibold cursor-pointer mx-1">
                                        {t("auth.signup.logIn")}
                                    </span>
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="lg:flex lg:flex-col justify-end items-center lg:mb-16 px-8 py-8">
                    <div className="flex flex-col gap-4 justify-center items-center text-center">
                        <span className="text-[#F7ECBE] lg:text-5xl text-xl font-bold">
                            {t("auth.login.adventureAwaits")}
                        </span>
                        <span className="text-[#FFFFFF] lg:text-[18px] lg:tracking-tighter">{t("auth.login.adventureSubtitle")}</span>
                    </div>
                    <div className="grid lg:grid-cols-3 mt-8 lg:gap-2 gap-3">
                        <div className="bg-linear-to-b from-[#000000]/63 to-[#00000000]/0 px-14 py-4 border border-[#FFFFFF]/20 rounded-lg">
                            <div className="flex flex-col text-center">
                                <span className="text-4xl text-white font-bold">150+</span>
                                <span className="text-md text-white">{t("auth.login.adventures")}</span>
                            </div>
                        </div>
                        <div className="bg-linear-to-b from-[#000000]/63 to-[#00000000]/0  py-4 border border-[#FFFFFF]/20 rounded-lg">
                            <div className="flex flex-col text-center">
                                <span className="text-4xl text-white font-bold">2500+</span>
                                <span className="text-md text-white">{t("auth.login.members")}</span>
                            </div>
                        </div>
                        <div className="bg-linear-to-b from-[#000000]/63 to-[#00000000]/0 py-4 border border-[#FFFFFF]/20 rounded-lg">
                            <div className="flex flex-col text-center">
                                <span className="text-4xl text-white font-bold">50+</span>
                                <span className="text-md text-white">{t("auth.login.countriesVisited")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup