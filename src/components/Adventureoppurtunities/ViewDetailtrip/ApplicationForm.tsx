import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod"
import cloudupload from "../../../assets/cloudupload.png"
import { XIcon } from "lucide-react";
import { FaCircleExclamation } from "react-icons/fa6";
import { toast } from "sonner";
import { UseApplication } from "@/hooks/UseApplicationSubmithook";
import { useParams } from "react-router-dom";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";

const formSchema = z
    .object({
        dietaryRestrictions: z.string().min(1, {
            message: "Gender is required",
        }),
        shortIntro: z.string().min(1, {
            message: "ShortIntro is required",
        }),
        introVideo: z.instanceof(File, {
            message: "Intro video is required",
        }),
    })

const ApplicationForm = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            dietaryRestrictions: "",
            shortIntro: "",
            introVideo: undefined,
        },
    });
    const [video, setVideo] = useState("");
    const [showHide, setShowHide] = useState(true)
    const { id } = useParams();
    const { data } = UsegetTripbyid(id ?? '');
    const { data: currentUser } = UsegetCurrentUser();
    const userdetail = currentUser?.data?.user
    const titleName = data?.trip[0]
    const { mutateAsync, isPending } = UseApplication();
    const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("introVideo", file as any);
            setVideo(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            if (id) {
                formData.append("tripId", id);
            }
            formData.append("shortIntro", val.shortIntro);
            formData.append("dietaryRestrictions", val.dietaryRestrictions);
            if (val.introVideo) {
                formData.append("introVideo", val.introVideo);
            }
            await mutateAsync(formData as any);
            toast.success("Application submitted successfully");
            setShowHide(false);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <DialogContent className="bg-[#FAFAFA] sm:max-w-[650px] max-h-[90vh] border-[8px] border-[#ECFBF6] rounded-[20px] overflow-y-auto">
            {
                showHide ?
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex justify-between items-center font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                Application Form
                                <DialogClose asChild>
                                    <XIcon color="#000000" className="cursor-pointer" />
                                </DialogClose>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-6 px-7">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-5">
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Name
                                            <span className="text-[#666373] text-[10px] mt-1">(from Profile)</span>
                                        </FormLabel>
                                        <Input
                                            placeholder="Name"
                                            readOnly
                                            value={userdetail?.FirstName}
                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                        />

                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Email<span className="text-[#666373] text-[10px] mt-1">(from Profile)</span>
                                        </FormLabel>
                                        <Input
                                            placeholder="Email"
                                            readOnly
                                            value={userdetail?.email}
                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                        />

                                        <FormField
                                            control={form.control}
                                            name="dietaryRestrictions"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Dietary Restriction
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="w-full bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6">
                                                                <SelectValue placeholder="Select dietary restrictions" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="none">None</SelectItem>
                                                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                                                <SelectItem value="vegan">Vegan</SelectItem>
                                                                <SelectItem value="halal">Halal</SelectItem>
                                                                <SelectItem value="gluten-free">Gluten-free</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="shortIntro"
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
                                            name="introVideo"
                                            render={() => (
                                                <FormItem className="md:col-span-3">
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        Introduction video
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="bg-[#F4F4F4] border-[2.5px] border-dashed border-[#979797] rounded-[10px]">
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                id="coordinatorProfile"
                                                                className="hidden"
                                                                onChange={HandleuploadProfile}
                                                            />

                                                            <label
                                                                htmlFor="coordinatorProfile"
                                                                className="block cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
                                                            >
                                                                <div
                                                                    className={`${video ? "py-0" : "py-10"} flex flex-col items-center gap-2`}
                                                                >
                                                                    {video ? (
                                                                        <video src={video} controls={true}>

                                                                        </video>
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
                                            {isPending ? "Submitting..." : "Submit Application"}
                                        </Button>
                                        <DialogClose asChild>
                                            <Button type="button" className="rounded-full cursor-pointer w-full mt-4 bg-transparent border border-[#0DAC87] hover:bg-[#0DAC87] hover:text-white text-[#0DAC87] px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                                                Back to Details
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </>
                    :
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-center pt-10 lg:text-3xl font-bold bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                Awaiting Coordinator Approval
                            </DialogTitle>
                        </DialogHeader>
                        <div className="px-7 py-7 flex flex-col lg:gap-10 gap-4 justify-center items-center">
                            <span className="text-[#666373] lg:text-center">Your application for {titleName?.title} has been submitted successfully. Our coordinator will review your application and get <br /> back to you within 48 hours.</span>
                            <div className="bg-[#F4F4F4] rounded-[15px] px-7 py-6 flex flex-col justify-center items-center gap-2">
                                <div className="flex gap-2 items-center">
                                    <FaCircleExclamation color="#666373" />
                                    <span className="text-[#666373]">What's next?</span>
                                </div>
                                <span className="lg:text-center text-[#BEBEBE] text-[11px]">You'll receive an email notification once your application is reviewed. If approved, you'll be  able to proceed with payment.</span>
                            </div>
                            <DialogClose asChild onClick={() => setShowHide(true)}>
                                <Button type="button" className="rounded-full cursor-pointer lg:w-110 w-full mt-4 bg-[#0DAC87] border border-[#0DAC87] hover:bg-transparent text-white hover:text-[#0DAC87] px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                                    Back to Details
                                </Button>
                            </DialogClose>
                        </div>
                    </>
            }
        </DialogContent>
    )
}

export default ApplicationForm