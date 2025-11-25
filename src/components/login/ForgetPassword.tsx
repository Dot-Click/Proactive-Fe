import login from "../../assets/login.png"
import loginLayer from "../../assets/loginLayer.png"
import loginformbg from "../../assets/loginformbg.png"
import proactivelogo from "../../assets/proactive-logo.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const onSubmit = (val: z.infer<typeof SignupSchema>) => {
  console.log(val);
};

const ForgetPassword = () => {
  type SignupSchemaType = z.infer<typeof SignupSchema>
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema) as any,
    defaultValues: {
      email: "",
    },
  });
const navigate = useNavigate();
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
                Forget Password
              </h1>
              <p className="text-[#221E33] text-[14px] mt-2">
                Please enter your email to reset your password
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
                  </div>
                  <Button type="submit" className="rounded-full cursor-pointer w-full mt-6 bg-[#0DAC87] hover:bg-[#129b7b] text-white px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                    Reset Password
                  </Button>
                  <Button onClick={()=> navigate("/login")} type="button" className="rounded-full cursor-pointer w-full mt-4 bg-transparent border border-[#0DAC87] hover:bg-[#0DAC87] hover:text-white text-[#0DAC87] px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                    Back to Login
                  </Button>
                </form>
              </Form>
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

export default ForgetPassword