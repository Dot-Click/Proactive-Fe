import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import arrowBack from "../../../assets/sidebaricon/arrow.png";
import imgupload from "../../../assets/sidebaricon/imgupload.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCreateCoordinator } from "@/hooks/UseCreateCoordinator";
import { toast } from "sonner";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required" })
      .refine((val) => /^[0-9]{10,15}$/.test(val), {
        message: "Enter a valid phone number",
      }),
    bio: z.string().min(2, {
      message: "Bio must be at least 2 characters.",
    }),
    specialities: z.array(z.string()).min(1, {
      message: "Select at least one speciality",
    }),
    languages: z.array(z.string()).min(1, {
      message: "Select at least one language",
    }),
    certificateLvl: z.string().min(1, {
      message: "Select at least one certificate",
    }),
    yearsOfExperience: z.coerce.number().min(1, {
      message: "Experience is required",
    }),
    location: z.string().optional(),
    type: z.string().min(1, {
      message: "Select Coordinator type",
    }),
    accessLvl: z.string().min(1, {
      message: "Select Permission",
    }),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
      .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
    confirmPassword: z.string()
      .min(8, "Confirm Password must be at least 8 characters long")
      .refine((val) => /[A-Z]/.test(val), "Confirm Password must contain at least one uppercase letter")
      .refine((val) => /[0-9]/.test(val), "Confirm Password must contain at least one number")
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Confirm Password must contain at least one special character"),
    profilePicture: z
      .instanceof(File).optional().nullable()
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, "File must be less than 5MB")
      .refine(
        (file) => !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
        "Only JPEG or PNG files are allowed"
      )
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const AddnewCoordinator = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      bio: "",
      specialities: [],
      languages: [],
      certificateLvl: "",
      yearsOfExperience: 0,
      location: "",
      type: "",
      accessLvl: "",
      password: "",
      confirmPassword: "",
      profilePicture: null,
    },
  });

  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState<File | undefined>(undefined);
  const [profilePreview, setProfilePreview] = useState<string>("");

  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
      form.setValue("profilePicture", file);
    }
  };
  const CreateCoordinatorMutation:any = useCreateCoordinator();
  const onSubmit = async (val: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    
    // Create coordinatorDetails object as required by API
    const coordinatorDetails = {
      fullName: val.fullName,
      phoneNumber: val.phoneNumber,
      bio: val.bio,
      certificateLvl: val.certificateLvl,
      yearsOfExperience: val.yearsOfExperience,
      type: val.type,
      accessLvl: val.accessLvl,
      specialities: val.specialities,
      languages: val.languages,
      ...(val.location && { location: val.location })
    };
    
    formData.append("coordinatorDetails", JSON.stringify(coordinatorDetails));
    formData.append("email", val.email);
    formData.append("password", val.password);
    
    // Only append profile picture if it exists
    if (profileFile) {
      formData.append("prof_pic", profileFile);
    }

    // Also append individual fields — some backends validate multipart fields directly
    formData.append("fullName", val.fullName);
    formData.append("phoneNumber", val.phoneNumber);
    formData.append("bio", val.bio);
    formData.append("certificateLvl", val.certificateLvl);
    formData.append("yearsOfExperience", String(val.yearsOfExperience));
    formData.append("type", val.type);
    formData.append("accessLvl", val.accessLvl);
    if (val.location) formData.append("location", val.location);
    formData.append("specialities", JSON.stringify(val.specialities));
    formData.append("languages", JSON.stringify(val.languages));

    // Debug: preview form data values (non-file parts) so we can see what's sent
    try {
      const preview: Record<string, any> = {};
      formData.forEach((value, key) => {
        if (value instanceof File) {
          preview[key] = { name: value.name, size: value.size, type: value.type };
        } else {
          preview[key] = value;
        }
      });
      // eslint-disable-next-line no-console
      console.debug("CreateCoordinator submit preview:", preview);

      const response = await CreateCoordinatorMutation.mutateAsync(formData);
      // eslint-disable-next-line no-console
      console.debug("CreateCoordinator response:", response);
      toast.success("Coordinator added successfully");
      form.reset();
      setProfileFile(undefined);
      setProfilePreview("");
    } catch (err: any) {
      // Log full error to console for debugging
      // eslint-disable-next-line no-console
      console.error("CreateCoordinator failed:", err);
      const status = err?.response?.status;
      const data = err?.response?.data;
      const message = data?.message || data || err?.message || "Something went wrong";
      toast.error(`Error${status ? ` (${status})` : ""}: ${message}`);
    }

  };

  return (
    <div>
      <Button
        onClick={() => navigate("/dashboard/coordinator-management")}
        className="flex bg-white text-[#606066] font-semibold h-11 w-28 rounded-full mt-6 hover:bg-white cursor-pointer"
      >
        <img src={arrowBack} alt="arrowBack" />
        Back
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* ========== Section 1: Coordinator Information ========== */}
          <div className="bg-white mt-3 rounded-[25px]">
            <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
              <h1 className="text-[#221E33] font-semibold text-[22px]">
                Coordinator Information
              </h1>
            </div>

            <div className="px-10 py-6">
              <span className="text-[#242E2F] font-semibold text-[16px]">
                Upload Profile
              </span>

              <div className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#221E33] rounded-[10px] mt-4 w-[220px] h-[220px] md:w-[200px] md:h-[200px] overflow-hidden">
                <input
                  type="file"
                  id="coordinatorProfile"
                  className="hidden"
                  onChange={HandleuploadProfile}
                />

                <label
                  htmlFor="coordinatorProfile"
                  className="block w-full h-full cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="profile"
                        className="w-full h-full object-cover object-center rounded-[10px]"
                      />
                    ) : (
                      <>
                        <img src={imgupload} alt="upload" width={80} className="" />
                        <span className="mt-6 text-[#242E2F] text-[14px] text-center">
                          Image must be <br /> 500px by 500px
                        </span>
                      </>
                    )}
                  </div>
                </label>
              </div>

            </div>

            <div className="px-10">
              <div className="grid md:grid-cols-2 gap-4 pb-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Full Name"
                          {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
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
                          placeholder="Enter Email"
                          {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          country={"us"}
                          specialLabel=""
                          placeholder="Phone Number"
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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Bio"
                          {...field}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* ========== Section 2: Professional Details ========== */}
          <div className="bg-white mt-3 rounded-[25px]">
            <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
              <h1 className="text-[#221E33] font-semibold text-[22px]">
                Professional Details
              </h1>
            </div>

            <div className="px-10 py-6 flex flex-col gap-5">
              {/* Specialties */}
              <FormField
                control={form.control}
                name="specialities"
                render={({ field }) => {
                  const selected = field.value || [];
                  const toggle = (item: string) =>
                    selected.includes(item)
                      ? field.onChange(selected.filter((s) => s !== item))
                      : field.onChange([...selected, item]);

                  const options = [
                    "Adventure Travel",
                    "Cultural Tours",
                    "Outdoor Activities",
                    "Photography",
                    "Wildlife & Nature",
                    "Historical Sites",
                    "Mountain Trekking",
                    "Urban Exploration",
                    "Beach & Coastal",
                  ];

                  return (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold mb-3">
                        Specialties
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-3 flex-wrap">
                          {options.map((item) => (
                            <Badge
                              key={item}
                              onClick={() => toggle(item)}
                              className={`cursor-pointer rounded-[6px] px-3 py-2 ${selected.includes(item)
                                ? "bg-[#0DAC87] text-white"
                                : "border border-[#666373] text-[#666373] bg-transparent"
                                }`}
                            >
                              {
                                selected.includes(item) ? <span className="flex items-center gap-1"><Check size={14} /> {item}</span> : item
                              }
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Languages */}
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => {
                  const selected = field.value || [];
                  const toggle = (lang: string) =>
                    selected.includes(lang)
                      ? field.onChange(selected.filter((l) => l !== lang))
                      : field.onChange([...selected, lang]);

                  const langs = [
                    "English",
                    "French",
                    "Spanish",
                    "German",
                    "Italian",
                    "Dutch",
                    "Russian",
                  ];

                  return (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold mb-3">
                        Languages
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-3 flex-wrap">
                          {langs.map((lang) => (
                            <Badge
                              key={lang}
                              onClick={() => toggle(lang)}
                              className={`cursor-pointer rounded-[6px] px-6 py-2 ${selected.includes(lang)
                                ? "bg-[#0DAC87] text-white"
                                : "border border-[#666373] text-[#666373] bg-transparent"
                                }`}
                            >
                              {
                                selected.includes(lang) ? <span className="flex items-center gap-1"><Check size={14} /> {lang}</span> : lang
                              }
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="px-10 grid md:grid-cols-2 gap-4 pb-6">
              {/* Certificate */}
              <FormField
                control={form.control}
                name="certificateLvl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Certification Level
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                          <SelectValue placeholder="Select Certificate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experience */}
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Years of Experience
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="00"
                        {...field}
                        className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Location"
                        {...field}
                        className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ========== Section 3: Role & Permissions ========== */}

          <div className="bg-white mt-3 rounded-[25px]">

            <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
              <h1 className="text-[#221E33] font-semibold text-[22px]">
                Role & Permissions
              </h1>
            </div>

            <div className="px-8 py-6 grid md:grid-cols-2 gap-4 pb-6">
              {/* Coordinator Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Coordinator Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Logistics">Logistics</SelectItem>
                          <SelectItem value="Accommodation">Accommodation</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Tour Guide">Tour Guide</SelectItem>
                          <SelectItem value="Event Management">Event Management</SelectItem>
                          <SelectItem value="Photography">Photography</SelectItem>
                          <SelectItem value="Communication">Communication</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Access Level */}
              <FormField
                control={form.control}
                name="accessLvl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Access Level
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                          <SelectValue placeholder="Set Permissions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                          <SelectItem value="Restricted">Restricted</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ========== Section 4: Set Credentials ========== */}
          <div className="bg-white mt-3 rounded-[25px]">
            <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
              <h1 className="text-[#221E33] font-semibold text-[22px]">
                Set Credential
              </h1>
            </div>

            <div className="px-8 py-6 grid md:grid-cols-2 gap-4 pb-6">
              {/* Password */}
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
                        placeholder="Enter Password"
                        {...field}
                        className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                        className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end mt-20 px-8 pb-6">
              <Button
                type="button"
                onClick={() => {
                  // Ensure we always call react-hook-form's submit handler and log the click
                  // Provide an onInvalid handler so validation errors are surfaced to console/toast
                  // eslint-disable-next-line no-console
                  console.debug("Save Coordinator clicked");
                  const onInvalid = (errors: any) => {
                    // eslint-disable-next-line no-console
                    console.debug("Validation errors:", errors);
                    toast.error("Please fix highlighted validation errors");
                  };
                  form.handleSubmit(onSubmit, onInvalid)();
                }}
                className="rounded-full px-8 py-6 font-medium cursor-pointer"
              >
                {CreateCoordinatorMutation.isLoading ? "Adding..." : "Save Coordinator"}

              </Button>
            </div>
          </div>


        </form>
      </Form>
    </div>
  );
};

export default AddnewCoordinator;
