import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod"
import cloudupload from "../../../assets/cloudupload.png"

const formSchema = z
    .object({
        Name: z.string().min(1, {
            message: "Name is required",
        }),
        Email: z.string().email("Email is required",),
        Gender: z.string().min(1, {
            message: "Gender is required",
        }),
        ShortIntro: z.string().min(1, {
            message: "ShortIntro is required",
        }),
        IntroVideo: z.any().optional(),
    })

const ApplicationForm = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            Name: "Will Bettelheim",
            Email: "willbettelheim@gmail.com",
            Gender: "",
            ShortIntro: "",
            IntroVideo: null,
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
        <DialogContent className="bg-[#FAFAFA] sm:max-w-[650px] max-h-[90vh] border-[8px] border-[#ECFBF6] rounded-[20px] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                    Application Form
                </DialogTitle>
            </DialogHeader>
            <div className="py-6 px-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name="Name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Name
                                            <span className="text-[#666373] text-[10px] mt-1">(from Profile)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Session Timeout"
                                                {...field}
                                                className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
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
                                            Email<span className="text-[#666373] text-[10px] mt-1">(from Profile)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Max Login Attempts"
                                                {...field}
                                                className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Dietary Restriction
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                    <SelectValue placeholder="Select Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ShortIntro"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Short Introduction
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Short Introduction"
                                                className="bg-[#FFFFFF] border border-[#EFEFEF] h-32 placeholder:text-[#221E33] px-4 py-3"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="IntroVideo"
                                render={() => (
                                    <FormItem className="md:col-span-3">
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Introduction video
                                        </FormLabel>
                                        <FormControl>
                                            <div className="bg-[#F4F4F4] border-[2.5px] border-dashed border-[#979797] rounded-[10px]">
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
                                                        className={`${profile ? "py-0" : "py-10"} flex flex-col items-center gap-2`}
                                                    >
                                                        {profile ? (
                                                            <img src={profile} alt="profile" />
                                                        ) : (
                                                            <>
                                                                <img src={cloudupload} alt="cloudupload" />
                                                                <span className=" text-[#696284] text-[13px] text-center font-semibold">
                                                                    Upload a short introduction video
                                                                </span>
                                                                <span className="text-[#97A4A4] text-center text-[12px]">Max 2 minutes, MP4/MOV format, <br /> 50MB max</span>
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
                        <div className="mt-8">
                            <Button type="submit" className="rounded-full cursor-pointer w-full mt-6 bg-[#0DAC87] hover:bg-[#129b7b] text-white px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                                Submit Application
                            </Button>
                            <Button type="button" className="rounded-full cursor-pointer w-full mt-4 bg-transparent border border-[#0DAC87] hover:bg-[#0DAC87] hover:text-white text-[#0DAC87] px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                                Back to Details
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </DialogContent>
    )
}

export default ApplicationForm