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
import arrowBack from "@/assets/sidebaricon/arrow.avif";
import { UseCreateTrip } from "@/hooks/UseCreateTriphook";
import { AlertCircle } from "lucide-react";
import TripWizardProgress from "./TripWizardProgress";
import included1 from "@/assets/included1.avif";
import included2 from "@/assets/included2.avif";
import included3 from "@/assets/included3.avif";
import included4 from "@/assets/included4.avif";
import included5 from "@/assets/included5.avif";

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
      SportsLevel: "medio",
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

      thingsToKnow: [],
      applicationType: "video",
      depositAmount: "",
      status: "active",
      rating: "4.9",
      reviewsCount: 92,
      reviewLink: "https://www.google.com/maps/place/Proactive+Future/@35.67445,-6.8143,2933475m/data=!3m2!1e3!4b1!4m6!3m5!1s0x65e285d9dffa46ab:0x3dd1b18e867e6183!8m2!3d35.67445!4d-6.8143!16s%2Fg%2F11t6yzt6vh?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
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

      const getValidImg = (imgStr: any) => {
        if (!imgStr || typeof imgStr !== "string") return "";
        return imgStr;
      };

      const includedItems = (data.included ?? []).map((item: any) => {
        if (typeof item === "string") {
          const defaults = INCLUDED_LOOKUP[item] || { title: item, description: "", img: "" };
          return { id: item, ...defaults };
        }
        const id = item.id || item.title?.toLowerCase()?.replace(/\s+/g, '-');
        const defaults = INCLUDED_LOOKUP[id] || {};
        return { 
          id,
          title: item.title || defaults.title || id, 
          description: item.description || item.desc || defaults.description || "", 
          img: getValidImg(item.icon || item.img || defaults.img) 
        };
      });

      const notIncludedItems = (data.notIncluded ?? []).map((item: any) => {
        if (typeof item === "string") {
          const defaults = NOT_INCLUDED_LOOKUP[item] || { title: item, description: "", img: "" };
          return { id: item, ...defaults };
        }
        const id = item.id || item.title?.toLowerCase()?.replace(/\s+/g, '-');
        const defaults = NOT_INCLUDED_LOOKUP[id] || {};
        return { 
          id,
          title: item.title || defaults.title || id, 
          description: item.description || item.desc || defaults.description || "", 
          img: getValidImg(item.icon || item.img || defaults.img) 
        };
      });

      const payloadDaysItinerary = (data.daysItinerary ?? []).map((day, index) => ({
        day: index + 1,
        description: day.description || "",
        location: day.location || "",
        coordinates: day.coordinates || "",
        image: typeof day.image === "string" && day.image ? day.image : undefined,
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

        sportLvl: data.SportsLevel,
        included: includedItems,
        notIncluded: notIncludedItems,
        bestPriceMsg: data.BestPrice,
        perHeadPrice: data.FinalPrice,
        coordinators: data.coordinators || [],
        instaLink: (data.CoordinatorInstagram && data.CoordinatorInstagram.startsWith('http')) ? data.CoordinatorInstagram : null,
        likedinLink: (data.CoordinatorLinkedin && data.CoordinatorLinkedin.startsWith('http')) ? data.CoordinatorLinkedin : null,
        coordinatorBio: data.CoordinatorBio,
        highlights: (data.highlights || []).filter(h => h && typeof h === "string" && h.trim() !== ""),
        mood: (data.mood || []).filter(m => m.label && m.value !== undefined),
        commonFund: data.commonFund || "",
        commonFundDescription: data.commonFundDescription || "",

        thingsToKnow: (data.thingsToKnow || []).filter((t: any) => t.title && t.description),
        applicationType: data.applicationType || "video",
        depositAmount: data.depositAmount || "",
        status: data.status || "active",
        rating: data.rating || "4.9",
        reviewsCount: data.reviewsCount || 92,
        reviewLink: data.reviewLink || "https://www.google.com/maps/place/Proactive+Future/@35.67445,-6.8143,2933475m/data=!3m2!1e3!4b1!4m6!3m5!1s0x65e285d9dffa46ab:0x3dd1b18e867e6183!8m2!3d35.67445!4d-6.8143!16s%2Fg%2F11t6yzt6vh?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
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

          {/* Show validation errors blocking submission */}
          {Object.keys(methods.formState.errors).length > 0 && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-semibold mb-2">⚠️ Missing or invalid information:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(methods.formState.errors).map(([field, error]: [string, any]) => (
                  <span key={field} className="bg-white px-3 py-1 text-red-600 text-xs rounded-full border border-red-200">
                    • {field === 'coordinators' ? 'Please select a coordinator in Step 4' : 
                       field === 'coverImage' ? 'Cover image is required in Step 1' :
                       field === 'GalleryImages' ? 'Gallery images are required in Step 5' :
                       field}: {error?.message || "Invalid"}
                  </span>
                ))}
              </div>
            </div>
          )}

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
