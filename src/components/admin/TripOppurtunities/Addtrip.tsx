import { Form } from "@/components/ui/form";
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
// import Template from "@/assets/sidebaricon/template.png";
import { Progress } from "@/components/ui/progress";
import { UseCreateTrip } from "@/hooks/UseCreateTriphook";

const AddTrip = ({ backUrl }: { backUrl: string }) => {
  const methods = useForm<TripFormType>({
    resolver: zodResolver(tripSchema),
    shouldUnregister: false,
    defaultValues: {
      type: "",
      // Days itinerary (shown when trip type is selected)
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
      CoordinatorName: "",
      CoordinatorRole: "", // TEMP: role field hidden in UI, kept for form stability
      CoordinatorBio: "",
      CoordinatorInstagram: "",
      CoordinatorLinkedin: "",
      CoordinatorPhoto: null,
      PromotionalVideo: null,
      GalleryImages: [],
      BestPrice: "",
      FinalPrice: "",
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
  const totalStep = 6;
  const navigate = useNavigate();
  const next = async () => {
    let valid = false;

    if (step === 1) {
      valid = await methods.trigger([
        "type",
        "title",
        "description",
        "location",
        "startDate",
        "endDate",
        "duration",
      ]);
    }

    if (step === 2) {
      valid = await methods.trigger([
        "LongDescription",
        "GroupSize",
        "rhythm",
        "SportsLevel",
      ]);
    }

    if (step === 3) {
      valid = await methods.trigger(["included", "notIncluded"]);
    }

    if (step === 4) {
      valid = await methods.trigger([
        "CoordinatorName",
        // "CoordinatorRole", // TEMP: role field hidden
        "CoordinatorBio",
        "CoordinatorInstagram",
        "CoordinatorLinkedin",
        "CoordinatorPhoto",
      ]);
    }

    if (step === 5) {
      valid = await methods.trigger([
        "PromotionalVideo",
        "GalleryImages",
        "BestPrice",
        "FinalPrice",
      ]);
    }

    if (valid && step < totalStep) {
      setStep((s) => s + 1);
    }
  };
  const previous = () => setStep((s) => s - 1);
  const { mutateAsync, isPending } = UseCreateTrip(
    backUrl || "/dashboard/trip-management"
  );

  const onSubmit = async (data: TripFormType) => {
    try {
      const formData = new FormData();

      // Build daysItinerary data (without image files - those are sent separately)
      const daysItinerary =
        data.daysItinerary?.map((day, index) => ({
          day: index + 1,
          description: day.description || "",
          // image URL will be set by backend after upload
        })) || [];

      // Send all trip fields as one JSON string so backend gets real arrays (fixes "expected array, received string").
      // Backend must parse: payload = JSON.parse(req.body.payload) and validate payload (see BACKEND_UPDATE_TRIP_FIX.md).
      const payload = {
        title: data.title,
        description: data.description,
        shortDesc: data.description?.slice(0, 255),
        type: data.type,
        location: data.location,
        locationId: data.locationId,
        mapCoordinates: data.mapCoordinates || undefined,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        duration: data.duration,
        longDesc: data.LongDescription,
        groupSize: data.GroupSize,
        rhythm: data.rhythm,
        sportLvl: data.SportsLevel,
        included: data.included ?? [],
        notIncluded: data.notIncluded ?? [],
        bestPriceMsg: data.BestPrice,
        perHeadPrice: data.FinalPrice,
        instaLink: data.CoordinatorInstagram || undefined,
        likedinLink: data.CoordinatorLinkedin || undefined,
        coordinators: data.CoordinatorName,
        // coordinatorRole: data.CoordinatorRole, // TEMP: role field hidden
        coordinatorBio: data.CoordinatorBio,
        coordinatorInstagram: data.CoordinatorInstagram,
        coordinatorLinkedin: data.CoordinatorLinkedin,
        // Days itinerary data
        daysItinerary: daysItinerary,
      };
      formData.append("payload", JSON.stringify(payload));

      if (data.coverImage && data.coverImage instanceof File)
        formData.append("cover_img", data.coverImage);
      if (data.PromotionalVideo && data.PromotionalVideo instanceof File)
        formData.append("promotional_video", data.PromotionalVideo);
      if (data.GalleryImages?.length) {
        data.GalleryImages.forEach((file: File) => {
          if (file instanceof File) formData.append("gallery_images", file);
        });
      }
      if (data.CoordinatorPhoto && data.CoordinatorPhoto instanceof File)
        formData.append("tt_img", data.CoordinatorPhoto);

      // Append day images if provided (using indexed field names for backend processing)
      if (data.daysItinerary?.length) {
        data.daysItinerary.forEach((day, index) => {
          if (day.image && day.image instanceof File) {
            formData.append("day_images", day.image);
            // Also append the index to help backend map images to days
            formData.append("day_image_indices", index.toString());
          }
        });
      }

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
            <Button
              onClick={() => navigate(backUrl ? backUrl : "")}
              className="text-[#000000] font-bold bg-[#FAFAFA] hover:bg-[#ece7e7] cursor-pointer"
            >
              <img src={arrowBack} alt="arrowBack" className="h-4" />
              Back
            </Button>
          </div>
          <div className="px-4 flex justify-between items-center">
            <span className="text-[#221E33] font-semibold text-[18px]">
              Add New Trip
            </span>
            {/* <div className="flex items-center border border-[#000000] gap-2 px-5 py-3 rounded-[12px]">
              <img src={Template} alt="Template" className="h-4" />
              <span className="text-[#221E33] font-medium">Use Template</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="px-8 py-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Step 1 of 6</span>
            <Progress value={(step / totalStep) * 100} />
            <div className="flex flex-wrap md:justify-between gap-4 mt-2">
              {steps.map((label, index) => (
                <span
                  key={index}
                  className={`text-[12px] font-semibold transition-colors ${
                    step === index + 1 ? "text-[#221E33]" : "text-[#606066]"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <BasicInfo />}
            {step === 2 && <TripDetail />}
            {step === 3 && <Included />}
            {step === 4 && <Coordinator />}
            {step === 5 && <Mediaprice />}
            {step === 6 && <Reviewsave />}

            <div className="bg-white rounded-bl-[25px] rounded-br-[25px] flex md:flex-row flex-col justify-end mt-auto pt-24 gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={previous}
                  variant={"outline"}
                  className="text-[#666373] w-full md:w-auto border border-[#666373] font-bold cursor-pointer rounded-full px-8 py-5 my-6"
                >
                  {step === totalStep ? "Preview Trip Page" : "previous"}
                </Button>
              )}
              <Button
                type="button"
                onClick={
                  step === totalStep ? methods.handleSubmit(onSubmit) : next
                }
                className={`${
                  step === totalStep
                    ? "bg-[#0DAC87] hover:bg-[#0d9e7c]"
                    : "bg-[#000000]"
                } cursor-pointer rounded-full px-12 py-5 mx-6 my-6 w-full md:w-auto`}
              >
                {step === totalStep
                  ? isPending
                    ? "...Create Trip"
                    : "Publish"
                  : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </>
  );
};

export default AddTrip;
