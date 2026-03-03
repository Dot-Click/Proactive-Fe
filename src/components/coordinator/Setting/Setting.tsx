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
import { Textarea } from "@/components/ui/textarea";
import UpdatePassword from "./UpdatePassword";
import NotificationPreferences from "./NotificationPreferences";
import { UsegetCoordinatorSetting } from "@/hooks/getCoordinatorSettinghook";
import { UseupdateCoordinatorSetting } from "@/hooks/updateCoordinatorSettinghook";

const formSchema = z.object({
  Name: z.string().min(1, {
    message: "Name is required",
  }),
  Email: z.string().email({ message: "Invalid email address" }),
  PhoneNumber: z.string().optional(),
  Bio: z.string().optional(),
});

const Setting = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const { data: settingsData, isLoading, isError, error } = UsegetCoordinatorSetting();
  const { mutate: updateSettings, isPending } = UseupdateCoordinatorSetting();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      Name: "",
      Email: "",
      PhoneNumber: "",
      Bio: "",
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
        PhoneNumber: settingsData.phoneNumber || "",
        Bio: settingsData.bio || "",
      });
      if (settingsData.avatar) {
        setProfile(settingsData.avatar);
      }
      if (settingsData.notificationPref) {
        setPrefs(settingsData.notificationPref);
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
    if (val.PhoneNumber) formData.append("PhoneNumber", val.PhoneNumber);
    if (val.Bio) formData.append("Bio", val.Bio);

    if (profileFile) {
      formData.append("prof_pic", profileFile);
    }

    updateSettings(formData);
  };

  // local state for notification toggles
  const [prefs, setPrefs] = useState<{
    emailNotf: boolean;
    appAlert: boolean;
    reviewNotf: boolean;
  }>({ emailNotf: false, appAlert: false, reviewNotf: false });

  const handleSavePreferences = () => {
    updateSettings({ notificationPref: prefs });
  };

  return (
    <>
      {isLoading && (
        <div className="bg-white lg:mt-4 rounded-[25px] p-8 flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0DAC87]/30 border-t-[#0DAC87] rounded-full animate-spin" />
            <p className="text-[#666373] font-medium">Loading settings...</p>
          </div>
        </div>
      )}

      {isError && (
        <div className="bg-white lg:mt-4 rounded-[25px] p-8 flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <p className="text-red-500 font-semibold">Failed to load settings</p>
            <p className="text-[#666373] text-sm">{(error as any)?.response?.data?.message || "Please try refreshing the page"}</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
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
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* additional personal fields */}
              <div className="mt-4 grid lg:grid-cols-2 gap-6">
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
                          placeholder="+123456789"
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
                  name="Bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short bio about yourself"
                          {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33] h-32 resize-none"
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
      <NotificationPreferences
        initial={prefs}
        onSave={handleSavePreferences}
      />
        </>
      )}
    </>
  );
};

export default Setting;
