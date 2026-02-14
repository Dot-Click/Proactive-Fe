import login from "../../assets/login.png"
import loginLayer from "../../assets/loginLayer.png"
import loginformbg from "../../assets/loginformbg.png"
import proactivelogo from "../../assets/proactive-logo.png"
// --- Manual code entry: no longer used; user verifies by clicking link only ---
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import z from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "../ui/button";
import { UseVerifytokenhook } from "@/hooks/UseVerifytokenhook";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

// const TokenSchema = z.object({
//   token: z.string().min(1, "Token is required"),
// })

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const [isAutoVerifying, setIsAutoVerifying] = useState(false);

  // showCodeForm commented out - no manual code entry, only link click
  // const [showCodeForm, setShowCodeForm] = useState(!tokenFromUrl);
  // type TokenSchemaType = z.infer<typeof TokenSchema>
  // const form = useForm<TokenSchemaType>({
  //   resolver: zodResolver(TokenSchema) as any,
  //   defaultValues: { token: tokenFromUrl || "" },
  // });

  const VerifytokenMutation = UseVerifytokenhook()

  // Auto-verify when user clicks link in email (token in URL) – no code entry needed
  useEffect(() => {
    if (tokenFromUrl) {
      setIsAutoVerifying(true);
      VerifytokenMutation.mutate(
        { token: tokenFromUrl },
        {
          onSuccess: () => {
            setIsAutoVerifying(false);
          },
          onError: () => {
            setIsAutoVerifying(false);
            // No code form – user must use the link from email
            // setShowCodeForm(true);
            // form.setValue("token", tokenFromUrl);
          },
        }
      );
    }
  }, [tokenFromUrl]);

  // Manual code submit – commented out; verification only via link click
  // const onSubmit = async (val: z.infer<typeof TokenSchema>) => {
  //   const { token } = val
  //   try {
  //     await VerifytokenMutation.mutateAsync({ token })
  //   } catch (error: any) {
  //     const message = error?.response?.data?.message || "Failed to verify email";
  //     toast.error(message)
  //   }
  // };

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
                Email Verification
              </h1>
              <p className="text-[#221E33] text-[14px] mt-2 text-center px-4">
                {isAutoVerifying
                  ? "Verifying your email..."
                  : tokenFromUrl
                    ? "Verifying..."
                    : "Check your email and click the link to verify. No code to enter."}
              </p>
            </div>

            <div className="px-16 py-10">
              {isAutoVerifying ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoaderIcon className="animate-spin h-12 w-12 text-[#0DAC87] mb-4" />
                  <p className="text-[#221E33] text-sm">Verifying your email address...</p>
                </div>
              ) : !tokenFromUrl ? (
                <p className="text-[#221E33] text-sm text-center py-6">
                  We sent you a verification link. Open your email and click the link to verify your account.
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:flex lg:flex-col justify-end items-center lg:mb-24 px-8 py-8">
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

export default VerifyEmail