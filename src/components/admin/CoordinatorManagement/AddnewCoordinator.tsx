
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import arrowBack from "../../../assets/sidebaricon/arrow.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInviteCoordinator } from "@/hooks/UseInviteCoordinator";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

const inviteSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const AddnewCoordinator = () => {
  const navigate = useNavigate();
  const InviteMutation = useInviteCoordinator();

  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (val: z.infer<typeof inviteSchema>) => {
    try {
      await InviteMutation.mutateAsync({ email: val.email });
      toast.success("Invitation sent successfully to " + val.email);
      form.reset();
      navigate("/dashboard/coordinator-management");
    } catch (err: any) {
      console.error("Invite failed:", err);
      toast.error(err?.response?.data?.message || "Failed to send invitation");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8 mt-6">
        <Button
          onClick={() => navigate("/dashboard/coordinator-management")}
          className="flex bg-white hover:bg-gray-50 text-[#666373] font-bold h-11 px-6 rounded-full shadow-sm border border-[#EEEEEE] transition-all active:scale-95 cursor-pointer"
        >
          <img src={arrowBack} alt="back" className="mr-2" />
          Back to List
        </Button>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-[#EEEEEE]">
        <div className="bg-[#FAFAFA] px-10 py-8 border-b border-[#EEEEEE]">
          <h1 className="text-3xl font-black text-[#221E33] uppercase tracking-tight">
            Invite New Coordinator
          </h1>
          <p className="text-[#666373] mt-2 font-medium">
            Send an invitation link so the coordinator can set up their own profile.
          </p>
        </div>

        <div className="p-10 md:p-16">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-20 h-20 bg-[#0DAC87]/10 rounded-3xl flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-[#0DAC87]" />
            </div>
            <h2 className="text-xl font-bold text-[#221E33]">Onboarding Flow</h2>
            <p className="text-[#666373] max-w-md mt-2 text-sm">
              The coordinator will receive an email with a secure link to register, upload their photo, and provide their specialties and experience.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#666373] font-bold uppercase text-[10px] tracking-[0.2em]">
                      Coordinator's Professional Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="example@proactive.com"
                          {...field}
                          className="bg-[#FAFAFE] border-2 border-[#EEEEEE] focus:border-[#0DAC87] focus:ring-0 px-6 py-7 rounded-2xl text-[#221E33] font-medium text-lg placeholder:text-gray-300 transition-all"
                        />
                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 w-6 h-6" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[#FF4D4D] font-bold text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={InviteMutation.isPending}
                className="w-full rounded-full bg-[#0DAC87] hover:bg-[#099978] text-white font-black h-16 text-lg uppercase tracking-widest shadow-lg shadow-[#0DAC87]/20 transition-all active:scale-[0.98]"
              >
                {InviteMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Invite...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Invitation
                    <Send className="w-5 h-5 ml-1" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-16 pt-8 border-t border-[#FAFAFA] text-center">
            <p className="text-[#A1A1A1] text-xs font-medium uppercase tracking-[0.1em]">
              Status: Invitation link expires in 48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewCoordinator;












// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import arrowBack from "../../../assets/sidebaricon/arrow.png";
// import imgupload from "../../../assets/sidebaricon/imgupload.png";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import { Check } from "lucide-react";
// import { useCreateCoordinator } from "@/hooks/UseCreateCoordinator";
// import { useInviteCoordinator } from "@/hooks/UseInviteCoordinator";
// import { toast } from "sonner";

// const formSchema = z
//   .object({
//     fullName: z.string().min(2, {
//       message: "Username must be at least 2 characters.",
//     }),
//     email: z.string().email({ message: "Invalid email address" }),
//     phoneNumber: z
//       .string()
//       .min(1, { message: "Phone number is required" })
//       .refine((val) => {
//         // Remove non-digits and check length
//         const digitsOnly = val.replace(/\D/g, '');
//         return digitsOnly.length >= 9 && digitsOnly.length <= 15;
//       }, {
//         message: "Enter a valid phone number (9-15 digits)",
//       }),
//     bio: z.string().min(2, {
//       message: "Bio must be at least 2 characters.",
//     }),
//     specialities: z.array(z.string()).min(1, {
//       message: "Select at least one speciality",
//     }),
//     languages: z.array(z.string()).min(1, {
//       message: "Select at least one language",
//     }),
//     certificateLvl: z.string().min(1, {
//       message: "Select at least one certificate",
//     }),
//     yearsOfExperience: z.coerce.number().min(1, {
//       message: "Experience is required",
//     }),
//     location: z.string().optional(),
//     type: z.string().min(1, {
//       message: "Select Coordinator type",
//     }),
//     accessLvl: z.string().min(1, {
//       message: "Select Permission",
//     }),
//     password: z.string()
//       .min(8, "Password must be at least 8 characters long")
//       .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
//       .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
//       .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
//     confirmPassword: z.string()
//       .min(8, "Confirm Password must be at least 8 characters long")
//       .refine((val) => /[A-Z]/.test(val), "Confirm Password must contain at least one uppercase letter")
//       .refine((val) => /[0-9]/.test(val), "Confirm Password must contain at least one number")
//       .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Confirm Password must contain at least one special character"),
//     profilePicture: z
//       .instanceof(File).optional().nullable()
//       .refine((file) => !file || file.size <= 5 * 1024 * 1024, "File must be less than 5MB")
//       .refine(
//         (file) => !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
//         "Only JPEG or PNG files are allowed"
//       )
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
//   });

// const AddnewCoordinator = () => {
//   type FormSchemaType = z.infer<typeof formSchema>;
//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema) as any,
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       bio: "",
//       specialities: [],
//       languages: [],
//       certificateLvl: "",
//       yearsOfExperience: 0,
//       location: "",
//       type: "",
//       accessLvl: "",
//       password: "",
//       confirmPassword: "",
//       profilePicture: null,
//     },
//   });

//   const navigate = useNavigate();
//   const [profileFile, setProfileFile] = useState<File | undefined>(undefined);
//   const [profilePreview, setProfilePreview] = useState<string>("");

//   const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setProfileFile(file);
//       setProfilePreview(URL.createObjectURL(file));
//       form.setValue("profilePicture", file);
//     }
//   };
  
//   const CreateCoordinatorMutation = useCreateCoordinator();
//   const InviteCoordinatorMutation = useInviteCoordinator();
//   const [inviteOnly, setInviteOnly] = useState(false);
//   const [mode, setMode] = useState<"magic" | "custom">("custom");
//   const [magicEmail, setMagicEmail] = useState("");
//   const [magicPassword, setMagicPassword] = useState("");
  
//   const onSubmit = async (val: z.infer<typeof formSchema>) => {
//     if (inviteOnly) {
//       // Quick invite flow: only email required
//       const email = val.email?.trim().toLowerCase();
//       if (!email) {
//         toast.error("Please provide an email to invite");
//         return;
//       }
//       try {
//         await InviteCoordinatorMutation.mutateAsync({ email });
//         toast.success("Invitation sent");
//         form.reset();
//         navigate("/dashboard/coordinator-management");
//       } catch (err) {
//         // errors handled in hook
//       }
//       return;
//     }
//     // Validate arrays are not empty (should be caught by schema, but double-check)
//     if (!val.specialities || val.specialities.length === 0) {
//       toast.error("Please select at least one speciality");
//       return;
//     }
//     if (!val.languages || val.languages.length === 0) {
//       toast.error("Please select at least one language");
//       return;
//     }

//     const formData = new FormData();

//     // Append each field individually to FormData (NOT as nested JSON)
//     formData.append("fullName", val.fullName.trim());
//     formData.append("email", val.email.trim().toLowerCase());
//     formData.append("password", val.password);
    
//     // Clean phone number - remove all non-digits
//     const cleanPhone = val.phoneNumber.replace(/\D/g, '');
//     if (cleanPhone.length < 9 || cleanPhone.length > 15) {
//       toast.error("Phone number must be between 9 and 15 digits");
//       return;
//     }
//     formData.append("phoneNumber", cleanPhone);
    
//     formData.append("bio", val.bio.trim());
//     formData.append("certificateLvl", val.certificateLvl);
//     formData.append("yearsOfExperience", val.yearsOfExperience.toString());
//     formData.append("type", val.type);
//     formData.append("accessLvl", val.accessLvl);
    
//     // Handle arrays - send as JSON strings since FormData can't send arrays natively
//     // Ensure arrays are properly formatted
//     formData.append("specialities", JSON.stringify(val.specialities));
//     formData.append("languages", JSON.stringify(val.languages));
    
//     // Optional location
//     if (val.location && val.location.trim() !== "") {
//       formData.append("location", val.location.trim());
//     }

//     // Profile picture (optional)
//     if (profileFile) {
//       formData.append("prof_pic", profileFile);
//     }

//     // Debug: preview form data values
//     console.log("=== CREATE COORDINATOR FORM DATA ===");
//     for (const [key, value] of formData.entries()) {
//       if (value instanceof File) {
//         console.log(`${key}: [File] ${value.name} (${value.type})`);
//       } else {
//         console.log(`${key}:`, value);
//       }
//     }

//     try {
//       const response = await CreateCoordinatorMutation.mutateAsync(formData);
//       console.log("CreateCoordinator response:", response);
//       toast.success("Coordinator added successfully");
//       form.reset();
//       setProfileFile(undefined);
//       setProfilePreview("");
//       navigate("/dashboard/coordinator-management");
//     } catch (err: any) {
//       console.error("CreateCoordinator failed:", err);
//       console.error("Error response:", err?.response);
//       console.error("Error data:", err?.response?.data);
//       console.error("Error status:", err?.response?.status);
      
//       const status = err?.response?.status;
//       const data = err?.response?.data;
      
//       // Handle validation errors (400 Bad Request)
//       if (status === 400 && data?.errors && typeof data.errors === 'object') {
//         const errorMessages = Object.entries(data.errors)
//           .map(([field, messages]: [string, any]) => {
//             const msg = Array.isArray(messages) ? messages.join(', ') : String(messages);
//             return `${field}: ${msg}`;
//           })
//           .join('\n');
//         toast.error(`Validation Error:\n${errorMessages}`, { duration: 5000 });
//         return;
//       }
      
//       // Handle conflict errors (409 - email already exists)
//       if (status === 409) {
//         toast.error(data?.message || "A user with this email already exists");
//         return;
//       }
      
//       // Handle other errors
//       const message = data?.message || (typeof data === 'string' ? data : err?.message) || "Something went wrong";
//       toast.error(`Error${status ? ` (${status})` : ""}: ${message}`, { duration: 5000 });
//     }
//   };

//   return (
//     <div>
//       <Button
//         onClick={() => navigate("/dashboard/coordinator-management")}
//         className="flex bg-white text-[#606066] font-semibold h-11 w-28 rounded-full mt-6 hover:bg-white cursor-pointer"
//       >
//         <img src={arrowBack} alt="arrowBack" />
//         Back
//       </Button>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="flex items-center gap-6 mb-4">
//               <div className="flex items-center gap-2">
//                 <input
//                   id="mode_custom"
//                   type="radio"
//                   name="invite_mode"
//                   checked={mode === "custom"}
//                   onChange={() => { setMode("custom"); setInviteOnly(false); }}
//                 />
//                 <label htmlFor="mode_custom" className="text-sm">Custom information</label>
//               </div>
//               <div className="flex items-center gap-2">
//                 <input
//                   id="mode_magic"
//                   type="radio"
//                   name="invite_mode"
//                   checked={mode === "magic"}
//                   onChange={() => { setMode("magic"); setInviteOnly(true); }}
//                 />
//                 <label htmlFor="mode_magic" className="text-sm">Magic link</label>
//               </div>
//             </div>

//             {mode === "magic" && (
//               <div className="bg-white mt-3 rounded-[12px] p-6">
//                 <h2 className="text-lg font-semibold mb-3">Magic Link Invite</h2>
//                 <div className="grid md:grid-cols-2 gap-4 pb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">Email</label>
//                     <input
//                       value={magicEmail}
//                       onChange={(e) => setMagicEmail(e.target.value)}
//                       placeholder="Invite email"
//                       className="mt-1 block w-full rounded border px-3 py-2 bg-[#FAFAFE]"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">Password (optional)</label>
//                     <input
//                       type="password"
//                       value={magicPassword}
//                       onChange={(e) => setMagicPassword(e.target.value)}
//                       placeholder="Temporary password (optional)"
//                       className="mt-1 block w-full rounded border px-3 py-2 bg-[#FAFAFE]"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                     <Button
//                     onClick={async () => {
//                       const email = magicEmail?.trim().toLowerCase();
//                       if (!email) {
//                         toast.error("Please provide an email to invite");
//                         return;
//                       }
//                       try {
//                         // send invite; backend currently expects email, extra fields are ignored
//                         await InviteCoordinatorMutation.mutateAsync({ email, password: magicPassword || undefined });
//                         toast.success("Invitation sent");
//                         setMagicEmail("");
//                         setMagicPassword("");
//                         navigate("/dashboard/coordinator-management");
//                       } catch (err) {
//                         // error handled in hook
//                       }
//                     }}
//                     className="rounded-full px-6 py-2 bg-[#0DAC87] text-white"
//                     disabled={(InviteCoordinatorMutation as any).isPending}
//                   >
//                     {(InviteCoordinatorMutation as any).isPending ? "Sending..." : "Send Invite"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           {/* ========== Section 1: Coordinator Information ========== */}
//           {mode === "custom" && (
//             <>
//             <div className="bg-white mt-3 rounded-[25px]">
//             <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
//               <h1 className="text-[#221E33] font-semibold text-[22px]">
//                 Coordinator Information
//               </h1>
//             </div>

//             <div className="px-10 py-6">
//               <span className="text-[#242E2F] font-semibold text-[16px]">
//                 Upload Profile
//               </span>

//               <div className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#221E33] rounded-[10px] mt-4 w-[220px] h-[220px] md:w-[200px] md:h-[200px] overflow-hidden">
//                 <input
//                   type="file"
//                   id="coordinatorProfile"
//                   className="hidden"
//                   onChange={HandleuploadProfile}
//                   accept="image/*"
//                 />

//                 <label
//                   htmlFor="coordinatorProfile"
//                   className="block w-full h-full cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
//                 >
//                   <div className="flex flex-col items-center justify-center w-full h-full">
//                     {profilePreview ? (
//                       <img
//                         src={profilePreview}
//                         alt="profile"
//                         className="w-full h-full object-cover object-center rounded-[10px]"
//                       />
//                     ) : (
//                       <>
//                         <img src={imgupload} alt="upload" width={80} className="" />
//                         <span className="mt-6 text-[#242E2F] text-[14px] text-center">
//                           Image must be <br /> 500px by 500px
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </label>
//               </div>

//             </div>

//             <div className="px-10">
//               <div className="grid md:grid-cols-2 gap-4 pb-6">
//                 {/* Full Name */}
//                 <FormField
//                   control={form.control}
//                   name="fullName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[#242E2F] font-semibold">
//                         Full Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter Full Name"
//                           {...field}
//                           className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Email */}
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[#242E2F] font-semibold">
//                         Email Address
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter Email"
//                           {...field}
//                           className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Phone */}
//                 <FormField
//                   control={form.control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[#242E2F] font-semibold">
//                         Phone Number
//                       </FormLabel>
//                       <FormControl>
//                         <PhoneInput
//                           country={"us"}
//                           specialLabel=""
//                           placeholder="Phone Number"
//                           value={field.value}
//                           onChange={(phone) => field.onChange(phone)}
//                           inputStyle={{
//                             width: "100%",
//                             height: "52px",
//                             backgroundColor: "#FAFAFE",
//                             border: "1px solid #EFEFEF",
//                             borderRadius: "10px",
//                             paddingLeft: "60px",
//                             fontSize: "15px",
//                             color: "#242E2F",
//                           }}
//                           buttonStyle={{
//                             backgroundColor: "#FAFAFE",
//                             borderRight: "1px solid #EFEFEF",
//                             border: "1px solid #EFEFEF",
//                             borderRadius: "10px 0 0 10px",
//                             width: "55px",
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Bio */}
//                 <FormField
//                   control={form.control}
//                   name="bio"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[#242E2F] font-semibold">
//                         Bio
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter Bio"
//                           {...field}
//                           className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//             </div>

//           {/* ========== Section 2: Professional Details ========== */}
//           <div className="bg-white mt-3 rounded-[25px]">
//             <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
//               <h1 className="text-[#221E33] font-semibold text-[22px]">
//                 Professional Details
//               </h1>
//             </div>

//             <div className="px-10 py-6 flex flex-col gap-5">
//               {/* Specialties */}
//               <FormField
//                 control={form.control}
//                 name="specialities"
//                 render={({ field }) => {
//                   const selected = field.value || [];
//                   const toggle = (item: string) =>
//                     selected.includes(item)
//                       ? field.onChange(selected.filter((s) => s !== item))
//                       : field.onChange([...selected, item]);

//                   const options = [
//                     "Adventure Travel",
//                     "Cultural Tours",
//                     "Outdoor Activities",
//                     "Photography",
//                     "Wildlife & Nature",
//                     "Historical Sites",
//                     "Mountain Trekking",
//                     "Urban Exploration",
//                     "Beach & Coastal",
//                   ];

//                   return (
//                     <FormItem>
//                       <FormLabel className="text-[#242E2F] font-semibold mb-3">
//                         Specialties
//                       </FormLabel>
//                       <FormControl>
//                         <div className="flex gap-3 flex-wrap">
//                           {options.map((item) => (
//                             <Badge
//                               key={item}
//                               onClick={() => toggle(item)}
//                               className={`cursor-pointer rounded-[6px] px-3 py-2 ${selected.includes(item)
//                                 ? "bg-[#0DAC87] text-white"
//                                 : "border border-[#666373] text-[#666373] bg-transparent"
//                                 }`}
//                             >
//                               {
//                                 selected.includes(item) ? <span className="flex items-center gap-1"><Check size={14} /> {item}</span> : item
//                               }
//                             </Badge>
//                           ))}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />

//               {/* Languages */}
//               <FormField
//                 control={form.control}
//                 name="languages"
//                 render={({ field }) => {
//                   const selected = field.value || [];
//                   const toggle = (lang: string) =>
//                     selected.includes(lang)
//                       ? field.onChange(selected.filter((l) => l !== lang))
//                       : field.onChange([...selected, lang]);

//                   const langs = [
//                     "English",
//                     "French",
//                     "Spanish",
//                     "German",
//                     "Italian",
//                     "Dutch",
//                     "Russian",
//                   ];

//                   return (
//                     <FormItem>
//                       <FormLabel className="text-[#242E2F] font-semibold mb-3">
//                         Languages
//                       </FormLabel>
//                       <FormControl>
//                         <div className="flex gap-3 flex-wrap">
//                           {langs.map((lang) => (
//                             <Badge
//                               key={lang}
//                               onClick={() => toggle(lang)}
//                               className={`cursor-pointer rounded-[6px] px-6 py-2 ${selected.includes(lang)
//                                 ? "bg-[#0DAC87] text-white"
//                                 : "border border-[#666373] text-[#666373] bg-transparent"
//                                 }`}
//                             >
//                               {
//                                 selected.includes(lang) ? <span className="flex items-center gap-1"><Check size={14} /> {lang}</span> : lang
//                               }
//                             </Badge>
//                           ))}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//             </div>

//             <div className="px-10 grid md:grid-cols-2 gap-4 pb-6">
//               {/* Certificate */}
//               <FormField
//                 control={form.control}
//                 name="certificateLvl"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Certification Level
//                     </FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
//                           <SelectValue placeholder="Select Certificate" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Basic">Basic</SelectItem>
//                           <SelectItem value="Intermediate">Intermediate</SelectItem>
//                           <SelectItem value="Expert">Expert</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Experience */}
//               <FormField
//                 control={form.control}
//                 name="yearsOfExperience"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Years of Experience
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder="00"
//                         {...field}
//                         className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Location
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="text"
//                         placeholder="Location"
//                         {...field}
//                         className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           {/* ========== Section 3: Role & Permissions ========== */}

//           <div className="bg-white mt-3 rounded-[25px]">

//             <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
//               <h1 className="text-[#221E33] font-semibold text-[22px]">
//                 Role & Permissions
//               </h1>
//             </div>

//             <div className="px-8 py-6 grid md:grid-cols-2 gap-4 pb-6">
//               {/* Coordinator Type */}
//               <FormField
//                 control={form.control}
//                 name="type"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Coordinator Type
//                     </FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
//                           <SelectValue placeholder="Select Type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Logistics">Logistics</SelectItem>
//                           <SelectItem value="Accommodation">Accommodation</SelectItem>
//                           <SelectItem value="Transport">Transport</SelectItem>
//                           <SelectItem value="Tour Guide">Tour Guide</SelectItem>
//                           <SelectItem value="Event Management">Event Management</SelectItem>
//                           <SelectItem value="Photography">Photography</SelectItem>
//                           <SelectItem value="Communication">Communication</SelectItem>
//                           <SelectItem value="Finance">Finance</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Access Level */}
//               <FormField
//                 control={form.control}
//                 name="accessLvl"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Access Level
//                     </FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
//                           <SelectValue placeholder="Set Permissions" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Admin">Admin</SelectItem>
//                           <SelectItem value="Editor">Editor</SelectItem>
//                           <SelectItem value="Viewer">Viewer</SelectItem>
//                           <SelectItem value="Restricted">Restricted</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           {/* ========== Section 4: Set Credentials ========== */}
//           <div className="bg-white mt-3 rounded-[25px]">
//             <div className="bg-[#FAFAFA] px-7 py-5 rounded-tl-[20px] rounded-tr-[20px]">
//               <h1 className="text-[#221E33] font-semibold text-[22px]">
//                 Set Credential
//               </h1>
//             </div>

//             <div className="px-8 py-6 grid md:grid-cols-2 gap-4 pb-6">
//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Password
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter Password"
//                         {...field}
//                         className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Confirm Password */}
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#242E2F] font-semibold">
//                       Confirm Password
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter Password"
//                         {...field}
//                         className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="flex justify-end mt-20 px-8 pb-6">
//               <Button
//                 type="submit"
//                 disabled={CreateCoordinatorMutation.isPending}
//                 className="rounded-full px-8 py-6 font-medium cursor-pointer bg-[#0DAC87] hover:bg-[#0C9A7A] disabled:opacity-50"
//               >
//                 {CreateCoordinatorMutation.isPending ? "Adding..." : "Save Coordinator"}
//               </Button>
//             </div>
//           </div>


//           </>
//           )}
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AddnewCoordinator;