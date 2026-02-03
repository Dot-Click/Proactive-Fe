import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "@/assets/sidebaricon/arrow.png";
import imgupload from "@/assets/sidebaricon/imgupload.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
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
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useGetCoordinator } from "@/hooks/getcoordinatorforedithook";
import { useUpdateCoordinator } from "@/hooks/updatecoordinatorshook";

// Define the Coordinator type based on what your API returns
interface Coordinator {
    fullName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    specialities: string[];
    languages: string[];
    certificateLvl: string;
    yearsOfExperience: number;
    type: string;
    accessLvl: string;
    location: string;
    profilePicture?: string;
}

// Define the API response type
interface ApiResponse {
    coordinator: Coordinator;
    // other properties if they exist
}

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({ message: "Invalid email address" }),
        phone: z
            .string()
            .min(1, { message: "Phone number is required" })
            .refine((val) => /^[0-9]{10,15}$/.test(val), {
                message: "Enter a valid phone number",
            }),
        Bio: z.string().min(2, {
            message: "Bio must be at least 2 characters.",
        }),
        Specialties: z.array(z.string()).min(1, {
            message: "Select at least one speciality",
        }),
        Languages: z.array(z.string()).min(1, {
            message: "Select at least one language",
        }),
        certificate: z.string().min(1, {
            message: "Select at least one certificate",
        }),
        experience: z.coerce.number().min(1, {
            message: "Experience is required",
        }),
        coordinator: z.string().min(1, {
            message: "Select Coordinator type",
        }),
        level: z.string().min(1, {
            message: "Select Permission",
        }),
        Password: z.string().optional(),
        confirmPassword: z.string().optional(),
        location: z.string().min(1, {
            message: "Location is required",
        }),
    })
    .refine((data) => {
        // Only validate password match if either password field is filled
        if (data.Password || data.confirmPassword) {
            return data.Password === data.confirmPassword;
        }
        return true;
    }, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

const Editcoordinator = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState("");
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Use the hook to fetch coordinator data
    const { data: apiResponse, isLoading, isError } = useGetCoordinator(id as string) as {
        data: ApiResponse | undefined;
        isLoading: boolean;
        isError: boolean;
    };

    // Use the update coordinator hook
    const { mutate: updateCoordinator, isPending: isUpdating } = useUpdateCoordinator(id as string);

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            username: "",
            email: "",
            phone: "",
            Bio: "",
            Specialties: [],
            Languages: [],
            certificate: "",
            experience: 0,
            coordinator: "",
            level: "",
            Password: "",
            confirmPassword: "",
            location: "",
        },
    });

    // Certificate options
    const certificateOptions = [
        { value: "Basic", label: "Basic" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Expert", label: "Expert" },
    ];

    // Coordinator type options
    const coordinatorOptions = [
        { value: "Logistics", label: "Logistics" },
        { value: "Accommodation", label: "Accommodation" },
        { value: "Transport", label: "Transport" },
        { value: "Tour Guide", label: "Tour Guide" },
        { value: "Event Management", label: "Event Management" },
        { value: "Photography", label: "Photography" },
        { value: "Communication", label: "Communication" },
        { value: "Finance", label: "Finance" },
    ];

    // Access level options
    const levelOptions = [
        { value: "Admin", label: "Admin" },
        { value: "Editor", label: "Editor" },
        { value: "Viewer", label: "Viewer" },
        { value: "Restricted", label: "Restricted" },
    ];

    // Set form values when API data is available
    useEffect(() => {
        if (apiResponse?.coordinator && !isDataLoaded) {
            const coordinator = apiResponse.coordinator;

            console.log("=== SETTING FORM DATA ===");
            console.log("Full Name:", coordinator.fullName);
            console.log("Certificate Level from API:", coordinator.certificateLvl);
            console.log("Coordinator Type from API:", coordinator.type);
            console.log("Access Level from API:", coordinator.accessLvl);
            console.log("Specialties:", coordinator.specialities);
            console.log("Languages:", coordinator.languages);

            // Prepare form data
            const formData = {
                username: coordinator.fullName || "",
                email: coordinator.email || "",
                phone: coordinator.phoneNumber || "",
                Bio: coordinator.bio || "",
                Specialties: coordinator.specialities || [],
                Languages: coordinator.languages || [],
                certificate: coordinator.certificateLvl || "",
                experience: coordinator.yearsOfExperience || 0,
                coordinator: coordinator.type || "",
                level: coordinator.accessLvl || "",
                location: coordinator.location || "",
                Password: "",
                confirmPassword: "",
            };

            console.log("Form data to reset:", formData);

            // Reset form with API data
            form.reset(formData);

            // Set profile picture if available
            if (coordinator.profilePicture) {
                setProfile(coordinator.profilePicture);
            }

            setIsDataLoaded(true);
        }
    }, [apiResponse, form, isDataLoaded]);

    const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfile(URL.createObjectURL(file));
            setProfileFile(file);
        }
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!id) return;

        console.log("Form submitted:", values);

        // Create FormData object
        const formData = new FormData();

        // Send all coordinator fields as one JSON string so backend gets real arrays (fixes "expected array, received string").
        // Matches the approach used for trips and AddnewCoordinator.
        const payload = {
            fullName: values.username.trim(),
            phoneNumber: values.phone.replace(/\D/g, ''), // Remove all non-digits
            bio: values.Bio.trim(),
            certificateLvl: values.certificate,
            yearsOfExperience: values.experience,
            location: values.location.trim(),
            type: values.coordinator,
            accessLvl: values.level,
            specialities: values.Specialties,
            languages: values.Languages,
            // Password is optional - only if provided
            ...(values.Password && values.Password.trim() !== "" ? { password: values.Password } : {})
        };

        formData.append("payload", JSON.stringify(payload));

        // Profile picture (optional)
        if (profileFile) {
            formData.append("prof_pic", profileFile);
            console.log("Adding profile picture:", profileFile.name);
        }

        // Call the update mutation
        updateCoordinator(formData, {
            onSuccess: () => {
                console.log("✅ Coordinator updated successfully");
                toast.success("Coordinator updated successfully!");
            },
            onError: (error) => {
                console.error("❌ Update failed:", error);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0DAC87] mx-auto"></div>
                    <p className="mt-4 text-[#242E2F]">Loading coordinator data...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
                <p className="text-red-700">
                    Error loading coordinator data. Please try again.
                </p>
                <Button
                    onClick={() => navigate("/dashboard/coordinator-management")}
                    className="mt-4 bg-red-600 hover:bg-red-700"
                >
                    Go Back
                </Button>
            </div>
        );
    }

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
                                    accept="image/*"
                                />

                                <label
                                    htmlFor="coordinatorProfile"
                                    className="block w-full h-full cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
                                >
                                    <div
                                        className={`${profile ? "py-0" : "py-6"} flex flex-col items-center justify-center w-full h-full`}
                                    >
                                        {profile ? (
                                            <img
                                                src={profile}
                                                alt="profile"
                                                className="w-full h-full object-cover object-center rounded-[10px]"
                                            />
                                        ) : (
                                            <>
                                                <img src={imgupload} alt="upload" width={80} />
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
                                    name="username"
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
                                                    disabled
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
                                    name="phone"
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
                                                    value={field.value}
                                                    onChange={(phone) => field.onChange(phone)}
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
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Location */}
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
                                                    placeholder="Enter Location"
                                                    {...field}
                                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Bio */}
                                <FormField
                                    control={form.control}
                                    name="Bio"
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
                                name="Specialties"
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
                                                                selected.includes(item) ?
                                                                    <span className="flex items-center gap-1">
                                                                        <Check size={14} /> {item}
                                                                    </span> :
                                                                    item
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
                                name="Languages"
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
                                                                selected.includes(lang) ?
                                                                    <span className="flex items-center gap-1">
                                                                        <Check size={14} /> {lang}
                                                                    </span> :
                                                                    lang
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
                            {/* Certification Level Dropdown */}
                            <FormField
                                control={form.control}
                                name="certificate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Certification Level
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <select
                                                    {...field}
                                                    className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer text-[#242E2F]"
                                                    style={{ height: "54px" }}
                                                >
                                                    <option value="" disabled>
                                                        Select Certificate Level
                                                    </option>
                                                    {certificateOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Chevron Icon Layer */}
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Experience */}
                            <FormField
                                control={form.control}
                                name="experience"
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
                            {/* Coordinator Type Dropdown */}
                            <FormField
                                control={form.control}
                                name="coordinator"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Coordinator Type
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <select
                                                    {...field}
                                                    className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                                    style={{ height: "54px" }}
                                                >
                                                    <option value="" disabled>
                                                        Select Coordinator Type
                                                    </option>
                                                    {coordinatorOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Access Level Dropdown */}
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Access Level
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <select
                                                    {...field}
                                                    className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer text-[#242E2F]"
                                                    style={{ height: "54px" }}
                                                >
                                                    <option value="" disabled>
                                                        Select Access Level
                                                    </option>
                                                    {levelOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                                </div>
                                            </div>
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
                                name="Password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter new password"
                                                {...field}
                                                value="000000000"
                                                disabled={true}
                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                placeholder="Enter new password"
                                                {...field}
                                                value="000000000"
                                                disabled={true}
                                                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex justify-end mt-20 px-8 pb-6">
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                className="rounded-full px-8 py-6 font-medium cursor-pointer bg-[#0DAC87] hover:bg-[#0C9A7A] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? "Updating..." : "Update Coordinator"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Editcoordinator;