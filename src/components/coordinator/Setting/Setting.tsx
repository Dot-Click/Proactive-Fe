import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Camera from "../../../assets/Camera.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const formSchema = z
  .object({
    Name: z.string().min(1, {
      message: "Name is required",
    }),
    Email: z.string().email({ message: "Invalid email address" }),
    CurrentPassword: z.string().min(1, {
      message: "Current Password is required",
    }),
    NewPassword: z.string().min(1, {
      message: "New Password is required",
    }),
    ConfirmNewPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })

const Setting = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      Name: "",
      Email: "",
      CurrentPassword: "",
      NewPassword: "",
      ConfirmNewPassword: ""
    },
  });

  const [profile, setProfile] = useState("");

  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProfile(file ? URL.createObjectURL(file) : "");
  };

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    console.log(val);
  };


  return (
    <>
      <div className="bg-white lg:mt-4 rounded-[25px]">
        <div className="bg-[#FAFAFA] px-6 py-6 rounded-tl-[25px] rounded-tr-[25px] font-medium">
          <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Update Profile</span>
        </div>

        <div className="flex mt-6 gap-3 items-center lg:justify-start justify-center px-6">
          <Avatar className="w-20 h-20">
            <AvatarImage className="object-cover" src={profile ? profile : "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input onChange={HandleuploadProfile} type="file" id="coordinatorphoto" className="hidden" />
          <Button type="button" className="rounded-full w-42">
            <label htmlFor="coordinatorphoto" className="flex gap-2 items-center cursor-pointer">
              {/* <Camera strokeWidth={3} size={60} /> */}
              <img src={Camera} alt="Camera" width={16} />
              Change Photo
            </label>
          </Button>
        </div>

        <div className="px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-2 grid lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Maria Rodriguez"
                          {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Coordinator@proactivefuture.com"
                          {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="mt-4 rounded-full px-6 py-4 bg-[#0DAC87] hover:bg-[#0f9c7b] cursor-pointer">Save Changes</Button>
            </form>
          </Form>
        </div>


      </div>

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
              <Button className="mt-6 rounded-full px-6 py-4 cursor-pointer">Update Password</Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="bg-white mt-3 rounded-[25px]">
        <div className="bg-[#FAFAFA] px-6 py-6 rounded-tl-[25px] rounded-tr-[25px] font-medium">
          <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">Notification Preferences</span>
        </div>
        <div className="flex flex-col gap-6 px-6 py-6">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium">Email Notifications</span>
              <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium text-[12px]">Receive email updates about applications and trips</span>
            </div>
            <Switch className="w-12" />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium">Application Alerts</span>
              <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium text-[12px]">Get notified when new applications are submitted</span>
            </div>
            <Switch className="w-12" />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium">Review Notifications</span>
              <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-medium text-[12px]">Alerts when participants submit reviews</span>
            </div>
            <Switch className="w-12" />
          </div>
          <div>
          <Button className="rounded-full px-6 py-4 cursor-pointer">Save Preferences</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Setting