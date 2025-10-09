import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import arrowBack from "../../../assets/sidebaricon/arrow.png"
import imgupload from "../../../assets/sidebaricon/imgupload.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email({ message: "Invalid email address" }),
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .refine((val) => /^[0-9]{10,15}$/.test(val), {
      message: "Enter a valid phone number",
    }),
  Bio: z.string().min(2, {
    message: "Bio must be at least 2 characters."
  }),
  certificate: z.string().min(1, {
    message: "Select at least one certificate",
  }),
  experience: z.number().min(1, {
    message: "Minimum One Year Experience",
  })
})


const AddnewCoordinator = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      Bio: "",
      certificate: "",
      experience: 0
    },
  })

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    console.log(val);
  }
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate("/dashboard/coordinator-management")} className="flex bg-white text-[#606066] font-semibold h-11 w-28 rounded-full mt-6 hover:bg-white cursor-pointer">
        <img src={arrowBack} alt="arrowBack" />
        Back
      </Button>
      <div className="bg-white mt-3 rounded-[25px]">

        <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
          <h1 className="text-[#221E33] font-semibold text-[22px]">Coordinator Information</h1>
        </div>

        <div className="px-10 py-6">
          <span className="text-[#242E2F] font-semibold text-[16px]">Upload Profile</span>

          <div className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#221E33] rounded-[10px] mt-4 w-[220px] md:w-[200px]">
            <input type="file" id="coordinatorProfile" className="hidden" />

            <label
              htmlFor="coordinatorProfile"
              className="block cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
            >
              <div className="py-6 flex flex-col items-center">
                <img src={imgupload} alt="upload" width={80} />
                <span className="mt-6 text-[#242E2F] text-[14px] text-center">
                  Image must be <br /> 500px by 500px
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-4 pb-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Full Name" {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]" />
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
                      <FormLabel className="text-[#242E2F] font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          country={"us"}
                          specialLabel=""
                          placeholder="Phone Number"
                          enableSearch={false}
                          inputStyle={{
                            width: "100%",
                            height: "52px",
                            backgroundColor: "#FAFAFE",
                            border: "1px solid #EFEFEF",
                            borderRadius: "10px",
                            paddingLeft: "60px",
                            fontSize: "15px",
                            color: "#242E2F",
                          }}
                          buttonStyle={{
                            backgroundColor: "#FAFAFE",
                            borderRight: "1px solid #EFEFEF",
                            border: "1px solid #EFEFEF",
                            borderRadius: "10px 0 0 10px",
                            width: "55px",
                          }}
                          dropdownStyle={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #EFEFEF",
                            borderRadius: "10px",
                          }}
                          // inputClass="focus:ring-0 focus:outline-none"
                          {...field}
                          inputProps={{
                            ref: field.ref,
                            required: true,
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Bio" {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="bg-white mt-3 rounded-[25px]">

        <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
          <h1 className="text-[#221E33] font-semibold text-[22px]">Professional Details</h1>
        </div>

        <div className="px-10 py-6 flex flex-col gap-5">

          <span className="text-[#242E2F] font-semibold text-[16px]">Specialties</span>
          <div className="flex gap-3 flex-wrap">
            <Badge className="rounded-[6px] px-4 py-2 bg-[#0DAC87]">Adventure Travel</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-4 py-2">Cultural Tours</Badge>
            <Badge className="rounded-[6px] px-4 py-2 bg-[#0DAC87]">Outdoor Activities</Badge>
            <Badge className="rounded-[6px] px-4 py-2 bg-[#0DAC87]">Photography</Badge>
            <Badge className="rounded-[6px] px-4 py-2 bg-[#0DAC87]">Wildlife & Nature</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-4 py-2">Wildlife & Nature</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-4 py-2">Historical Sites</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-4 py-2">Mountain Trekking</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-4 py-2">Urban Exploration</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-4 py-2">Beach & Coastal</Badge>
          </div>

          <span className="text-[#242E2F] font-semibold text-[16px] ">Languages</span>
          <div className="flex gap-3 flex-wrap">
            <Badge className="rounded-[6px] px-6 py-2 bg-[#0DAC87]">English</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-6 py-2">French</Badge>
            <Badge className="rounded-[6px] px-6 py-2 bg-[#0DAC87]">Spanish</Badge>
            <Badge className="rounded-[6px] px-6 py-2 bg-[#0DAC87]">German</Badge>
            <Badge className="rounded-[6px] px-6 py-2 bg-[#0DAC87]">Italian</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-6 py-2">Dutch</Badge>
            <Badge variant={'outline'} className="border border-[#666373] text-[#666373] rounded-[6px] px-6 py-2">Russian</Badge>
          </div>
        </div>

        <div className="px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-4 pb-6">
                <FormField
                  control={form.control}
                  name="certificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Certification Level</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger {...field} className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]">
                            <SelectValue placeholder="Select Certificate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Photography">Photography</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                          </SelectContent>
                        </Select>
                        {/* <Input placeholder="Enter Full Name" {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]" /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Years of Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="00" {...field}
                          type="number"
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33] appearance-auto" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

      </div>

      <div className="bg-white mt-3 rounded-[25px]">

        <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
          <h1 className="text-[#221E33] font-semibold text-[22px]">Role & Permissions</h1>
        </div>

        <div className="px-8 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-4 pb-6">
                <FormField
                  control={form.control}
                  name="certificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Coordinator Type</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger {...field} className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Photography">Photography</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                          </SelectContent>
                        </Select>
                        {/* <Input placeholder="Enter Full Name" {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]" /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Access Level</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger {...field} className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]">
                            <SelectValue placeholder="Set Permissions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Photography">Photography</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

      </div>

      <div className="bg-white mt-3 rounded-[25px]">

        <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
          <h1 className="text-[#221E33] font-semibold text-[22px]">Set Credential</h1>
        </div>

        <div className="px-8 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-4 pb-6">
                <FormField
                  control={form.control}
                  name="certificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Password</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                          {...field}
                          type="password"
                          placeholder="Enter Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                          {...field}
                          type="password"
                          placeholder="Enter Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end mt-22">
                <Button type="submit" className="rounded-full px-8 py-6 font-medium cursor-pointer">Save Coordinator</Button>
              </div>
            </form>
          </Form>
        </div>

      </div>

    </div>
  )
}

export default AddnewCoordinator