import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Camera from "../../../assets/Camera.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UpdatePassword from "./UpdatePassword";
import NotificationPreferences from "./NotificationPreferences";
import { UsegetCoordinatorSetting } from "@/hooks/getCoordinatorSettinghook";
import { UseupdateCoordinatorSetting } from "@/hooks/updateCoordinatorSettinghook";

const formSchema = z.object({
  Name: z.string().min(1, {
    message: "Name is required",
  }),
  Email: z.string().email({ message: "Invalid email address" }),
});

const Setting = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const { data: settingsData, isLoading } = UsegetCoordinatorSetting();
  const { mutate: updateSettings, isPending } = UseupdateCoordinatorSetting();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      Name: "",
      Email: "",
    },
  });

  const [profile, setProfile] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  // Update form when settings data is loaded
  useEffect(() => {
    if (settingsData) {
      form.reset({
        Name: settingsData.fullName || "",
        Email: settingsData.email || "",
      });
      if (settingsData.avatar) {
        setProfile(settingsData.avatar);
      }
    }
  }, [settingsData, form]);

  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfile(URL.createObjectURL(file));
    }
  };

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("Name", val.Name);
    formData.append("Email", val.Email);

    if (profileFile) {
      formData.append("prof_pic", profileFile);
    }

    updateSettings(formData);
  };

  return (
    <>
      <div className="bg-white lg:mt-4 rounded-[25px]">
        <div className="bg-[#FAFAFA] px-6 py-6 rounded-tl-[25px] rounded-tr-[25px] font-medium">
          <span className="bg-gradient-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text">
            Update Profile
          </span>
        </div>

        <div className="flex mt-6 gap-3 items-center lg:justify-start justify-center px-6">
          <Avatar className="w-20 h-20">
            <AvatarImage
              className="object-cover"
              src={profile || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input
            onChange={HandleuploadProfile}
            type="file"
            id="coordinatorphoto"
            className="hidden"
            accept="image/*"
          />
          <Button
            type="button"
            className="rounded-full w-42"
            disabled={isLoading}
          >
            <label
              htmlFor="coordinatorphoto"
              className="flex gap-2 items-center cursor-pointer"
            >
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
                          disabled={true}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="mt-4 rounded-full px-6 py-4 bg-[#0DAC87] hover:bg-[#0f9c7b] cursor-pointer"
                disabled={isPending || isLoading}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <UpdatePassword />
      <NotificationPreferences />
    </>
  );
};

export default Setting;
