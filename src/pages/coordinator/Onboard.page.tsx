
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useValidateInvite, useCompleteInvite } from "@/hooks/UseInviteOnboard";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Camera, User, Globe, Award, Lock, MapPin } from "lucide-react";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Theme Assets
import login from "../../assets/login.png"
import loginLayer from "../../assets/loginLayer.png"
import loginformbg from "../../assets/loginformbg.png"
import proactivelogo from "../../assets/proactive-logo.png"

type FormValues = {
  fullName: string;
  password: string;
  phoneNumber: string;
  bio: string;
  specialities: string[];
  languages: string[];
  certificateLvl: string;
  yearsOfExperience: number;
  location: string;
  type: string;
  prof_pic?: File;
};

const SPECIALITIES = [
  "Adventure Travel", "Cultural Tours", "Outdoor Activities", "Photography",
  "Wildlife & Nature", "Historical Sites", "Mountain Trekking", "Urban Exploration", "Beach & Coastal"
];

const LANGUAGES = ["English", "French", "Spanish", "German", "Italian", "Dutch", "Russian"];

const COORDINATOR_TYPES = [
  "Logistics", "Accommodation", "Transport", "Tour Guide",
  "Event Management", "Photography", "Communication", "Finance"
];

const CoordinatorOnboardPage: React.FC = () => {
  const [search] = useSearchParams();
  const token = search.get("token") || undefined;
  const { data, isLoading: validating } = useValidateInvite(token);
  const complete = useCompleteInvite();
  const navigate = useNavigate();

  const [profilePreview, setProfilePreview] = useState<string>("");
  const [step, setStep] = useState(1);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      specialities: [],
      languages: [],
      yearsOfExperience: 1,
      certificateLvl: "Basic",
      type: "Logistics"
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("prof_pic", file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (values: FormValues) => {
    if (!token) return;

    const formData = new FormData();
    formData.append("token", token);
    formData.append("fullName", values.fullName);
    formData.append("password", values.password);
    formData.append("phoneNumber", values.phoneNumber.replace(/\D/g, ''));
    formData.append("bio", values.bio);
    formData.append("specialities", JSON.stringify(values.specialities));
    formData.append("languages", JSON.stringify(values.languages));
    formData.append("certificateLvl", values.certificateLvl);
    formData.append("yearsOfExperience", values.yearsOfExperience.toString());
    formData.append("location", values.location);
    formData.append("type", values.type);

    if (values.prof_pic) {
      formData.append("prof_pic", values.prof_pic);
    }

    complete.mutate(formData as any, {
      onSuccess: () => {
        toast.success("Welcome aboard! Your profile is complete.");
        navigate("/login");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
      }
    });
  };

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0DAC87]/30 border-t-[#0DAC87] rounded-full animate-spin" />
          <p className="font-bold text-[#221E33] uppercase tracking-widest text-sm">Validating Invite...</p>
        </div>
      </div>
    );
  }

  if (data?.success === false) {
    return (
      <div
        className="min-h-screen relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${login})` }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${loginLayer})` }}
        ></div>
        <div
          className="relative z-10 bg-cover p-12 shadow-2xl rounded-3xl text-center max-w-md w-full border border-white/10"
          style={{ backgroundImage: `url(${loginformbg})` }}
        >
          <div className="w-20 h-20 bg-red-50/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Lock className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-black text-[#221E33] uppercase mb-4">Link Expired</h2>
          <p className="text-[#666373] mb-8 font-medium">This invitation link is no longer valid or has already been used. Please contact the admin for a new one.</p>
          <Button onClick={() => navigate("/login")} className="w-full rounded-full bg-[#221E33] hover:bg-black h-14 text-white font-bold transition-all shadow-lg">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-screen bg-cover overflow-x-hidden"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${loginLayer})` }}
      ></div>

      <div className="relative z-10 grid lg:grid-cols-2 md:grid-cols-1 gap-8 min-h-screen">

        {/* Left Side: Onboarding Portal */}
        <div className="flex justify-center items-center px-6 py-8">
          <div
            style={{ backgroundImage: `url(${loginformbg})` }}
            className="bg-cover max-w-[700px] w-full rounded-3xl shadow-2xl relative overflow-hidden border border-white/20"
          >
            {/* Logo area */}
            <div className="px-10 py-8 border-b border-[#221E33]/5">
              <img src={proactivelogo} alt="proactivelogo" className="w-40 h-10 object-contain" />
            </div>

            <div className="px-10 py-8">
              <div className="mb-8">
                <h1 className="bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text text-3xl font-bold uppercase tracking-tight">
                  Coordinator Journey
                </h1>
                <p className="text-[#666373] text-[14px] mt-2 font-medium">
                  {step === 1 && "Complete your professional profile to join the adventure team."}
                  {step === 2 && "Highlight your expertise and unique skills."}
                  {step === 3 && "Finalize your profile details and bio."}
                </p>

                {/* Progress Mini Bar */}
                <div className="mt-6 flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= i ? 'bg-[#0DAC87] shadow-[0_0_10px_rgba(13,172,135,0.4)]' : 'bg-gray-100'}`} />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex flex-col items-center justify-center mb-8">
                      <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden group">
                        {profilePreview ? (
                          <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#FAFAFE] flex flex-col items-center justify-center text-gray-300">
                            <User size={40} />
                          </div>
                        )}
                        <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                          <Camera className="text-white" size={24} />
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                      </div>
                      <p className="text-[10px] font-black uppercase text-[#0DAC87] tracking-widest mt-4">Upload Profile Photo</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Full Legal Name</label>
                      <div className="relative">
                        <Input {...register("fullName", { required: "Name is required" })} className="bg-[#FAFAFE] border border-[#EFEFEF] focus:border-[#0DAC87] h-14 rounded-2xl px-12" placeholder="Your Name" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-xs ml-1 font-bold">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Create Password</label>
                      <div className="relative">
                        <Input type="password" {...register("password", {
                          required: "Password is required",
                          minLength: { value: 8, message: "Min 8 characters" }
                        })} className="bg-[#FAFAFE] border border-[#EFEFEF] focus:border-[#0DAC87] h-14 rounded-2xl px-12" placeholder="••••••••" />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                      </div>
                      {errors.password && <p className="text-red-500 text-xs ml-1 font-bold">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Phone Number</label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <PhoneInput
                            country="es"
                            value={field.value}
                            onChange={field.onChange}
                            inputStyle={{ width: '100%', height: '56px', borderRadius: '16px', border: '1px solid #EFEFEF', background: '#FAFAFE', fontSize: '15px' }}
                            buttonStyle={{ borderRadius: '16px 0 0 16px', border: '1px solid #EFEFEF', background: '#FAFAFE' }}
                          />
                        )}
                      />
                    </div>

                    <Button type="button" onClick={() => setStep(2)} className="bg-[#0DAC87] hover:bg-[#11a180] hover:scale-[1.02] w-full rounded-full h-16 cursor-pointer font-bold transition-all shadow-lg text-white uppercase tracking-widest mt-4">
                      Continue to Expertise
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-4">
                      <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1 flex items-center gap-2">
                        <Award size={14} className="text-[#0DAC87]" /> Coordination Specialties
                      </label>
                      <Controller
                        name="specialities"
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-wrap gap-2">
                            {SPECIALITIES.map(item => (
                              <Badge
                                key={item}
                                onClick={() => {
                                  const val = field.value || [];
                                  field.onChange(val.includes(item) ? val.filter(v => v !== item) : [...val, item]);
                                }}
                                className={`px-4 py-2 rounded-xl cursor-pointer transition-all border-none font-semibold ${field.value?.includes(item) ? 'bg-[#0DAC87] text-white shadow-md scale-105' : 'bg-[#FAFAFE] text-[#666373] hover:bg-[#EEEEEE] border border-gray-100'}`}
                              >
                                {item}
                                {field.value?.includes(item) && <Check size={12} className="ml-1 inline" />}
                              </Badge>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1 flex items-center gap-2">
                        <Globe size={14} className="text-[#0DAC87]" /> Languages spoken
                      </label>
                      <Controller
                        name="languages"
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-wrap gap-2">
                            {LANGUAGES.map(item => (
                              <Badge
                                key={item}
                                onClick={() => {
                                  const val = field.value || [];
                                  field.onChange(val.includes(item) ? val.filter(v => v !== item) : [...val, item]);
                                }}
                                className={`px-5 py-2 rounded-xl cursor-pointer transition-all border-none font-semibold ${field.value?.includes(item) ? 'bg-[#221E33] text-white shadow-md scale-105' : 'bg-[#FAFAFE] text-[#666373] hover:bg-[#EEEEEE] border border-gray-100'}`}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Exp (Years)</label>
                        <Input type="number" {...register("yearsOfExperience")} className="bg-[#FAFAFE] border border-[#EFEFEF] h-14 rounded-2xl" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Cert. Level</label>
                        <Controller
                          name="certificateLvl"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="bg-[#FAFAFE] border border-[#EFEFEF] h-14 rounded-2xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Basic">Basic</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" onClick={() => setStep(1)} variant="ghost" className="rounded-full h-16 px-8 font-bold text-[#666373] hover:bg-gray-50 uppercase tracking-widest text-xs">Back</Button>
                      <Button type="button" onClick={() => setStep(3)} className="flex-1 rounded-full bg-[#221E33] hover:bg-black h-16 text-white font-bold uppercase tracking-widest transition-all shadow-lg">Finalize Profile</Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Coordination Type</label>
                          <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-[#FAFAFE] border border-[#EFEFEF] h-14 rounded-2xl">
                                  <SelectValue placeholder="Coord. Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {COORDINATOR_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Location Base</label>
                          <div className="relative">
                            <Input {...register("location")} placeholder="Barcelona, ES" className="bg-[#FAFAFE] border border-[#EFEFEF] h-14 rounded-2xl pl-12" />
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#242E2F] font-bold text-xs uppercase tracking-wider ml-1">Coordinator Bio</label>
                        <Textarea
                          {...register("bio", { required: "Bio is required" })}
                          className="bg-[#FAFAFE] border border-[#EFEFEF] focus:border-[#0DAC87] min-h-[160px] rounded-2xl p-6 leading-relaxed resize-none"
                          placeholder="Tell adventures why they should choose you as their guide..."
                        />
                        {errors.bio && <p className="text-red-500 text-xs ml-1 font-bold">{errors.bio.message}</p>}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" onClick={() => setStep(2)} variant="ghost" className="rounded-full h-16 px-8 font-bold text-[#666373] hover:bg-gray-50 uppercase tracking-widest text-xs">Back</Button>
                      <Button
                        type="submit"
                        disabled={complete.isPending}
                        className="flex-1 rounded-full bg-[#0DAC87] hover:bg-[#11a180] h-16 text-white font-bold uppercase tracking-widest shadow-[0_10px_20px_rgba(13,172,135,0.3)] transition-all active:scale-95"
                      >
                        {complete.isPending ? "Submitting..." : "Complete Onboarding"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-12 text-center">
                <p className="text-[#666373] text-[12px] font-medium">
                  Invite Email: <span className="text-[#221E33] font-bold">{data?.data?.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Content (similar to login) */}
        <div className="hidden lg:flex lg:flex-col justify-end items-center mb-16 px-8 py-8 pointer-events-none">
          <div className="flex flex-col gap-4 justify-center items-center text-center animate-in fade-in duration-1000 slide-in-from-bottom-8">
            <span className="text-[#F7ECBE] lg:text-5xl text-xl font-black uppercase tracking-tighter">
              A New Venture
            </span>
            <span className="text-[#FFFFFF] lg:text-[18px] lg:tracking-tighter font-medium opacity-90 leading-relaxed shadow-sm">
              Become a vital part of our global network of <br /> expert traveler coordinators and guides
            </span>
          </div>
          <div className="grid grid-cols-3 mt-12 gap-4 w-full max-w-2xl">
            <div className="bg-white/10 backdrop-blur-md px-4 py-8 border border-white/20 rounded-2xl text-center transform hover:scale-105 transition-transform duration-500">
              <span className="text-4xl text-white font-black block">10k+</span>
              <span className="text-xs text-white/70 uppercase tracking-widest font-bold mt-2">Active Travelers</span>
            </div>
            <div className="bg-[#0DAC87]/20 backdrop-blur-md px-4 py-8 border border-[#0DAC87]/30 rounded-2xl text-center transform hover:scale-110 transition-transform duration-500">
              <span className="text-4xl text-white font-black block">500+</span>
              <span className="text-xs text-white/70 uppercase tracking-widest font-bold mt-2">Global Routes</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-8 border border-white/20 rounded-2xl text-center transform hover:scale-105 transition-transform duration-500">
              <span className="text-4xl text-white font-black block">4.9/5</span>
              <span className="text-xs text-white/70 uppercase tracking-widest font-bold mt-2">Avg Rating</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoordinatorOnboardPage;
