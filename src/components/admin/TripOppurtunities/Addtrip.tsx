import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, type TripFormType } from "./tripschema";
import { useState } from "react";
import BasicInfo from "./BasicInfo";
import TripDetail from "./Tripdetail";
import Included from "./Included";
import Coordinator from "./Coordinator";
import Mediaprice from "./Mediaprice";
import Reviewsave from "./Reviewsave";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import arrowBack from "@/assets/sidebaricon/arrow.png";
import { UseCreateTrip } from "@/hooks/UseCreateTriphook";
import { AlertCircle } from "lucide-react";
import TripWizardProgress from "./TripWizardProgress";
import included1 from "@/assets/included1.png";
import included2 from "@/assets/included2.png";
import included3 from "@/assets/included3.png";
import included4 from "@/assets/included4.png";
import included5 from "@/assets/included5.png";

const AddTrip = ({ backUrl }: { backUrl: string }) => {
  const methods = useForm<TripFormType>({
    resolver: zodResolver(tripSchema) as any,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      categoryId: "",
      daysItinerary: [],
      title: "",
      description: "",
      coverImage: null,
      location: "",
      locationId: "",
      duration: "",
      mapCoordinates: "",
      startDate: undefined,
      endDate: undefined,
      LongDescription: "",
      GroupSize: "",
      rhythm: "",
      SportsLevel: "",
      included: [],
      notIncluded: [],
      coordinators: [], // Correct plural field
      CoordinatorName: "", // Backward compatibility
      CoordinatorRole: "",
      CoordinatorBio: "",
      CoordinatorInstagram: "",
      CoordinatorLinkedin: "",
      CoordinatorPhoto: null,
      PromotionalVideo: null,
      GalleryImages: [],
      BestPrice: "",
      FinalPrice: "",
      highlights: [],
      mood: [],
      commonFund: "",
      commonFundDescription: "",
      commonFundCount: undefined,
      thingsToKnow: [],
      applicationType: "video",
      depositAmount: "",
      status: "active",
    },
  });

  const steps = [
    "Basic Information",
    "Trip Details",
    "What's Included",
    "Coordinators",
    "Media & Price",
    "Review & Save",
  ];

  const [step, setStep] = useState(1);
  const [validatedSections, setValidatedSections] = useState<Set<number>>(new Set());
  const totalStep = 6;
  const navigate = useNavigate();

  const validateAndGoToSection = async (targetStep: number) => {
    let valid = false;
    if (step === 1) valid = await methods.trigger(["categoryId", "title", "description", "coverImage", "location", "startDate", "endDate", "duration"]);
    else if (step === 2) valid = await methods.trigger(["LongDescription", "GroupSize", "rhythm", "SportsLevel"]);
    else if (step === 3) valid = await methods.trigger(["included", "notIncluded"]);
    else if (step === 4) valid = await methods.trigger(["coordinators"]);
    else if (step === 5) valid = await methods.trigger(["PromotionalVideo", "GalleryImages", "BestPrice", "FinalPrice"]);

    if (valid) setValidatedSections((prev) => new Set([...prev, step]));
    setStep(targetStep);
  };

  const next = async () => {
    let valid = false;
    if (step === 1) valid = await methods.trigger(["categoryId", "title", "description", "coverImage", "location", "startDate", "endDate", "duration"]);
    else if (step === 2) valid = await methods.trigger(["LongDescription", "GroupSize", "rhythm", "SportsLevel"]);
    else if (step === 3) valid = await methods.trigger(["included", "notIncluded"]);
    else if (step === 4) valid = await methods.trigger(["coordinators"]);
    else if (step === 5) valid = await methods.trigger(["PromotionalVideo", "GalleryImages", "BestPrice", "FinalPrice"]);

    if (valid) setValidatedSections((prev) => new Set([...prev, step]));
    if (step < totalStep) setStep((s) => s + 1);
  };

  const previous = () => setStep((s) => s - 1);
  const { mutateAsync, isPending } = UseCreateTrip(backUrl || "/dashboard/trip-management");

  const onSubmit = async (data: TripFormType) => {
    try {
      const formData = new FormData();
      
      const INCLUDED_LOOKUP: Record<string, any> = {
        camp: { title: "3 Nights Camp Stay", description: "Boutique camp accommodation", img: included1 },
        breakfast: { title: "Daily Breakfasts", description: "Healthy breakfasts included", img: included2 },
        transfer: { title: "Airport Transfers", description: "Arrival & departure transfers", img: included3 },
        coordinator: { title: "Trip Coordinator", description: "Professional English-speaking coordinator", img: included4 },
        tour: { title: "Sagrada Familia Tour", description: "Skip-the-line entry", img: included5 },
      };

      const NOT_INCLUDED_LOOKUP: Record<string, any> = {
        flight: { title: "International Flights", description: "Flights to/from Barcelona not covered.", img: included1 },
        insurance: { title: "Travel Insurance", description: "Personal insurance must be arranged.", img: included2 },
        shopping: { title: "Shopping & Souvenirs", description: "Personal purchases not included.", img: included3 },
      };

      const includedItems = (data.included ?? []).map((item: any) => {
        if (typeof item === "string") return INCLUDED_LOOKUP[item] || { title: item, description: "", img: "" };
        return { title: item.title, description: item.description || item.desc, img: item.icon || item.img };
      });

      const notIncludedItems = (data.notIncluded ?? []).map((item: any) => {
        if (typeof item === "string") return NOT_INCLUDED_LOOKUP[item] || { title: item, description: "", img: "" };
        return { title: item.title, description: item.description || item.desc, img: item.icon || item.img };
      });

      const payloadDaysItinerary = (data.daysItinerary ?? []).map((day, index) => ({
        day: index + 1,
        description: day.description || "",
        location: day.location || "",
        coordinates: day.coordinates || "",
        image: typeof day.image === "string" ? day.image : "",
      }));

      const payload = {
        title: data.title,
        description: data.description,
        shortDesc: data.description?.slice(0, 255),
        categoryId: data.categoryId,
        location: data.location,
        locationId: data.locationId,
        mapCoordinates: data.mapCoordinates || "",
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        duration: data.duration,
        longDesc: data.LongDescription,
        groupSize: data.GroupSize,
        rhythm: data.rhythm,
        sportLvl: data.SportsLevel,
        included: includedItems,
        notIncluded: notIncludedItems,
        bestPriceMsg: data.BestPrice,
        perHeadPrice: data.FinalPrice,
        coordinators: data.coordinators || [],
        instaLink: data.CoordinatorInstagram || null,
        likedinLink: data.CoordinatorLinkedin || null,
        coordinatorBio: data.CoordinatorBio,
        highlights: data.highlights || [],
        mood: data.mood || [],
        commonFund: data.commonFund || "",
        commonFundDescription: data.commonFundDescription || "",
        commonFundCount: data.commonFundCount || 0,
        thingsToKnow: data.thingsToKnow || [],
        applicationType: data.applicationType || "video",
        depositAmount: data.depositAmount || "",
        status: data.status || "active",
        daysItinerary: payloadDaysItinerary,
        promotionalVideo: "http://pending-video.com", 
        galleryImages: ["http://pending-gallery.com"],
        coverImage: "http://pending-cover.com",
      };
      
      formData.append("payload", JSON.stringify(payload));
      
      if (data.coverImage instanceof File) formData.append("cover_img", data.coverImage);
      if (data.PromotionalVideo instanceof File) formData.append("promotional_video", data.PromotionalVideo);
      data.GalleryImages?.forEach((file: any) => {
        if (file instanceof File) formData.append("gallery_images", file);
      });
      if (data.CoordinatorPhoto instanceof File) formData.append("prof_pic", data.CoordinatorPhoto);
      
      data.daysItinerary?.forEach((day, index) => {
        if (day.image instanceof File) {
          formData.append("day_images", day.image);
          formData.append("day_image_indices", index.toString());
        }
      });
      
      await mutateAsync(formData);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <>
      <div className="bg-[#FAFAFA] px-4 py-4 rounded-tl-[20px] rounded-tr-[20px] mt-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Button onClick={() => navigate(backUrl)} className="text-[#000000] font-bold bg-[#FAFAFA] hover:bg-[#ece7e7]">
              <img src={arrowBack} alt="back" className="h-4" /> Back
            </Button>
          </div>
          <div className="px-4"><span className="text-[#221E33] font-semibold text-[18px]">Add New Trip</span></div>
        </div>
      </div>
      
      <TripWizardProgress step={step} totalStep={totalStep} steps={steps} validatedSections={validatedSections} onStepClick={validateAndGoToSection} />

      <div className="bg-white">
        <div className="px-8 pb-6">
          {Object.keys(methods.formState.errors).length > 0 && step < totalStep && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Please fix any errors in the current section</span>
            </div>
          )}
        </div>
      </div>
      <hr />
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 1 && <BasicInfo />}
          {step === 2 && <TripDetail />}
          {step === 3 && <Included />}
          {step === 4 && <Coordinator />}
          {step === 5 && <Mediaprice />}
          {step === 6 && <Reviewsave />}

          <div className="bg-white rounded-bl-[25px] rounded-br-[25px] flex md:flex-row flex-col justify-end mt-auto pt-24 gap-4 px-6 pb-6">
            {step > 1 && (
              <Button type="button" onClick={previous} variant="outline" className="text-[#666373] border-[#666373] font-bold rounded-full px-8 py-5">
                previous
              </Button>
            )}
            <Button
              type={step === totalStep ? "submit" : "button"}
              onClick={step === totalStep ? undefined : next}
              disabled={isPending}
              className={`${step === totalStep ? "bg-[#0DAC87]" : "bg-[#000000]"} text-white font-bold rounded-full px-12 py-5`}
            >
              {step === totalStep ? (isPending ? "Publishing..." : "Publish") : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddTrip;
