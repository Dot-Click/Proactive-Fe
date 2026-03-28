import z from "zod"
import { useMemo } from "react"
import login from "../../assets/login.avif"
import loginLayer from "../../assets/loginLayer.avif"
import loginformbg from "../../assets/loginformbg.avif"
import proactivelogo from "../../assets/proactive-logo.avif"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import google from "../../assets/google.avif"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useLoginUser } from "@/hooks/UseLoginhook"
import { useGoogleSignup } from "@/hooks/useGoogleSignup"
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    
    const LoginSchema = useMemo(() => z.object({
        email: z.string().email(t("auth.errors.invalidEmail")),
        Password: z.string()
            .min(8, t("auth.errors.passwordMin"))
            .refine((val) => /[A-Z]/.test(val), t("auth.errors.passwordUpper"))
            .refine((val) => /[0-9]/.test(val), t("auth.errors.passwordNumber"))
            .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), t("auth.errors.passwordSpecial")),
    }), [t]);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema) as any,
        defaultValues: {
            email: "",
            Password: "",
        },
    });
    const navigate = useNavigate()
    const loginUserMutation = useLoginUser()
    const { mutate, isPending } = useGoogleSignup();
    const onSubmit = async (val: z.infer<typeof LoginSchema>) => {
        let { email, Password } = val
        email = email.trim().toLowerCase();
        try {
            await loginUserMutation.mutateAsync({
                email,
                Password
            })
            // toast.success(response?.data?.message)
        } catch (error: any) {
            const message = error?.response?.data?.message || t("auth.errors.somethingWentWrong");
            toast.error(message);
        }
    };
    return (
        <div
            className="relative min-h-screen w-screen bg-cover"
            style={{ backgroundImage: `url(${login})` }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${loginLayer})` }}
            ></div>

            <div className="relative z-10 grid lg:grid-cols-2 md:grid-cols-1 gap-4 min-h-screen overflow-x-hidden">

                {/* Left Side */}
                <div className="flex justify-center items-center px-8 py-8">
                    <div
                        style={{ backgroundImage: `url(${loginformbg})` }}
                        className="bg-cover max-w-[600px] w-full rounded-xl shadow-md"
                    >
                        <div className="px-8 py-10">
                            <img src={proactivelogo} alt="proactivelogo" className="w-40 h-10" />
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text text-3xl font-bold px-8">
                                {t("auth.login.welcomeBack")}
                            </h1>
                            <p className="text-[#221E33] text-[14px] mt-2">
                                {t("auth.login.signInSubtitle")}
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
                                        <FormField
                                            control={form.control}
                                            name="Password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        {t("auth.login.password")}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder={t("auth.login.passwordPlaceholder")}
                                                            {...field}
                                                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-5 w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="remember-me"
                                                className="border-[#221E33] bg-[#EEEEEE] h-4 w-4"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="text-[#221E33] text-[12px] ml-2 font-medium cursor-pointer"
                                            >
                                                {t("auth.login.rememberMe")}
                                            </label>
                                        </div>
                                        <span onClick={() => navigate("/forgetPassword")} className="text-[12px] font-semibold text-[#0DAC87] underline cursor-pointer">
                                            {t("auth.login.forgotPassword")}
                                        </span>
                                    </div>

                                    <div className="mt-8">
                                        <Button className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-105 w-full rounded-full py-6 cursor-pointer font-semibold transition-all delay-150 duration-200 ease-in">
                                            {
                                                loginUserMutation.isPending ? t("auth.login.signingIn") : t("auth.login.signIn")
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
                                    {t("auth.login.dontHaveAccount")}
                                    <span onClick={() => navigate("/signup")} className="text-[#0DAC87] underline font-semibold cursor-pointer mx-1">
                                        {t("auth.login.signUp")}
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Side */}
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

export default Login