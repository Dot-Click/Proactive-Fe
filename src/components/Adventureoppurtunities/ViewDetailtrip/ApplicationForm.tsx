import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod"
import cloudupload from "../../../assets/cloudupload.avif"
import { XIcon } from "lucide-react";
import { FaCircleExclamation } from "react-icons/fa6";
import { toast } from "sonner";
import { UseApplication } from "@/hooks/UseApplicationSubmithook";
import { useParams } from "react-router-dom";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";
import { useTranslation, Trans } from "react-i18next";

const formSchema = (t: any) => z
    .object({
        introVideo: z.instanceof(File, {
            message: t("applicationForm.errors.videoRequired"),
        }),
    })

const ApplicationForm = () => {
    const { t } = useTranslation();
    const currentSchema = formSchema(t);
    type FormSchemaType = z.infer<typeof currentSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(currentSchema) as any,
        defaultValues: {
            introVideo: undefined,
        },
    });
    const [video, setVideo] = useState("");
    const [showHide, setShowHide] = useState(true)
    const { id } = useParams();
    const { data } = UsegetTripbyid(id ?? '');
    const { data: currentUser } = UsegetCurrentUser();
    const userdetail = currentUser?.data?.user
    const tripData = data?.trip?.[0] || data?.trip || data;
    const titleName = tripData?.name || tripData?.title;
    const { mutateAsync, isPending } = UseApplication();
    const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("introVideo", file as any);
            setVideo(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (val: FormSchemaType) => {
        try {
            const formData = new FormData();
            if (id) {
                formData.append("tripId", id);
            }
            formData.append("shortIntro", "From profile");
            if (val.introVideo) {
                formData.append("introVideo", val.introVideo);
            }
            await mutateAsync(formData as any);
            toast.success(t("applicationForm.errors.successToast"));
            setShowHide(false);
        } catch (error) {
            toast.error(t("applicationForm.errors.somethingWentWrong"));
        }
    };

    const onError = (errors: any) => {
        console.error("Form validation errors:", errors);
        toast.error(t("applicationForm.errors.validationError"));
    };

    return (
        <DialogContent className="bg-[#FAFAFA] sm:max-w-[650px] max-h-[90vh] border-[8px] border-[#ECFBF6] rounded-[20px] overflow-y-auto">
            {
                showHide ?
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex justify-between items-center font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                {t("applicationForm.title")}
                                <DialogClose asChild>
                                    <XIcon color="#000000" className="cursor-pointer" />
                                </DialogClose>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-6 px-7">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                                    <div className="flex flex-col gap-5">
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            {t("applicationForm.name")}
                                            <span className="text-[#666373] text-[10px] mt-1"> {t("applicationForm.fromProfile")}</span>
                                        </FormLabel>
                                        <Input
                                            placeholder={t("applicationForm.name")}
                                            readOnly
                                            value={userdetail?.FirstName}
                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                        />

                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            {t("applicationForm.email")}<span className="text-[#666373] text-[10px] mt-1"> {t("applicationForm.fromProfile")}</span>
                                        </FormLabel>
                                        <Input
                                            placeholder={t("applicationForm.email")}
                                            readOnly
                                            value={userdetail?.email}
                                            className="bg-[#FFFFFF] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                        />


                                        <FormField
                                            control={form.control}
                                            name="introVideo"
                                            render={() => (
                                                <FormItem className="md:col-span-3">
                                                    <FormLabel className="text-[#242E2F] font-semibold">
                                                        {t("applicationForm.introVideo")}
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
                                                                                {t("applicationForm.uploadVideo")}
                                                                            </span>
                                                                            <span className="text-[#97A4A4] text-center text-[12px]">{t("applicationForm.videoRequirements")}</span>
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
                                            {isPending ? t("applicationForm.submitting") : t("applicationForm.submit")}
                                        </Button>
                                        <DialogClose asChild>
                                            <Button type="button" className="rounded-full cursor-pointer w-full mt-4 bg-transparent border border-[#0DAC87] hover:bg-[#0DAC87] hover:text-white text-[#0DAC87] px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                                                {t("applicationForm.backToDetails")}
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
                                {t("applicationForm.awaitingApproval")}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="px-7 py-7 flex flex-col lg:gap-10 gap-4 justify-center items-center">
                            <span className="text-[#666373] lg:text-center text-center">
                                <Trans
                                    i18nKey="applicationForm.successMessage"
                                    values={{ trip: titleName }}
                                    components={[<span key="0" className="font-bold text-[#221E33]" />]}
                                />
                            </span>
                            <div className="bg-[#F4F4F4] rounded-[15px] px-7 py-6 flex flex-col justify-center items-center gap-2">
                                <div className="flex gap-2 items-center">
                                    <FaCircleExclamation color="#666373" />
                                    <span className="text-[#666373]">{t("applicationForm.whatsNext")}</span>
                                </div>
                                <span className="lg:text-center text-[#BEBEBE] text-[11px]">{t("applicationForm.whatsNextDesc")}</span>
                            </div>
                            <DialogClose asChild onClick={() => setShowHide(true)}>
                                <Button type="button" className="rounded-full cursor-pointer lg:w-110 w-full mt-4 bg-[#0DAC87] border border-[#0DAC87] hover:bg-transparent text-white hover:text-[#0DAC87] px-4 py-6 font-semibold hover:scale-105 transition-all duration-300">
                                    {t("applicationForm.backToDetails")}
                                </Button>
                            </DialogClose>
                        </div>
                    </>
            }
        </DialogContent>
    )
}

export default ApplicationForm