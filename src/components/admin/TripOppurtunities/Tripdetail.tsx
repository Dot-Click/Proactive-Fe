import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
const formSchema = z
    .object({
        Triptype: z.string().min(1, {
            message: "Select Trip Type",
        }),
        TripTitle: z.string().min(1, {
            message: "TripTitle is required",
        }),
        Description: z.string().min(1, {
            message: "Description is required",
        }),
        coverImage: z.any().optional(),
        Location: z.string().min(1, {
            message: "Select at least one Location",
        }),
        mapCoordinates: z.string().optional(),
        StartDate: z.coerce.number().min(1, {
            message: "Select Start Date",
        }),
        EndDate: z.coerce.number().min(1, {
            message: "Select End Date",
        }),
        Duration: z.string().optional()
    })

const Tripdetail = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            Triptype: "",
            TripTitle: "",
            Description: "",
            coverImage: null,
            Location: "",
            mapCoordinates: '',
            StartDate: 0,
            EndDate: 0,
            Duration: '',
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
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <span className="font-semibold text-[20px]">Trip Details</span>
                    <div className="mt-10">
                        <div className="grid md:grid-cols-1 gap-4 pb-6">
                            <FormField
                                control={form.control}
                                name="Description"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Long Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describr your trip......"
                                                className="bg-[#FAFAFE] border border-[#EFEFEF] h-26 placeholder:text-[#221E33] px-4 py-3"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                        </div>
                        <div className="grid md:grid-cols-3 gap-4 pb-6 mt-4">
                            <FormField
                                control={form.control}
                                name="StartDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Group Size
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Group Size"
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
                                name="EndDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Rhythm
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Auto-calculated"
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
                                name="Duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Sport Level
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Auto-calculated"
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
                                name="coverImage"
                                render={() => (
                                    <FormItem className="md:col-span-3 mt-6">
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Cover Image
                                        </FormLabel>
                                        <FormControl>
                                            <div className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#221E33] rounded-[10px]">
                                                <input
                                                    type="file"
                                                    id="coordinatorProfile"
                                                    className="hidden"
                                                    onChange={HandleuploadProfile}
                                                />

                                                <label
                                                    htmlFor="coordinatorProfile"
                                                    className="block cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
                                                >
                                                    <div
                                                        className={`${profile ? "py-0" : "py-14"} flex flex-col items-center`}
                                                    >
                                                        {profile ? (
                                                            <img src={profile} alt="profile" />
                                                        ) : (
                                                            <>
                                                                <Upload strokeWidth={1} size={60} />
                                                                <span className="mt-6 text-[#242E2F] text-[16px] text-center font-semibold">
                                                                    Upload cover image
                                                                </span>
                                                                <span>PNG,JPG,GIF up to 10MB</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Tripdetail